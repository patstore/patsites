import settings from "@settings";

export const sportBannerContainer = settings.mq({
  backgrounColor: settings.colors.dark,
  display: "flex",
  flexDirection: ["column", "columns", "row", "row"],
  justifyContent: [
    "space-evenly",
    "space-evenly",
    "space-evenly",
    "space-evenly",
  ],
  alignItems: ["flex-start", "center", "center", "center"],
  width: "100%",
  margin: "3rem 0",
  background: settings.colors.darkgrey,
  padding: "3em",
});
