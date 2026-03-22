import { pool } from "../config/db.js";


export async function createConversation(req, res) {

  try {

    const { members, title, is_group } = req.body;

    const creatorId = req.user.userId;


    const conversation = await pool.query(
      `INSERT INTO conversations (title, is_group)
       VALUES ($1, $2)
       RETURNING *`,
      [title || null, is_group]
    );

    const conversationId = conversation.rows[0].id;

    await pool.query(
      `INSERT INTO conversation_members (user_id, conversation_id, role)
       VALUES ($1,$2,'admin')`,
      [creatorId, conversationId]
    );

    const uniqueMembers = [...new Set(members)];

for (const memberId of uniqueMembers) {

  if (memberId === creatorId) continue;

  await pool.query(
    `INSERT INTO conversation_members (user_id, conversation_id)
     VALUES ($1,$2)`,
    [memberId, conversationId]
  );

}

    for (const memberId of members) {

      await pool.query(
        `INSERT INTO conversation_members (user_id, conversation_id)
         VALUES ($1,$2)`,
        [memberId, conversationId]
      );

    }

    res.json({
      message: "Conversation created",
      conversationId
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

};

export async function getUserConversations(req, res) {

  try {

    const userId = req.user.userId;

    const conversations = await pool.query(
      `
      SELECT c.*
      FROM conversations c
      JOIN conversation_members cm
      ON cm.conversation_id = c.id
      WHERE cm.user_id = $1
      ORDER BY c.created_at DESC
      `,
      [userId]
    );

    res.json(conversations.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Server error"
    });

  }

}