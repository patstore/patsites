import settings from "@settings";

export const headBannerContainer = settings.mq({
    width: "100%",
    height: "auto",
    padding: ["30px 24px", "30px 24px", "60px 24px"],
    backgroundColor: settings.colors.primary,
    color: settings.colors.white
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
        fontSize: ["36px !important", "42px !important", "48px !important"]
    },
    p: {
        fontSize: ["13px", "14px", "14px"],
        fontWeight: 600
    }
});
