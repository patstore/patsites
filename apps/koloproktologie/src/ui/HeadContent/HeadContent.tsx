import React from "react";
import {
    backgroundOverlay,
    headContentBackgroundImage,
    headContentContainer,
    headContentContent,
    headContentImage,
    headContentImageContainer,
    headContentSubtitle,
    headContentTextContainer
} from "./styles";
import { HeadContentProps } from "./types";
import settings from "@settings";
import { FlexBox } from "../FlexBox";
import { AppImage } from "../AppImage";
import mainHeaderBackground from "./images/main_header_2026_2.jpg";

const HeadContent: React.FC<HeadContentProps> = ({
    title,
    subtitle,
    content,
    backgroundImage,
    image,
    isInline = false
}) => {
    // const variant = false;
    return (
        <div css={headContentContainer({ isInline })}>
            {backgroundImage && (
                <AppImage
                    css={headContentBackgroundImage}
                    src={mainHeaderBackground}
                    alt="background"
                    style={{ objectPosition: "50% 60%" }}
                />
            )}
            {backgroundImage && <div css={backgroundOverlay} />}
            <div css={headContentContent()}>
                <FlexBox
                    direction={"column"}
                    align="center"
                    justify="space-between"
                    hasFullWidth
                    changeToColumn
                    gap={"36px"}
                >
                    <div css={headContentTextContainer(!!image)}>
                        <h1
                            css={{
                                color: backgroundImage
                                    ? settings.colors.white
                                    : settings.colors.dark
                            }}
                        >
                            {title}
                        </h1>
                        <p
                            css={[
                                headContentSubtitle,
                                {
                                    color: backgroundImage
                                        ? settings.colors.white
                                        : settings.colors.dark
                                }
                            ]}
                        >
                            {subtitle}
                        </p>
                        {content && content}
                    </div>
                    {image && (
                        <div css={headContentImageContainer}>
                            <AppImage
                                css={headContentImage}
                                src={image}
                                alt="image"
                                objectFit="contain"
                            />
                        </div>
                    )}
                </FlexBox>
            </div>
        </div>
    );
};

export default HeadContent;
