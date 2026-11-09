import React from "react";
import styled from "@emotion/styled";
import settings from "@settings";
import { LabelProps } from "./types";

const labelColor = settings.colors.dark;

const Label: React.FC<LabelProps> = ({ text, noMarginBottom = false }) => {
  const StyledLabel = styled.div({
    fontWeight: 500,
    fontSize: settings.fontSize.tiny,
    padding: settings.padding.small,
    marginBottom: noMarginBottom ? "0" : "12px",
    borderRadius: "1.6rem",
    width: "auto",
    display: "inline-block",
    border: `0.6px solid ${labelColor}`,
    fontFamily: "Oswald, sans-serif",
    color: labelColor,
    lineHeight: "0.8em",
    letterSpacing: "1.5px",

  });

  return <StyledLabel>{text}</StyledLabel>;
};

export default Label;
