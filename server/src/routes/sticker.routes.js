import express from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import {
  searchStickers,
  getTrendingStickers,
} from "../controllers/sticker.controller.js";

const router = express.Router();

router.get("/search", authMiddleware, searchStickers);
router.get("/trending", authMiddleware, getTrendingStickers);

export default router;