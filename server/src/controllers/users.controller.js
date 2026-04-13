import { pool } from "../config/db.js";

export async function findUser(req,res){
    try{
        const currentUserId = req.user.userId;

         const users = await pool.query(
            `SELECT id, username, email 
            FROM users 
            WHERE id != $1`,
            [currentUserId]
        );

         res.json(users.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function searchUsers(req, res) {
  try {
    const { query } = req.query;

    const users = await pool.query(
      `SELECT id, username 
       FROM users
       WHERE username ILIKE $1`,
      [`${query}%`]
    );

    res.json(users.rows);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}