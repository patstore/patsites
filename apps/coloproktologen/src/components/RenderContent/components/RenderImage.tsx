import { AppImage } from "@ui";
import React from "react";
import { RenderImageProps } from "../types";
import { useFindImages } from "@provider";
const RenderImage: React.FC<RenderImageProps> = ({ image }) => {
  const { findImage } = useFindImages();

  if (!image || !image.image || !findImage(image.image)) {
    return null;
  }

  return <AppImage alt={image.name} src={findImage(image.image)} />;
};

export default RenderImage;
