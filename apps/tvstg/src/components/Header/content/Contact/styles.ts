import { css } from "@emotion/react";
import settings from "@settings";

export const contactIndicatorTwo = css({
  position: "fixed",
  bottom: "12px",
  right: "24px",
  fontSize: "18px",
  // border: `1px solid ${settings.colors.grey}`,
  borderRadius: "50%",
  width: "36px",
  height: "36px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // padding: settings.padding.medium,
  backgroundColor: settings.colors.secondary,
  cursor: "pointer",
  color: settings.colors.dark,
  zIndex: 6,
});

export const contactSlideIn = css({
  zIndex: 15,
  position: "fixed",
  top: "0%",
  right: "0%",
  height: "100%",
  backgroundColor: settings.colors.white,
  boxShadow: "-3px 0px 12px 2px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  overflow: "visible",
  borderLeft: `1px solid ${settings.colors.grey}`,
  // 'label': {marginTop: '2.4rem', marginBottom: '0.6rem'}
});

export const overlay = css({
  zIndex: 10,
  top: 0,
  left: 0,
  position: "fixed",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.1)",
});

export const contentContainer = css(
  settings.mq({
    display: "flex",
    flexDirection: ["column"],
    gap: settings.sizes.medium,
    padding: settings.padding.medium,
    overflow: "auto",
  }),
);

export const iconsContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: settings.sizes.medium,
  color: settings.colors.darkgrey,
  a: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: settings.fontSize.medium,
    fontWeight: 300,
    color: settings.colors.darkgrey,
    textDecoration: "underline",
  },
});
