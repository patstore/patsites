import settings from "@settings";

const headerButton = {
    textTransform: "none" as const,
    letterSpacing: "0.2px",
    fontSize: "14px",
    fontWeight: 600,
    borderRadius: "4px",
    padding: "10px 18px",
    textDecoration: "none"
};

export const headerMartinaContainer = settings.mq({
    width: "100%",
    backgroundColor: settings.colors.white
});

export const headerMartinaIntro = settings.mq({
    position: "relative",
    width: "100%",
    maxWidth: "1180px",
    margin: "0 auto",
    padding: ["8px 18px 28px", "12px 24px 32px", "16px 32px 28px"],
    display: "flex",
    flexDirection: ["column", "column", "row"] as const,
    alignItems: ["flex-start", "flex-start", "center"],
    gap: ["16px", "16px", "28px"]
});

export const headerMartinaIntroImage = {
    display: "block",
    width: "100%",
    minWidth: 0,
    flex: "1 1 auto",
    height: "auto"
};

export const headerMartinaProgram = settings.mq({
    position: "relative" as const,
    flex: "0 0 auto",
    alignSelf: ["flex-start", "flex-start", "center"],
    display: "flex",
    marginRight: ["0", "0", "0", "36px", "120px"],
    marginTop: ["0", "0", "60px", "72px"],
    zIndex: 1,
    a: {
        textDecoration: "none !important",
        margin: "0 !important"
    },
    button: headerButton
});

export const headerMartinaStage = settings.mq({
    position: "relative",
    width: "100%",
    overflow: "hidden",
    display: "flex",
    alignItems: "flex-end",
    minHeight: ["auto"],
    paddingTop: ["28px", "36px", "60px", "120px"],
    paddingBottom: ["28px", "36px", "60px", "120px"],
    paddingLeft: ["16px", "20px", "28px"],
    paddingRight: ["16px", "20px", "28px"]
});

export const headerMartinaStageImage = {
    position: "absolute" as const,
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    objectPosition: "50% 90%",
    zIndex: 0
};

export const headerMartinaEvents = settings.mq({
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    display: "flex",
    flexDirection: ["column", "column", "row"] as const,
    alignItems: "stretch",
    gap: ["16px", "16px", "20px"]
});

export const headerMartinaEvent = settings.mq({
    flex: ["1 1 auto", "1 1 auto", "1 1 0"],
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    textAlign: "center" as const,
    backgroundColor: settings.colors.white,
    boxShadow: "0 14px 32px rgba(0, 0, 0, 0.16)",
    padding: ["28px 20px 24px", "32px 22px 26px", "36px 20px 28px"],
    minHeight: ["auto", "auto", "220px"],
    borderRadius: "12px",
    h2: {
        margin: "0 0 10px !important",
        maxWidth: "none",
        letterSpacing: "0",
        textAlign: "center",
        fontFamily: "Montserrat",
        fontWeight: 700,
        fontSize: ["18px", "18px", "20px"],
        lineHeight: 1.3,
        color: settings.colors.darkgrey
    },
    p: {
        margin: "0 !important",
        marginBlockEnd: "0 !important",
        maxWidth: "none",
        letterSpacing: "0.2px",
        textAlign: "center",
        fontFamily: "Montserrat",
        fontWeight: 400,
        fontSize: ["14px", "14px", "15px"],
        lineHeight: 1.4,
        color: "#8a8a8a"
    }
});

export const headerMartinaEventButton = {
    marginTop: "auto",
    paddingTop: "12px",
    display: "flex",
    justifyContent: "center",
    button: {
        ...headerButton,
        padding: "8px 22px",
        fontSize: "14px"
    }
};
