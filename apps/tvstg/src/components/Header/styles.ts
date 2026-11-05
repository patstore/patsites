import { css } from "@emotion/react";
import settings from "@settings";

export const headerContainer = css({
  width: "42px",
  height: "100%",
  borderRight: `1px solid ${settings.colors.grey}`,
  position: "fixed",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  zIndex: 999,
  backgroundColor: settings.colors.white,
});

export const logoContainer = css({
  height: "30px",
  width: "90px",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "rotate(-90deg) translateY(-100%)",
  cursor: "pointer",
});

export const menuIcon = css({
  height: "30px",
  width: "30px",
  top: "12px",
  left: "3px",
  borderRadius: "50%",
  // border: `1px solid ${settings.colors.dark}`,
  position: "relative",
  transition: "background-color .2s ease",
  cursor: "pointer",
});

export const menuBar = css({
  height: "1px",
  width: "24px",
  position: "absolute",
  left: "6px",
  transition: "left .2s ease",
});

export const fonts = css({
  h1: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: 100,
    fontSize: ["36px", "42px", "72px"],
    textTransform: "uppercase",
    color: settings.colors.secondary,
    margin: 0,
    lineHeight: 1,
    maxWidth: "660px",
    strong: { fontWeight: 300 },
  },
  h2: {
    fontFamily: "Oswald, sans-serif",
    fontSize: settings.fontSize.semismall,
    textTransform: "uppercase",
    marginBottom: settings.sizes.medium,
    letterSpacing: "2px",
    fontWeight: 500,
    color: settings.colors.grey,
  },
  h3: {
    marginTop: 0,
    fontFamily: "Oswald, sans-serif",
    fontWeight: 400,
    fontSize: ["20px", "22px", "24px"],
    letterSpacing: "1.8px",
    maxWidth: "480px",
    lineHeight: 1.2,
  },
  h4: {
    fontFamily: "Oswald, sans-serif",
    fontWeight: 400,
    fontSize: settings.fontSize.medium,
    letterSpacing: "2px",
    textTransform: "uppercase",
    maxWidth: "660px",
    lineHeight: 1.2,
    margin: 0,
    marginTop: settings.sizes.large,
    marginBottom: settings.sizes.small,
  },
  p: {
    fontFamily: "Verdana",
    fontWeight: 400,
    fontSize: settings.fontSize.small,
    letterSpacing: "1px",
    lineHeight: 1.6,
    maxWidth: "360px",
    marginBlockEnd: settings.sizes.medium,
  },
  a: {
    textDecoration: "underline",
    fontSize: "12px",
  },
});
