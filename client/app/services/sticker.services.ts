export async function searchStickers(query: string){
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/stickers/search?q=${encodeURIComponent(query)}`, {
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
        `${process.env.NEXT_PUBLIC_API_URL}/stickers/trending`, {
        credentials: "include",
    });

    if (!res.ok) {
  const text = await res.text();
  throw new Error(`Sticker API error: ${res.status} - ${text}`);
}

    return res.json();
}