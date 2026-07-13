import React, {useEffect} from 'react';

type ImageViewerProps = {
    image: string | null;
    onClose: () => void;
}

export default function ImageViewer( {image, onClose}: ImageViewerProps ){
    if(!image) return

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown); 
    }, [onClose]);

    return(
        <div 
            className="object-contain fixed inset-0 flex justify-center items-center bg-black/50"
            onClick={onClose}
            >
                <button
                    onClick={onClose}
                    className="absolute top-1 right-4 text-5xl hover:cursor-pointer text-gray-200 hover:text-white"
                >
                    ×
                </button>
            <img
             onClick={(e) => e.stopPropagation()} 
             src = {image}
            />
        </div>
    )
}