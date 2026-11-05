import React from "react";
import styled from "@emotion/styled";
import settings from "@settings";

const Label: React.FC<{ text: string }> = ({ text }) => {
  const StyledLabel = styled.div({
    fontSize: settings.fontSize.tiny,
    padding: settings.padding.small,
    margin: ".6rem 0",
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
