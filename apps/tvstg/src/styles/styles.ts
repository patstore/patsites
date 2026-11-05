import { css } from "@emotion/react";
import settings from "@settings";

export const wrapper = settings.mq({
  marginLeft: "auto",
  marginRight: "auto",
  overflowX: "hidden",
  width: "100%",
  paddingTop: "30px",
});

export const mainContainer = settings.mq({
  width: ["100%", "100%", "100%", "calc(100% - 320px)"],
  height: "auto",
  ul: { fontSize: ".9rem" },
  li: { fontSize: ".9rem" },
});

export const sidebarContainer = settings.mq({
  width: ["100%", "100%", "100%", "320px"],
  height: "auto",
  display: "flex",
  flexDirection: ["column", "column", "column", "column"],
  alignItems: "center",
  gap: "1em",
  padding: ["2em 0", "2em 0", "2em 0", "0 2em 0 2em", "0 0 0 2em"],
});

export const siteContainer = settings.mq({
  marginTop: "0",
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "1040px",
  width: "100%",
  height: "auto",
  position: "relative",
});

export const siteContainerSmall = settings.mq({
  marginTop: "0",
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "720px",
  width: "100%",
  height: "auto",
  position: "relative",
});

export const th = {
  borderBottom: `1px solid ${settings.colors.grey}`,
  fontSize: "0.8rem",
  fontWeight: 600,
  letterSpacing: "2px",
};

export const tr = {
  borderBottom: `1px solid ${settings.colors.grey}`,
  td: {
    padding: "6px 12px",
  },
};

export const sectionHeader = css({
  marginTop: settings.sizes.medium,
  marginBottom: settings.sizes.medium,
  fontFamily: "Oswald, sans-serif",
  letterSpacing: "0.1rem",
  fontSize: "1.5rem",
  textTransform: "uppercase",
  // borderRadius: settings.sizes.small,
  fontWeight: 600,
  color: settings.colors.dark,
  // backgroundColor: settings.colors.primary,
  paddingTop: "0.5em",
  paddingBottom: "0.5em",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  position: "relative",
  width: "100%",
  borderBottom: `1px solid ${settings.colors.dark}`,
  borderTop: `1px solid ${settings.colors.dark}`,
});
