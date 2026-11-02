import { useGetImages } from "@provider";
import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import "./styles.css";

const Gallery: React.FC<{ images: string[] }> = ({ images }) => {
    const { findImageUrl } = useGetImages();

    return (
        <div
            css={{
                width: "100%",
                maxWidth: "100%",
                position: "relative"
            }}
        >
            <ImageGallery
                items={images.map((image) => ({
                    original: findImageUrl(image) || "",
                    thumbnail: findImageUrl(image) || ""
                }))}
            />
        </div>
    );
};

export default Gallery;
