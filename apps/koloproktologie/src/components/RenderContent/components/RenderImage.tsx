import React from "react";
import { RenderImageProps } from "../types";
import { useGetImages } from "@provider";
import { AppImage } from "@ui";

const RenderImage: React.FC<RenderImageProps> = ({ image }) => {
    const { findImageUrl } = useGetImages();

    if (!image?.image) {
        return null;
    }

    return (
        <AppImage
            alt={image.name}
            src={findImageUrl(image.image)}
        />
    );
};

export default RenderImage;
