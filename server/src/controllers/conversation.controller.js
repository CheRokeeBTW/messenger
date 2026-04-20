import { pool } from "../config/db.js";


export async function createConversation(req, res) {

    try {
    const { members, is_group } = req.body;
    const creatorId = req.user.userId;

    const otherUserId = members[0];

    // 1. check if DM already exists
    const existingConversation = await pool.query(
      `
      SELECT c.id
      FROM conversations c
      JOIN conversation_members cm1 ON cm1.conversation_id = c.id
      JOIN conversation_members cm2 ON cm2.conversation_id = c.id
      WHERE cm1.user_id = $1 
        AND cm2.user_id = $2
        AND c.is_group = false
      `,
      [creatorId, otherUserId]
    );

    // 2. if exists → return it instead of creating new
    if (existingConversation.rows.length > 0) {
      const conversationId = existingConversation.rows[0].id;

      const fullConversation = await pool.query(
        `
        SELECT 
          c.id,
          c.is_group,
          c.created_at,
          json_agg(
            json_build_object(
              'id', u.id,
              'username', u.username
            )
          ) AS participants
        FROM conversations c
        JOIN conversation_members cm ON cm.conversation_id = c.id
        JOIN users u ON u.id = cm.user_id
        WHERE c.id = $1
        GROUP BY c.id
        `,
        [conversationId]
      );

      return res.json(fullConversation.rows[0]);
    }

    // 3. otherwise create new conversation
    const conversation = await pool.query(
      `
      INSERT INTO conversations (title, is_group)
      VALUES ($1, $2)
      RETURNING *
      `,
      [null, is_group]
    );

    const conversationId = conversation.rows[0].id;

    // creator
    await pool.query(
      `
      INSERT INTO conversation_members (user_id, conversation_id, role)
      VALUES ($1, $2, 'admin')
      `,
      [creatorId, conversationId]
    );

    const uniqueMembers = [...new Set(members)];

    for (const memberId of uniqueMembers) {
      if (memberId === creatorId) continue;

      await pool.query(
        `
        INSERT INTO conversation_members (user_id, conversation_id)
        VALUES ($1, $2)
        `,
        [memberId, conversationId]
      );
    }

    // 4. return full conversation
    const fullConversation = await pool.query(
      `
      SELECT 
        c.id,
        c.is_group,
        c.created_at,
        json_agg(
          json_build_object(
            'id', u.id,
            'username', u.username
          )
        ) AS participants
      FROM conversations c
      JOIN conversation_members cm ON cm.conversation_id = c.id
      JOIN users u ON u.id = cm.user_id
      WHERE c.id = $1
      GROUP BY c.id
      `,
      [conversationId]
    );

    return res.json(fullConversation.rows[0]);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getUserConversations(req, res) {

  try {

    const userId = req.user.userId;

  const conversations = await pool.query(
  `
  SELECT 
    c.id,
    c.is_group,
    c.created_at,

    json_agg(
      json_build_object(
        'id', u.id,
        'username', u.username
      )
    ) AS participants,

    COUNT(m.id) FILTER (
      WHERE m.sender_id != $1
      AND r.message_id IS NULL
    ) AS unread_count

  FROM conversations c

  JOIN conversation_members cm 
    ON cm.conversation_id = c.id

  JOIN users u 
    ON u.id = cm.user_id

  LEFT JOIN messages m 
    ON m.conversation_id = c.id

  LEFT JOIN message_reads r 
    ON r.message_id = m.id 
    AND r.user_id = $1

  WHERE c.id IN (
    SELECT conversation_id
    FROM conversation_members
    WHERE user_id = $1
  )

  GROUP BY c.id
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

// export async function clearConversations(req, res) {
//   try {
//     await pool.query(`DELETE FROM conversation_members`);
//     await pool.query(`DELETE FROM conversations`);

//     return res.json({ message: "All conversations cleared" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Server error" });
//   }
// }