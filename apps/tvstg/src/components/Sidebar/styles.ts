import { css } from "@emotion/react";
import settings from "@settings";
import { sectionHeader } from "@styles";

export const containerbackground = settings.colors.white;
export const headerbackground = settings.colors.primary;
export const headercolor = settings.colors.darkgrey;
export const lightcolor = settings.colors.grey;
export const fontcolor = settings.colors.dark;

export const sidebarContent = settings.mq({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: ["100%", "100%", "100%", "100%", "100%"],
  height: "100%",
  gap: ".6rem",
  textAlign: "left",
  background: "transparent",
  fontSize: ["12px", "12px", "13px", "14px", "14px"],
  padding: [0],
});

export const sidebarHeader = [sectionHeader, { marginTop: "0 !important" }];

export const sidebarSubHeader = css({
  fontFamily: "Oswald, sans-serif",
  letterSpacing: "0.08em",
  fontSize: "1.1em",
  textTransform: "uppercase",
  color: settings.colors.dark,
  background: "transparent",
  width: "100%",
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "1rem",
  textAlign: "center",
});

export const sidebarelement = css({
  position: "relative",
  width: "100%",
  maxWidth: ["580px", "580px", "580px", "100%", "100%"],
  marginLeft: ["auto", "auto", "auto", "auto", "auto"],
  marginRight: ["auto", "auto", "auto", "auto", "auto"],
  borderRight: `0.6px solid ${settings.colors.grey}`,
  borderLeft: `0.6px solid ${settings.colors.grey}`,
  borderTop: `0.6px solid ${settings.colors.grey}`,
  display: "flex",
  flexDirection: "column",
  ":last-child": {
    borderBottom: `0.6px solid ${settings.colors.grey}`,
  },
  // border: `1px solid ${ lightcolor}`,
});

export const sidebarElementContainer = (isLast: boolean) => css({
  width: "100%",
  padding: settings.padding.small,
  borderBottom: isLast ? "none" : `0.6px solid ${settings.colors.grey}`,
});



export const label = css({
  padding: "0.4em 1em",
  margin: "1em 0",
  width: "auto",
  display: "inline-block",
  border: `1px solid ${lightcolor}`,
  fontFamily: "Oswald, sans-serif",
  fontSize: "0.8em",
  color: lightcolor,
  lineHeight: "0.8em",
});
