import { css } from "@emotion/react";
import settings from "@settings";

export const navigationContainer = settings.mq({
  position: "fixed",
  bottom: ["30px"],
  left: "0",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "auto",
  backgroundColor: "transparent",
  flexWrap: "wrap",
  gap: settings.sizes.large,
  zIndex: 5,
});

export const navigationContentContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "auto%",
  margin: "0 auto",
  maxWidth: "1040px",
  height: "100%",
  backgroundColor: settings.colors.lightgrey,
  borderRadius: "12px",
  flexWrap: "wrap",
  padding: settings.padding.small,
  gap: settings.sizes.large,
  boxShadow: settings.shadows.hover,
});
