import settings from "@settings";

export const siteProgressDisplayContainer = settings.mq({
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0",
  width: "100%",
  height: "48py",
  backgroundColor: "transparent",
  padding: "12px",
  zIndex: 24,
});

export const siteProgressElementContainer = settings.mq({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  width: "30px",
  height: "30px",
  borderRadius: "50%",
  backgroundColor: "transparent",
  padding: "12px",
  transition: "background-color .5s ease-in-out",
});

export const horizontalLineContainer = settings.mq({
  position: "relative",
  flex: "1 1 auto",
  height: "4px",
  transition: "background-color .5s ease-in-out",
});
