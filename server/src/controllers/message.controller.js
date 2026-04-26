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
    const { cursor } = req.query;

    let query = `
      SELECT 
        m.*,
        COALESCE(
          json_agg(r.user_id) FILTER (WHERE r.user_id IS NOT NULL),
          '[]'
        ) AS read_by
      FROM messages m
      LEFT JOIN message_reads r ON r.message_id = m.id
      WHERE m.conversation_id = $1
    `;

    const values = [conversationId];

    if (cursor) { 
      query += `AND m.created_at < $2`;
      values.push(cursor);
    }

    query += `
      GROUP BY m.id
      ORDER BY m.created_at DESC, m.id DESC
      LIMIT 50
    `;

    const messages = await pool.query(query, values);

    res.json(messages.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}