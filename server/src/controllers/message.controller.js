import { pool } from "../config/db.js";

export async function sendMessage(req, res) {
  try {

    const { conversationId, content, type = "text", attachments = [] } = req.body;
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
    };

    const message = await pool.query(
      `INSERT INTO messages (conversation_id, sender_id, content, type)
       VALUES ($1,$2,$3, $4)
       RETURNING *`,
      [conversationId, senderId, content, type]
    );

    
    const messageId = message.rows[0].id;
    
    if (attachments.length > 0) {
      for (const attachment of attachments) {
        await pool.query(
          `
          INSERT INTO message_attachments
          (message_id, file_url, file_type)
          VALUES ($1, $2, $3)
          `,
          [
            messageId,
            attachment.file_url,
            attachment.file_type,
          ]
        );
      }
    }
    
      res.json({
    ...message.rows[0],
    attachments,
  });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }
};

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

    for (const message of messages.rows) {
      const attachments = await pool.query(
        `
        SELECT file_url, file_type
        FROM message_attachments
        WHERE message_id = $1
        `,
        [message.id]
      );

      message.attachments = attachments.rows;
    }

    res.json(messages.rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}