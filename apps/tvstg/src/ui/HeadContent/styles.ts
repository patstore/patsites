import settings from "@settings";

export const siteHeaderContainer = settings.mq({
  // marginTop: ['70px', '70px', '70px', '120px', '120px'],
  position: "relative",
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  overflow: "hidden",
  height: "auto",
  paddingLeft: 0,
  paddingRight: 0,
  paddingTop: ["0px", "18px", "42px"],
  paddingBottom: ["18px", "24px", "42px"],
  marginLeft: "auto",
  marginRight: "auto",
  maxWidth: "1240px",
  width: "100%",
  h1: { color: settings.colors.dark, textAlign: "left" },
});

export const subHeaderContainer = settings.mq({
  fontFamily: "Open Sans, sans-serif",
  letterSpacing: "0.02rem",
  textTransform: "none",
  lineHeight: 1,
  // textTransform: 'uppercase',
  color: settings.colors.dark,
  width: "100%",
  maxWidth: "560px",
  paddingTop: "1rem",
  fontSize: ["1rem", "1.1rem"],
});

export const headlineContainer = {
  width: "100%",
  zIndex: 5,
  height: "100%",
  textAlign: "left",
};
