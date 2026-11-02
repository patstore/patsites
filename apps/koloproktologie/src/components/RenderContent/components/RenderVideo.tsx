import React from "react";
import { RenderVideoProps } from "../types";
import { getImageUrl } from "@provider";

const RenderVideo: React.FC<RenderVideoProps> = ({ video }) => {
    return (
        <video
            controls
            width="100%"
            src={getImageUrl({ filePath: video.video })}
        />
    );
};

export default RenderVideo;
