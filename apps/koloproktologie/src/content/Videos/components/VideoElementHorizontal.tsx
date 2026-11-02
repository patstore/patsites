import { Button, FlexBox, SlideIn } from "@ui";
import React, { useState } from "react";
import { VideoElementProps } from "../types";
import settings from "@settings";
import {
    horizontalVideoElementContainer,
    videoElementHorizontalSeparator,
    videoElementVerticalSeparator
} from "../styles";
import { Play } from "lucide-react";
import { getDateString } from "@provider";

const VideoElementHorizontal: React.FC<VideoElementProps> = ({
    title,
    date,
    start,
    end,
    iframe,
    description
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div css={horizontalVideoElementContainer}>
            <div css={videoElementVerticalSeparator} />
            <div
                css={{
                    width: "120px",
                    height: "fit-content",
                    position: "relative",
                    flexShrink: 0
                }}
            >
                <p>
                    <span css={{ fontWeight: "bold", fontSize: "14px" }}>
                        {start} - {end}
                    </span>
                    <br />
                    <span css={{ fontSize: "11px" }}>
                        {getDateString(date).date}
                    </span>
                </p>
            </div>
            <div css={videoElementHorizontalSeparator} />

            <FlexBox
                direction="column"
                styles={{ flex: 1, padding: "0 12px" }}
                gap={settings.sizes.medium}
            >
                {/* <FlexBox
                    direction="row"
                    justify="space-between"
                    align="center"
                    hasFullWidth
                >
                    <Label
                        text={"Video"}
                        background={settings.colors.light}
                    ></Label>
                </FlexBox> */}
                <h4>{title}</h4>
                <p
                    css={{
                        fontSize: "12px !important",
                        margin: "0 !important",
                        marginBlockEnd: "0 !important"
                    }}
                >
                    {description}
                    {/* {description?.split(";").map((part, index, arr) => (
                        <React.Fragment key={index}>
                            {part.trim()}
                            {index < arr.length - 1 && ";"}
                            <br />
                        </React.Fragment>
                    ))} */}
                </p>
            </FlexBox>
            <div>
                <Button
                    background={settings.colors.primary}
                    text="Video ansehen"
                    onClick={() => setOpen(true)}
                >
                    <Play size={12} />
                </Button>
            </div>
            <SlideIn
                width="large"
                open={open}
                cancelButtonHandler={() => setOpen(false)}
            >
                {/* <FlexBox
                    direction="column"
                    align="center"
                    justify="center"
                    styles={{
                        height: "100%",
                        width: "100%",
                        position: "relative"
                    }}
                > */}
                <div>
                    {iframe && (
                        <div dangerouslySetInnerHTML={{ __html: iframe }} />
                    )}
                </div>
                {/* </FlexBox> */}
            </SlideIn>
        </div>
    );
};

export default VideoElementHorizontal;
