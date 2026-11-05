import { FC } from "react";
import { RenderImageProps } from "../types";
import { useFindImages } from "@provider";
import { Image } from "@ui";

const RenderImage: FC<RenderImageProps> = ({ image, name }) => {
  const { findImageUrl } = useFindImages();
  const src = findImageUrl(image);
  if (!src || !name) {
    return null;
  }

  return <Image alt={name} src={src} style={{ width: "100%" }} />;
};

export default RenderImage;
