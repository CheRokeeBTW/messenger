import { pool } from "../config/db.js";

export async function sendMessage(req, res) {
  try {

    const { conversationId, content } = req.body;
    const senderId = req.user.userId;

    const memberCheck = await pool.query(
      `SELECT * FROM conversation_members
       WHERE user_id = $1 AND conversation_id = $2`,
      [senderId, conversationId]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({
        message: "Not a member of this conversation"
      });
    }

    const message = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, content)
       VALUES ($1,$2,$3)
       RETURNING *`,
      [conversationId, senderId, content]
    );

    res.json(message.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
}

export async function getMessages(req, res) {
  try {

    const { conversationId } = req.params;
    const userId = req.user.userId;

    const memberCheck = await pool.query(
      `SELECT * FROM conversation_members
       WHERE user_id = $1 AND conversation_id = $2`,
      [userId, conversationId]
    );

    if (memberCheck.rows.length === 0) {
      return res.status(403).json({
        message: "Access denied"
      });
    };

const messages = await pool.query(
  `
  SELECT 
    m.*,
    COALESCE(
      json_agg(r.user_id) FILTER (WHERE r.user_id IS NOT NULL),
      '[]'
    ) AS read_by
  FROM messages m
  LEFT JOIN message_reads r 
    ON r.message_id = m.id
  WHERE m.conversation_id = $1
  GROUP BY m.id
  ORDER BY m.created_at DESC
  LIMIT 50
  `,
  [conversationId]
);

    await pool.query(
  `
  INSERT INTO message_reads (message_id, user_id)
  SELECT m.id, $1
  FROM messages m
  WHERE m.conversation_id = $2
    AND m.sender_id != $1
    AND NOT EXISTS (
      SELECT 1 FROM message_reads r
      WHERE r.message_id = m.id
        AND r.user_id = $1
    )
  `,
  [userId, conversationId]
);

    res.json(messages.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};