import { css } from "@emotion/react";
import settings from "@settings";

export const videoListWrapper = settings.mq({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
});

export const videoFilterRow = css({
    width: "100%",
    marginBottom: "8px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "6px"
});

/** Bottom dock: full viewport width, fixed to bottom */
export const videoFilterDock = settings.mq({
    position: "fixed",
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    maxWidth: "100vw",
    zIndex: 20,
    backgroundColor: settings.colors.white,
    borderTop: `1px solid ${settings.colors.grey}`,
    boxShadow: "0 -10px 28px rgba(0, 0, 0, 0.1)",
    paddingTop: "14px",
    paddingBottom: "max(14px, env(safe-area-inset-bottom, 0px))",
    paddingLeft: [
        settings.sizes.medium,
        settings.sizes.large,
        settings.sizes.large,
        settings.sizes.medium
    ],
    paddingRight: [
        settings.sizes.medium,
        settings.sizes.large,
        settings.sizes.large,
        settings.sizes.medium
    ],
    boxSizing: "border-box"
});

export const videoFilterDockInner = settings.mq({
    width: "100%",
    maxWidth: "960px",
    margin: "0 auto",
    display: "flex",
    flexDirection: ["column", "column", "row"],
    alignItems: ["stretch", "stretch", "center"],
    justifyContent: "space-between",
    gap: "12px",
    "& > div:last-of-type": {
        flex: 1,
        minWidth: 0,
        maxWidth: ["100%", "100%", "520px"]
    }
});

export const videoFilterInputDock = css({
    maxWidth: "100% !important"
});

export const videoFilterLabel = css({
    display: "block",
    fontWeight: 600,
    marginBottom: "6px",
    fontSize: "14px"
});

export const videoFilterInput = css({
    width: "100%",
    maxWidth: "480px",
    padding: "10px 12px",
    borderRadius: settings.borderRadius.small,
    border: `1px solid ${settings.colors.dark}`,
    fontSize: "15px",
    boxSizing: "border-box",
    "&:focus": {
        outline: `2px solid ${settings.colors.primary}`,
        outlineOffset: "1px"
    }
});

export const videoFilterInputInvalid = css({
    borderColor: "#b00020"
});

export const videoFilterHint = css({
    marginTop: "6px",
    fontSize: "12px",
    color: settings.colors.dark,
    opacity: 0.85
});

export const videoFilterError = css({
    marginTop: "6px",
    fontSize: "12px",
    color: "#b00020"
});

export const videoListContainer = css({
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "space-between",
    flexWrap: "wrap",
    flexDirection: ["column", "column", "column"],
    gap: "12px",
    marginBottom: "60px"
});

export const videoListHeader = css({
    backgroundColor: settings.colors.primary,
    color: settings.colors.white,
    padding: "12px",
    marginBottom: "18px",
    width: "100%",
    borderRadius: settings.borderRadius.small,
    h3: {
        margin: "0 !important"
    }
});

export const videoElementContainer = css({
    width: "300px",
    height: "fit-content",
    borderRadius: settings.borderRadius.medium,
    overflow: "hidden",
    backgroundColor: settings.colors.light
});

export const horizontalVideoElementContainer = settings.mq({
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: ["column", "column", "row"],
    alignItems: ["flex-start", "flex-start", "center"],
    justifyContent: "flex-start",
    gap: settings.sizes.small,
    overflow: "hidden",
    padding: "6px 12px"
    // borderRadius: settings.borderRadius.medium,
    // backgroundColor: settings.colors.light
});

export const videoSectionContainer = css({
    width: "100%",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: settings.sizes.small,
    h2: {
        maxWidth: "100% !important",
        marginBottom: `${settings.sizes.small} !important`
    },
    p: {
        maxWidth: "100% !important"
    }
});

export const videoElementHorizontalSeparator = settings.mq({
    width: ["100%", "100%", "0.9px"],
    height: ["0.9px", "0.9px", "60px"],
    display: ["none", "none", "block"],
    backgroundColor: [
        settings.colors.dark,
        settings.colors.dark,
        settings.colors.dark
    ]
});

export const videoElementVerticalSeparator = settings.mq({
    width: ["100%", "100%", "0.9px"],
    height: ["0.9px", "0.9px", "60px"],
    display: ["block", "block", "none"],
    backgroundColor: [
        settings.colors.dark,
        settings.colors.dark,
        settings.colors.dark
    ]
});
