import settings from "@settings";

export const homeHeaderContainer = () =>
    settings.mq({
        width: "100%",
        height: ["auto", "auto", "640px"],
        overflow: "hidden",
        paddingTop: ["36px", "48px", "60px"],
        paddingBottom: ["72px", "72px", "48px"],
        paddingLeft: ["18px", "24px", "0"],
        paddingRight: ["18px", "24px", "0"],
        position: "relative",
    });

export const homeHeaderWatermark = {
    position: "absolute" as const,
    top: "-6%",
    right: "-2%",
    width: "min(460px, 42vw)",
    aspectRatio: "1",
    backgroundColor: settings.colors.primary,
    opacity: 0.14,
    pointerEvents: "none" as const,
    zIndex: 0,
    userSelect: "none" as const,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskPosition: "center",
    maskPosition: "center",
};

export const homeHeaderContent = settings.mq({
        width: "100%",
        height: "100%",
        maxWidth: "960px",
        margin: "auto",
        position: "relative",
        display: "flex",
        flexDirection: ["column", "column", "row"],
        justifyContent: "space-between",
        alignItems: ["stretch", "stretch", "center"],
        gap: ["24px", "28px", "0"],
        zIndex: 2
    });

export const homeHeaderCopy = settings.mq({
    position: "relative",
    zIndex: 1,
    maxWidth: ["100%", "100%", "52%"],
    h1: {
        maxWidth: "12em",
    },
});

export const homeHeaderMedia = settings.mq({
    position: ["relative", "relative", "absolute"],
    right: 0,
    top: ["0", "0", "20%"],
    width: ["100%", "100%", "44%"],
    height: ["280px", "320px", "78%"],
    display: "flex",
    alignItems: "center",
    justifyContent: ["center", "center", "flex-end"],
    maxHeight: ["280px", "320px", "320px"],
});

export const homeHeaderFacts = {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "10px 18px",
    marginTop: "18px",
    marginBottom: "8px",
};

export const homeHeaderFact = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: settings.colors.dark,
    p: {
        margin: 0,
        fontSize: "0.9rem",
    },
    svg: {
        color: settings.colors.primary,
        flexShrink: 0,
    },
};

export const homeHeaderLink = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "16px",
    color: settings.colors.primary,
    fontWeight: 600,
    textDecoration: "none",
};

export const homeHeaderMediaImage = settings.mq({
    width: "100%",
    height: "100%",
    objectFit: "cover",
    objectPosition: "center",
    borderRadius: settings.borderRadius.large,
    boxShadow: "0 18px 40px rgba(1, 102, 170, 0.16)"
});

export const loaderContainer = () =>
    settings.mq({
        position: "absolute",
        zIndex: 3,
        left: "50%",
        bottom: "60px",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "row",
        gap: "8px",
    });

export const slideDot = (isActive: boolean) =>
    settings.mq({
        width: "8px",
        height: "8px",
        padding: 0,
        border: 0,
        borderRadius: "999px",
        cursor: "pointer",
        backgroundColor: isActive ? settings.colors.primary : settings.colors.grey,
    });
