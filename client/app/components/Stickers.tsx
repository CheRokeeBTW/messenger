import React, { useEffect, useState } from "react";
import { getTrendingStickers, searchStickers } from "../services/sticker.services";
import { sendMessages } from "../services/messages.services";
import { useDispatch, useSelector } from "react-redux";

type Sticker = {
  id: string;
  images: {
    fixed_width: {
      webp: string;
    };
    original: {
      webp: string;
    };
  };
};

type StickersProps = {
  onSelectSticker: (url: string) => void;
};

export default function Stickers( {onSelectSticker}:  StickersProps ){
    const [stickers, setStickers] = useState<Sticker[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        getTrendingStickers().then(setStickers);
    }, []);

    useEffect(() => {
  const timer = setTimeout(() => {
    if (search.trim()) {
      searchStickers(search).then(setStickers);
    } else {
      getTrendingStickers().then(setStickers);
    }
  }, 300);

  return () => clearTimeout(timer);
}, [search]);

const sendSticker = (sticker: Sticker) => {
  onSelectSticker(sticker.images.original.webp);
}

return(
  <div className="p-2">
      <input
      className="w-full h-[40px] focus:outline-none text-[18px] rounded-[18px] pl-4 bg-gray-200 placeholder-gray-500 border-none text-black"
      placeholder="search stickers"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      />
    <div className="grid grid-cols-5 gap-2">
    {stickers.map((sticker: Sticker) => (
        <img
        key={sticker.id}
        src={sticker.images.fixed_width.webp}
        onClick={() => sendSticker(sticker)}
        />
    ))}
    </div>
    </div>
)
}

