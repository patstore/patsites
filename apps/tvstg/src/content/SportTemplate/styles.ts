import { css } from "@emotion/react";
import settings from "@settings";

export const subHeader = css({
  fontFamily: "Oswald, sans-serif",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: settings.colors.white,
  textShadow: `2px 2px ${settings.colors.dark}`,
  width: "100%",
  paddingTop: "1em",
  fontSize: "1.2em",
  textAlign: "center",
});

export const sectionheadline = settings.mq({
  textTransform: "uppercase",
  marginBottom: "0.5em",
  fontSize: ["1.8em", "2em", "2.2em", "2.4em", "2.4em"],
  textAlign: ["center", "center", "left"],
  width: "100%",
  color: settings.colors.dark,
});

export const teamcard = settings.mq({
  background: settings.colors.white,
  marginBottom: "2em",
  flex: ["100%", "100%", "40%", "40%", "40%"],
  height: "auto",
  overflow: "hidden",
  borderTop: `4px solid ${settings.colors.primary}`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "color 0.2s ease, box-shadow 0.4s ease",
  maxWidth: "440px",
  cursor: "pointer",
  ":hover": {
    boxShadow: "0px 5px 8px -2px rgba(0, 0, 0, 0.2)",
  },
});
export const teamcardNoHover = settings.mq({
  background: settings.colors.white,
  marginBottom: "2em",
  flex: ["100%", "100%", "40%", "40%", "40%"],
  height: "auto",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  maxWidth: "440px",
  cursor: "pointer",
});

export const teamImageContainer = css({
  width: "100%",
  flex: "1 0 auto",
  height: "210px",
  padding: "0",
  position: "relative",
  overflow: "hidden",
  borderRadius: settings.sizes.medium,

});
