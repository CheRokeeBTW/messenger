import express from "express";
import { findUser, searchUsers } from "../controllers/users.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, findUser);

router.get("/search", authMiddleware, searchUsers);

export default router;