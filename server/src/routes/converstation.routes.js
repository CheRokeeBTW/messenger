import express from "express";
import {
  createConversation,
  getUserConversations
} from "../controllers/conversation.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, createConversation);

router.get("/", authMiddleware, getUserConversations);

export default router;