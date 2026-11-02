import settings from "@settings";
import { Button, FlexBox, Label, SlideIn } from "@ui";
import React, { useState } from "react";
import { VideoElementProps } from "../types";
import { Play } from "lucide-react";
import { videoElementContainer } from "../styles";

const VideoElement: React.FC<VideoElementProps> = ({
    title,
    date,
    description,
    iframe,
    text,
    start,
    end
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div css={videoElementContainer}>
            <div>
                <FlexBox
                    direction="column"
                    styles={{ padding: "12px" }}
                    gap={settings.sizes.medium}
                >
                    <FlexBox
                        direction="row"
                        justify="space-between"
                        align="center"
                        hasFullWidth
                    >
                        <Label
                            text={"Video"}
                            background={settings.colors.light}
                        ></Label>
                        <h5>
                            {date} / {start} - {end}
                        </h5>
                    </FlexBox>
                    <h4>{title}</h4>
                    <p
                        css={{
                            fontSize: "12px !important",
                            margin: "0 !important",
                            marginBlockEnd: "0 !important"
                        }}
                    >
                        {description?.split(";").map((part, index, arr) => (
                            <React.Fragment key={index}>
                                {part.trim()}
                                {index < arr.length - 1 && ";"}
                                <br />
                            </React.Fragment>
                        ))}
                    </p>
                    <div css={{ marginTop: "12px" }}></div>

                    <Button
                        background={settings.colors.primary}
                        text="Video ansehen"
                        onClick={() => setOpen(true)}
                    >
                        <Play size={12} />
                    </Button>
                </FlexBox>
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

export default VideoElement;
