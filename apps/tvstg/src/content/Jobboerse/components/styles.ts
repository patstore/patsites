import settings from "@settings";

export const jobCard = settings.mq({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  width: ["100%", "49%", "49%", "32%"],
  height: "100%",
  minWidth: 0,
  margin: 0,
  padding: 0,
  border: `1px solid ${settings.colors.lightgrey}`,
  backgroundColor: settings.colors.white,
  color: "inherit",
  font: "inherit",
  textAlign: "left",
  cursor: "pointer",
  overflow: "hidden",
  ":hover": {
    backgroundColor: settings.colors.light,
  },
});

export const jobInfoIcon = {
  color: settings.colors.primary,
  flexShrink: 0,
  marginTop: "0.15em",
};

export const jobInfoRow = {
  display: "flex",
  flexDirection: "row" as const,
  alignItems: "flex-start",
  gap: "0.35rem",
  margin: 0,
  fontWeight: 600,
};
