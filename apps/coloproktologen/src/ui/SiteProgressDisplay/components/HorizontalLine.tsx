import React from "react";
import { horizontalLineContainer } from "../styles";
import settings from "@settings";
import { HorizontalLineProps } from "../types";

const HorizontalLine: React.FC<HorizontalLineProps> = ({ isActive }) => {
  return (
    <div
      css={[
        horizontalLineContainer,
        {
          backgroundColor: isActive
            ? settings.colors.primary
            : settings.colors.lightgrey,
        },
      ]}
    />
  );
};

export default HorizontalLine;
