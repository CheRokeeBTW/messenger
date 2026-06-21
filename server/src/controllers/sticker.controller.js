import {
  searchGiphyStickers,
  getTrendingGiphyStickers,
} from "../services/giphy.service.js";

export async function searchStickers(req, res) {
  try {
    const { q } = req.query;

    const stickers = await searchGiphyStickers(q || "");

    res.json(stickers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch stickers" });
  }
}

export async function getTrendingStickers(req, res) {
  try {
    const stickers = await getTrendingGiphyStickers();

    res.json(stickers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch stickers" });
  }
}