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

export const sidebarHeader = [sectionHeader, { marginTop: "0 !important", paddingTop: "60px" }];

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

export const sidebarElement = css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "stretch",
    width: "100%",
    background: settings.colors.white,
});

export const sidebarElementHeader = [sectionHeader, { marginTop: "0 !important", paddingTop: "60px" }];

export const sidebarElementContent = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: settings.sizes.medium,
  borderTop: `0.6px solid ${settings.colors.grey}`,
  paddingTop: settings.sizes.medium,
  paddingBottom: settings.sizes.large,
});

export const sidebarElementContainer = css({
  width: "100%",
  paddingTop: settings.sizes.small,
  paddingBottom: settings.sizes.small,
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
