import { css } from "@emotion/react";
import settings from "@settings";

export const buttonContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "auto",
  height: "auto%",
  textAlign: "right",
  padding: settings.padding.medium,
  cursor: "pointer",
});

export const button = (disabled: boolean) =>
  css({
    fontFamily: "Oswald, sans-serif",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "2px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: settings.sizes.small,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transformOrigin: "left",
    borderRadius: "18px",
  });
export const fullButton = (disabled: boolean) =>
  settings.mq({
    fontFamily: "Oswald, sans-serif",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "2px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: settings.sizes.small,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    transformOrigin: "left",
    borderRadius: "18px",
    padding: [settings.padding.tiny, settings.padding.small],
    fontSize: [settings.fontSize.tiny, settings.fontSize.small],
  });
