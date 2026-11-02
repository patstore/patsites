import React from "react";
import { TextContentElementProps } from "../types";
import { topline as toplineCss } from "@styles";
import { FlexBox } from "@ui";
import settings from "@settings";

const TextContentElement: React.FC<TextContentElementProps> = ({
    title,
    topline,
    text,
    children,
    titleFont = "h2",
    content
}) => {
    return (
        <FlexBox
            direction="row"
            align="flex-start"
            gap={settings.sizes.medium}
            hasFullWidth
            changeToColumn
            styles={{
                marginTop: settings.sizes.large
                // marginBottom: settings.sizes.small
            }}
        >
            <div css={{ flex: "50%" }}>
                {topline && <div css={toplineCss}>{topline}</div>}
                {titleFont === "h2" && (
                    <h2 css={{ marginTop: "0 !important" }}>{title}</h2>
                )}
                {titleFont === "h3" && (
                    <h3 css={{ marginTop: "0 !important" }}>{title}</h3>
                )}
                {content && content}
            </div>
            <div css={{ flex: "50%" }}>
                {text && <p>{text}</p>}
                {children && children}
            </div>
        </FlexBox>
    );
};

export default TextContentElement;
