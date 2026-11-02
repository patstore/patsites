import { css } from "@emotion/react";
import settings from "@settings";

export const wrapper = settings.mq({
    marginLeft: "auto",
    marginRight: "auto",
    overflowX: "hidden",
    width: "100%",
    paddingTop: "30px"
});

export const mainContainer = settings.mq({
    width: ["100%", "100%", "100%", "calc(100% - 320px)"],
    height: "auto",
    ul: { fontSize: ".9rem" },
    li: { fontSize: ".9rem" }
});

export const sidebarContainer = settings.mq({
    width: ["100%", "100%", "100%", "320px"],
    height: "auto",
    display: "flex",
    flexDirection: ["column", "column", "column", "column"],
    alignItems: "center",
    gap: "1em",
    padding: ["2em", "2em", "2em", "0 2em 0 2em", "0 0 0 2em"]
});

export const siteContainer = settings.mq({
    marginTop: "0",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1040px",
    width: "100%",
    height: "auto",
    position: "relative"
});

export const siteContainerSmall = settings.mq({
    marginTop: "0",
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "720px",
    width: "100%",
    height: "auto",
    position: "relative"
});

export const th = {
    borderBottom: `1px solid ${settings.colors.grey}`,
    fontSize: "0.8rem",
    fontWeight: 600,
    letterSpacing: "2px"
};

export const tr = {
    borderBottom: `1px solid ${settings.colors.grey}`,
    td: {
        padding: "6px 12px"
    }
};

export const sectionHeader = css({
    marginTop: settings.sizes.medium,
    marginBottom: settings.sizes.medium,
    fontFamily: "Oswald, sans-serif",
    letterSpacing: "0.1rem",
    fontSize: "0.8rem",
    textTransform: "uppercase",
    borderRadius: settings.sizes.small,
    fontWeight: 400,
    color: settings.colors.white,
    backgroundColor: settings.colors.primary,
    paddingTop: "0.5em",
    paddingBottom: "0.5em",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    width: "100%"
});

export const topline = settings.mq({
    fontFamily: "Montserrat",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "0.1rem",
    fontSize: "0.8rem",
    color: settings.colors.primaryShaded,
    marginBottom: [settings.sizes.l, settings.sizes.xl, settings.sizes.xxl]
});

export const highlightText = settings.mq({
    fontFamily: "Montserrat",
    fontWeight: "400 !important",
    letterSpacing: "0.1rem",
    lineHeight: "1.36",
    fontSize: ["14px !important", "14px !important", "15px !important"],
    color: settings.colors.dark,
    marginBottom: ["24px", "30px", "36px"]
});

export const rightContent = settings.mq({
    width: "100%",
    paddingLeft: ["0", "0", "0", "50%"]
});

export const highlightContent = ({ background }: { background?: string }) =>
    settings.mq({
        // flex: "1 1 300px",
        // maxWidth: "50%",
        height: "auto",
        backgroundColor: background ? background : settings.colors.white,
        padding: settings.padding.large,
        borderRadius: settings.sizes.large,
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 0.4s ease",
        a: {
            fontSize: ["14px", "14px", "15px"],
            fontWeight: "600 !important"
        }
        // border: `1px solid ${settings.colors.grey}`
    });

export const buttonsContainer = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: settings.sizes.medium
});
