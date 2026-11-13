import { FC } from "react";
import { Image } from "@repo/ui";
import { RenderImageProps } from "../types";

const RenderImage: FC<RenderImageProps> = ({ image, name }) => {
  if (!image || !name) {
    return null;
  }

  return <Image id={image} alt={name} style={{ width: "100%" }} />;
};

export default RenderImage;
