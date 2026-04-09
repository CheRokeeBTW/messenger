import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import { pool } from "./config/db.js";
import { socketHandler } from './sockets/socketHandler.js';
import authRoutes from "./routes/auth.routes.js";
import conversationRoutes from "./routes/converstation.routes.js";
import messageRoutes from './routes/message.routes.js';

async function testDB() {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB connected:", result.rows[0]);
  } catch (err) {
    console.error("DB error:", err);
  }
}

testDB();

dotenv.config();

const port = 3001;

const app = express();

app.use(
    cors({
    origin: "http://localhost:3000", 
    methods: ["GET", "POST", "PUT", "DELETE"], 
  })
);

app.use(express.json());

//auth
app.use("/auth", authRoutes);

//conversations
app.use("/conversations", conversationRoutes);

//messages
app.use("/messages", messageRoutes);

//does it work?
app.get('/', (req, res) => {
  res.send('Messanger works')
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

socketHandler(io);

server.listen(port, () => {
  console.log(`Server running on ${port}`);
});