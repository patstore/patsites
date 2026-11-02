import settings from "@settings";

export const infoContainer = settings.mq({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  padding: "30px 15px",
  borderBottom: `0.6px solid ${settings.colors.grey}`,
  gap: 0,
});
