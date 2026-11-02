import React from "react";
import { Section } from "../types";
import VideoElementHorizontal from "./VideoElementHorizontal";
import { videoListContainer, videoSectionContainer } from "../styles";
import { Divider } from "@ui";

const VideoSection: React.FC<{ section: Section }> = ({ section }) => {
    return (
        <div css={videoSectionContainer}>
            <h2>{section.title}</h2>
            <p>
                <span css={{ fontWeight: "bold" }}>Vorsitz:</span>{" "}
                {section.chair.join(", ")}
            </p>
            <p>
                <span css={{ fontWeight: "bold" }}>Urzeit:</span>{" "}
                {section.start} - {section.end}
            </p>
            <Divider showLine />
            <div css={videoListContainer}>
                {section.videos.map((video) => (
                    <VideoElementHorizontal
                        key={video.objectId as string}
                        title={video.title as string}
                        date={video.date as string}
                        description={video.description as string}
                        iframe={video.iframe as string}
                        text={video.text as string}
                        start={video.start as string}
                        end={video.end as string}
                    />
                ))}
            </div>
        </div>
    );
};

export default VideoSection;
