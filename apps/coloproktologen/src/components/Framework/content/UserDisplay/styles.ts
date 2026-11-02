import { css } from "@emotion/react";
import settings from "@settings";

export const userDisplayContainer = css({
  position: "fixed",
  left: "6px",
  bottom: "12px",
  height: "30px",
  width: "30px",
  borderRadius: "50%",
  border: `.5px solid ${settings.colors.grey}`,
  zIndex: 1000,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
});

export const userMenuContainer = css({
  position: "absolute",
  bottom: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
});
