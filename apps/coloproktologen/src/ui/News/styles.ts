import { shadeColor } from "@provider";
import settings from "@settings";

export const newsContainer = settings.mq({
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: "30px",
  left: 0,
  top: 0,
});

export const newsElementsContainer = settings.mq({
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "center",
  gap: "30px",
  width: "auto",
  height: "fit-content",
  position: "absolute",
  top: 0,
});

export const newsButton = settings.mq({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  backgroundColor: settings.colors.primary,
  borderRadius: "50%",
  color: settings.colors.white,
  fontSize: "12px",
  fontWeight: 600,
  cursor: "pointer",
  padding: "6px",
  zIndex: 2,
  // ":hover": {
  //     backgroundColor: shadeColor(settings.colors.primary, -20)
  // },
  ":disabled": {
    backgroundColor: settings.colors.light,
    cursor: "default",
  },
});
