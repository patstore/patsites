import React from "react";
import {
  contentNavigationContainer,
  contentNavigationItemContainer,
  verticalDivider,
} from "../styles";
import { Content, ContentNavigationProps } from "../types";

const ContentNavigation: React.FC<ContentNavigationProps> = ({
  content,
  currentContent,
  setCurrentContent,
  direction = "vertical",
  color = "light"
}) => {
  return (
    <div css={contentNavigationContainer(direction)}>
      {content.map((item: Content, index: number) => (
        <>
          <div
            css={contentNavigationItemContainer(currentContent === item.value, color)}
            key={item.label}
            onClick={() => setCurrentContent(item.value)}
          >
            {item.label}
          </div>
          {direction === "vertical" && index < content.length - 1 && (
            <div css={verticalDivider} />
          )}
        </>
      ))}
    </div>
  );
};

export default ContentNavigation;
