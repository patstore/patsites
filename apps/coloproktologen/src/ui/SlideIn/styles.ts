import { css } from "@emotion/react";
import settings from "@settings";

export const popup = settings.mq({
  zIndex: 14,
  position: "fixed",
  top: "2vh",
  right: "0%",
  height: "96vh",
  backgroundColor: settings.colors.white,
  paddingLeft: [
    settings.sizes.medium,
    settings.sizes.medium,
    settings.sizes.large,
  ],
  paddingRight: [
    settings.sizes.medium,
    settings.sizes.medium,
    settings.sizes.large,
  ],
  paddingTop: settings.sizes.large,
  paddingBottom: settings.sizes.large,
  boxShadow: "12px 12px 20px rgba(0,0,0,0.4)",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  borderRadius: settings.borderRadius.medium,
  label: { marginTop: "2.4rem", marginBottom: "0.6rem" },
  maxWidth: "1600px"
});

export const overlay = css({
  zIndex: 10,
  top: 0,
  left: 0,
  position: "fixed",
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
});

export const buttonContainer = css({
  marginTop: settings.sizes.medium,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1.2rem",
  flexWrap: "wrap",
  marginBottom: settings.sizes.medium,
});

export const contentContainer = css({
  overflow: "auto",
  height: "100%",
  width: "100%",
});

export const headContainer = css({
  overflow: "hidden",
  height: "100px",
  backgroundColor: settings.colors.primary,
});

export const errorContainer = css({
  marginTop: "50px",
  width: "100%",
  p: {
    color: settings.colors.primary,
  },
});
