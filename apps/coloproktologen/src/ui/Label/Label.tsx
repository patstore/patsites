import React from "react";
import styled from "@emotion/styled";
import settings from "@settings";
import { LabelProps } from "./types";

const Label: React.FC<LabelProps> = ({ text, noMarginBottom = false }) => {
  const StyledLabel = styled.div({
    fontSize: settings.fontSize.tiny,
    padding: settings.padding.small,
    marginBottom: noMarginBottom ? "0" : "12px",
    borderRadius: "1.6rem",
    width: "auto",
    display: "inline-block",
    border: `1px solid ${settings.colors.grey}`,
    fontFamily: "Oswald, sans-serif",
    color: settings.colors.darkgrey,
    lineHeight: "0.8em",
    letterSpacing: "1px",
    // ':hover': {
    // 	background: settings.colors.light,
    // 	color: settings.colors.dark
    // }
  });

  return <StyledLabel>{text}</StyledLabel>;
};

export default Label;
