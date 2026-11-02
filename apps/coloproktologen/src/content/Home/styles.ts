import settings from "@settings";

export const cancerLogoContainer = settings.mq({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: ["row", "row", "column"],
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "30px",
  padding: settings.padding.medium,
  backgroundColor: settings.colors.light,
  borderRadius: settings.sizes.large,
});

export const manualContainer = settings.mq({
  display: "flex",
  flexDirection: "column",
  gap: settings.sizes.medium,
  alignItems: "center",
  justifyContent: "flex-start",
  textAlign: "center",
  cursor: "pointer",
  p: {
    maxWidth: "300px",
  },
  a: {
    color: settings.colors.dark,
  },
});

export const openAccessTextContainer = settings.mq({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "80%",
  maxWidth: "960px",
  transform: "translate(-50%, -50%)",
  zIndex: 2,
  h2: {
    fontWeight: 500,
    fontSize: ["32px", "32px", "48px"],
  },
});

export const headBannerContainer = settings.mq({
  width: "100%",
  height: "auto",
  padding: ["30px 24px", "30px 24px", "60px 24px"],
  backgroundColor: settings.colors.primary,
  color: settings.colors.white,
});

export const headBannerContent = settings.mq({
  width: "100%",
  height: "auto",
  display: "flex",
  flexDirection: ["column", "column", "row"],
  alignItems: ["flex-start", "flex-start", "center"],
  justifyContent: "center",
  textAlign: "left",
  maxWidth: "960px",
  margin: "auto",
  h2: {
    marginTop: "0 !important",
    fontSize: ["36px !important", "42px !important", "48px !important"],
  },
  p: {
    fontSize: ["13px", "14px", "14px"],
    fontWeight: 600,
  },
});

export const manualLabelContainer = settings.mq({
  padding: settings.padding.small,
  paddingLeft: "30px",
  paddingRight: "30px",
  border: `1px solid ${settings.colors.dark}`,
  backgroundColor: settings.colors.white,
  position: "absolute",
  top: "100%",
  left: "50%",
  width: "150px",
  transform: "translate(-50%, -50%)",
  textTransform: "uppercase",
  fontWeight: 400,
  color: settings.colors.dark,
  letterSpacing: "1.8px",
  fontSize: "16px",
  zIndex: 2,  
});

export const mediBannerContainer = settings.mq({
  overflow: "hidden",
  width: "100%",
  maxWidth: "840px",
  left: "50%",
  color: settings.colors.white,
  bottom: 0,
  zIndex: 10,
  background: "transparent",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "6px 6px 0 0",
});
