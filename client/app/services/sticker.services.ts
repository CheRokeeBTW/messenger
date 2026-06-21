export async function searchStickers(query: string){
    const res = await fetch(
        `http://localhost:3001/stickers/search?q=${encodeURIComponent(query)}`, {
        credentials: "include",
    });

    if (!res.ok) {
  const text = await res.text();
  throw new Error(`Sticker API error: ${res.status} - ${text}`);
}

    return res.json();
};

export async function getTrendingStickers(){
    const res = await fetch(
        `http://localhost:3001/stickers/trending`, {
        credentials: "include",
    });

    if (!res.ok) {
  const text = await res.text();
  throw new Error(`Sticker API error: ${res.status} - ${text}`);
}

    return res.json();
}