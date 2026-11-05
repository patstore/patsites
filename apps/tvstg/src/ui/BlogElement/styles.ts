import settings from "@settings";
import { css } from "@emotion/react";

export const blogContainer = (flex: string[] | undefined) =>
  settings.mq({
    position: "relative",
    marginBottom: "1rem",
    cursor: "pointer",
    background: "white",
    // border: `1px solid ${ settings.colors.grey}`,
    flex: flex ? flex : ["100%, 45%"],
    height: "auto",
    maxWidth: "400px",
    overflow: "hidden",
    color: settings.colors.dark,
    transitionDelay: "500ms",
    transition:
      "box-shadow 0.2s ease, box-shadow 0.4s ease, background 0.4s ease, color 0.2s ease, transform 0.4s ease",
    ":hover": {
      transform: "scale(1.00)",
      // boxShadow: '0px 5px 8px -2px rgba(0, 0, 0, 0.2)',
      h3: { textDecoration: "underline" },
      h2: { textDecoration: "underline" },
    },
  });

export const blogContainerHeader = settings.mq({
  position: "relative",
  marginBottom: "1rem",
  cursor: "pointer",
  flex: ["100%"],
  height: "auto",
  overflow: "hidden",
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  color: settings.colors.dark,
  borderRadius: `${settings.sizes.medium} ${settings.sizes.medium} 0 ${settings.sizes.medium}`,
  // border: `1px solid ${settings.colors.grey}`,
  transitionDelay: "500ms",
  transition:
    "box-shadow 0.2s ease, box-shadow 0.4s ease, background 0.4s ease, color 0.2s ease, transform 0.4s ease",
  ":hover": {
    transform: "scale(1.00)",
    // boxShadow: '0px 5px 8px -2px rgba(0, 0, 0, 0.2)',
    h3: { textDecoration: "underline" },
    h2: { textDecoration: "underline" },
  },
});

export const linkContainer = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: 0,
  zIndex: 2,
});

export const imageContainer = css({
  width: "100%",
  flex: "1 0 auto",
  height: "210px",
  padding: "0",
  position: "relative",
  overflow: "hidden",
  borderRadius: settings.sizes.medium,
  marginBottom: settings.sizes.small,
});

export const image = css({
  objectFit: "cover",
  position: "relative",
  height: "100%",
  width: "100%",
});

export const date = css({
  color: settings.colors.grey,
  marginBottom: "1em",
});

export const mainContainer = css({
  padding: settings.padding.small,
});

export const mainContainerHeader = css({
  padding: settings.padding.medium,
  backgroundColor: settings.colors.white,
  position: "absolute",
  // height: '100%',
  bottom: 0,
  right: 0,
  maxWidth: "420px",
  paddingBottom: settings.sizes.large,
  borderTopLeftRadius: settings.sizes.medium,
});

export const fontContainer = css({
  marginBottom: settings.sizes.large,
});
