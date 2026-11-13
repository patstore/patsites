import React from "react";
import styled from "@emotion/styled";
import settings from "@settings";

const Label: React.FC<{ text: string, color?: string }> = ({ text, color }) => {
  const StyledLabel = styled.div({
    fontSize: settings.fontSize.tiny,
    width: "auto",
    display: "inline-block",
    fontFamily: "Inter, sans-serif",
    color: color ?? settings.colors.darkgrey,
    fontWeight: 500,
    lineHeight: "0.8em",
    letterSpacing: "1px",
    textTransform: "uppercase",
  });

  return <StyledLabel>{text}</StyledLabel>;
};

export default Label;
