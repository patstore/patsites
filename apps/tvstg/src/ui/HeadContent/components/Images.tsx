import React from "react";
import { Image } from "../../Image";
import blog from "../images/blog.jpg";
import start2 from "../images/tvstg_03.jpg";
import gym from "../images/gym.jpg";
import calendar from "../images/calendar.jpg";

const HEADER_IMAGES: Record<string, string> = { blog, start2, gym, calendar };

const Images = ({ image }: { image: string }) => {
  const src = HEADER_IMAGES[image];
  if (!src) {
    return null;
  }

  return (
    <Image
      src={src}
      alt={image}
      width={1240}
      height={500}
      loading="eager"
      style={{ width: "100%" }}
    />
  );
};

export default Images;
