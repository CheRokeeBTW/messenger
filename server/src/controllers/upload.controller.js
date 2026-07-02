import fs from "fs";
import { uploadImage } from "../services/cloudinary.service.js";

export async function upload(req, res) {
    try {
        const imageUrl = await uploadImage(req.file.path);

        fs.unlinkSync(req.file.path);

        res.json({
            url: imageUrl,
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Upload failed",
        });
    }
}