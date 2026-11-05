import settings from "@settings";

export const sponsorsContainer = settings.mq({
  backgroundColor: settings.colors.light,
  display: "flex",
  flexDirection: ["column"],
  justifyContent: [
    "space-evenly",
    "space-evenly",
    "space-evenly",
    "space-evenly",
  ],
  alignItems: ["center", "center", "center"],
  width: "100%",
  margin: "3rem 0",
  borderRadius: settings.sizes.medium,
  padding: "3em",
});

export const logoContainer = settings.mq({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-evenly",
  gap: "1em",
  flexWrap: "wrap",
  width: "100%",
});
