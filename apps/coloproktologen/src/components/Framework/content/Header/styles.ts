import { css } from "@emotion/react";
import settings from "@settings";

export const menuContainer = css({
  width: "auto",
  listStyle: "none",
  display: "inline",
  position: "relative",
  // flexDirection: 'row',
  padding: 0,
  margin: 0,
  marginBlockEnd: "0 !important",
  li: {
    position: "relative",
    display: "inline",
    marginBottom: 0,
    color: "inherit",
    fontFamily: "Raleway, sans-serif",
    letterSpacing: "0.4px",
    fontWeight: 500,
    textRendering: "optimizeLegibility",
    fontSize: settings.fontSize.small,
    lineHeight: 1,
    cursor: "pointer",
    margin: "0 0.5rem",
    a: {
      fontSize: settings.fontSize.small,
      fontWeight: 500,
      letterSpacing: "1px",
      textDecoration: "none",
      ":hover": {
        color: settings.colors.secondary,
      },
    },
  },
});

export const headerContainer = settings.mq({
  position: "fixed",
  top: 0,
  width: "100vw",
  zIndex: 8,
  display: ["none", "none", "none", "flex", "flex"],
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: ["0 0.5em", "0 1em", "0 2em", "0 2em"],
  // backgroundColor: settings.colors.white,
  color: settings.colors.white,
  transition: "background-color .3s ease color .3s ease",
});

export const headerMobileContainer = settings.mq({
  position: "fixed",
  width: "100vw",
  height: "60px",
  zIndex: 8,
  top: 0,
  left: 0,
  display: ["flex", "flex", "flex", "none", "none"],
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 0.5em",
  backgroundColor: settings.colors.white,
  color: settings.colors.dark,
  borderBottom: `1px solid ${settings.colors.grey}`,
  h3: {
    lineHeight: "2em",
    textTransform: "uppercase",
  },
});

export const menuStyle = css({
  backgroundColor: settings.colors.white,
  color: settings.colors.dark,
  position: "absolute",
  top: "24px",
  left: 0,
  boxShadow: "0 2px 5px rgba(0,0,0,.2)",
  width: "18rem",
  zIndex: 9,
  ul: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    gap: settings.sizes.small,
    marginLeft: 0,
    li: {
      margin: 0,
      display: "inline-block",
      cursor: "pointer",
      padding: settings.padding.small,
      fontSize: settings.fontSize.small,
      transition: "color .2s ease background-color .2s ease",
      ":hover": {
        color: settings.colors.white,
        backgroundColor: settings.colors.primary,
      },
    },
  },
});

export const subMenuStyle = css({
  backgroundColor: settings.colors.white,
  fontWeight: 500,
  top: 0,
  boxShadow: "0 2px 5px rgba(0,0,0,.2)",
  width: "18rem",
  position: "absolute",
  zIndex: 9,
  transform: "translate(100%, 0)",
  ul: {
    li: {
      display: "block",
    },
  },
});

// mobile

export const burgerContainer = settings.mq({
  display: ["block", "block", "block", "none", "none"],
  width: "30px",
  height: "20px",
  position: "fixed",
  top: "20px",
  right: "20px",
  zIndex: 14,
});

export const mobileContainer = settings.mq({
  position: "fixed",
  width: "100vw",
  height: "60px",
  zIndex: 11,
  top: 0,
  left: 0,
  display: ["flex", "flex", "flex", "none", "none"],
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 0.5em",
  fontSize: "14px",
  backgroundColor: settings.colors.white,
  color: settings.colors.dark,
  borderBottom: `1px solid ${settings.colors.grey}`,
  h3: {
    lineHeight: "2em",
    textTransform: "uppercase",
  },
});

export const mobileMenu = settings.mq({
  overflow: "hidden",
  position: "fixed",
  width: "70vw",
  height: "100vh",
  top: 0,
  padding: settings.padding.medium,
  left: "30vw",
  backgroundColor: settings.colors.white,
  border: `1px solid ${settings.colors.grey}`,
  zIndex: 13,
});

export const subHeaderContainer = css({
  width: "100%",
  top: "60px",
  left: 0,
  position: "fixed",
  height: "48px",
  backgroundColor: settings.colors.white,
  borderTop: `0.6px solid ${settings.colors.grey}`,
  borderBottom: `0.6px solid ${settings.colors.grey}`,
  zIndex: 8,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 0.5em",
});

export const subHeaderContentContainer = css({
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 0.5em",
  maxWidth: "960px",
  margin: "auto",
  overflowX: "auto",
  overflowY: "hidden",
  cursor: "grab",
  "&:active": {
    cursor: "grabbing",
  },
  scrollbarWidth: "none",
  "&::-webkit-scrollbar": {
    width: "none",
  },
});

export const subHeaderLink = (active: boolean) =>
  settings.mq({
    fontFamily: "Raleway",
    fontSize: `${settings.fontSize.tiny} !important`,
    fontWeight: "500 !important",
    textAlign: "center",
    letterSpacing: "0.4px",
    textTransform: "uppercase",
    textDecoration: "none !important",
    cursor: "pointer",
    padding: settings.padding.small,
    borderRadius: settings.borderRadius.small,
    backgroundColor: active ? settings.colors.light : "transparent",
    color: settings.colors.primary,
    margin: "0 !important",
    ":hover": {
      backgroundColor: !active && settings.colors.light,
    },
  });

export const buttonStyle = css({
  backgroundColor: settings.colors.primary,
  borderRadius: settings.borderRadius.small,
  padding: "8px 16px",
  fontSize: settings.fontSize.small + " !important",
  fontWeight: 500,
  letterSpacing: "0.4px",
  position: "relative",
  display: "inline",
  color: settings.colors.white + " !important",
  fontFamily: "Raleway, sans-serif",
  textRendering: "optimizeLegibility",
  lineHeight: 1,
  cursor: "pointer",
  margin: "0 !important",
  textDecoration: "none !important",
});
