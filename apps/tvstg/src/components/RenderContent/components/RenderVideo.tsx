import React from "react";
import { useLoaderData } from "@tanstack/react-router";
import { RenderVideoProps } from "../types";
import { getFileUrl } from "@provider";

const RenderVideo: React.FC<RenderVideoProps> = ({ video }) => {
  const { config } = useLoaderData({ from: "__root__" });
  if (!config.bytescaleAccountId || !video) {
    return null;
  }

  return (
    <video
      controls
      preload="metadata"
      width="100%"
      css={{ width: "100%", height: "auto" }}
      src={getFileUrl(config.bytescaleAccountId, video)}
    />
  );
};

export default RenderVideo;
