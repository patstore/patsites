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
}) => {
  return (
    <FlexBox
      direction="column"
      align="flex-start"
      gap={settings.sizes.medium}
      hasFullWidth
    >
      <div css={{ width: "100%" }}>
        {topline && <div css={toplineCss}>{topline}</div>}
        <h2 css={{ marginTop: "0 !important" }}>{title}</h2>
      </div>
      <div>
        {text && <p>{text}</p>}
        {children && children}
      </div>
    </FlexBox>
  );
};

export default TextContentElement;
