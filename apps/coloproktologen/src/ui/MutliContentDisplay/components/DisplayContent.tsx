import React from "react";
import { DisplayContentProps } from "../types";
import { displayContentContainer } from "../styles";

const DisplayContent: React.FC<DisplayContentProps> = ({
    currentContent,
    direction = "vertical",
    contentHeight = "auto",
    color = "light"
}) => {
    return (
        <div css={displayContentContainer(direction, contentHeight, color)}>
            {currentContent.content}
        </div>
    );
};

export default DisplayContent;
