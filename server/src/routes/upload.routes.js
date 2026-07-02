import express from "express";
import uploadMiddleware from "../middleware/upload.middleware.js";
import { upload as uploadController } from "../controllers/upload.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    uploadMiddleware.single("image"),
    uploadController
);

export default router;