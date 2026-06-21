export async function searchGiphyStickers(query) {
  const res = await fetch(
    `https://api.giphy.com/v1/stickers/search?api_key=${process.env.GIPHY_API_KEY}&q=${encodeURIComponent(query)}&limit=20`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch stickers");
  }

  const data = await res.json();

  return data.data;
}

export async function getTrendingGiphyStickers() {
  const res = await fetch(
    `https://api.giphy.com/v1/stickers/trending?api_key=${process.env.GIPHY_API_KEY}&limit=20`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch trending stickers");
  }

  const data = await res.json();
  return data.data;
}