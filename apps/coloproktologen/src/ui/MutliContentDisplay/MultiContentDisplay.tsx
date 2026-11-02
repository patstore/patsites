import React, { useState } from "react";
import { Content, MultiContentDisplayProps } from "./types";
import { FlexBox } from "../FlexBox";
import ContentNavigation from "./components/ContentNavigation";
import DisplayContent from "./components/DisplayContent";
import settings from "@settings";

const MultiContentDisplay: React.FC<MultiContentDisplayProps> = ({
    content,
    direction = "vertical",
    contentHeight = "auto",
    color = "light"
}) => {
    const [currentContent, setCurrentContent] = useState<string>(
        content[0].value
    );

    return (
        <FlexBox
            direction={direction === "vertical" ? "column" : "row"}
            align="flex-start"
            justify="center"
            hasFullWidth
            gap={settings.sizes.medium}
        >
            <ContentNavigation
                content={content}
                currentContent={currentContent}
                setCurrentContent={setCurrentContent}
                direction={direction}
                color={color}
            />
            <DisplayContent
                currentContent={
                    content.find((item: Content) => item.value === currentContent) ||
                    content[0]
                }
                direction={direction}
                contentHeight={contentHeight}
                color={color}
            />
        </FlexBox>
    );
};

export default MultiContentDisplay;
