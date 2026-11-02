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
    fontFamily: "Raleway",
    fontWeight: 400,
    textTransform: "uppercase",
    letterSpacing: "0.1rem",
    fontSize: "0.8rem",
    color: settings.colors.primary,
    marginBottom: ["12px"]
});

export const highlightText = settings.mq({
    fontFamily: "Raleway",
    fontWeight: "400 !important",
    letterSpacing: "0.1rem",
    lineHeight: "1.36",
    fontSize: ["18px !important", "21px !important", "21px !important"],
    color: settings.colors.dark,
    maxWidth: "960px !important",
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

export const contentBox = (flex?: string | string[]) => settings.mq({
    flex: flex ? flex : ["1 1 100%", "1 1 100%", "1 1 50%"],
    padding: settings.padding.medium,
    backgroundColor: settings.colors.light,
    borderRadius: settings.borderRadius.medium,
    overflow: "hidden",
    position: "relative"
});

export const detailsContainer = css({
    width: "100%",
    details: {
        backgroundColor: "transparent",
        padding: settings.padding.medium,
        borderTop: `0.6px solid ${settings.colors.grey}`,
        // marginBottom: settings.sizes.medium,
        // marginTop: settings.sizes.medium,
        summary: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: settings.sizes.medium
        },
        h3: {
            margin: "0 !important",
            fontSize: "1rem"
        }
    }
});

export const roundIcon = css({
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    backgroundColor: "transparent",
    color: settings.colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
});

export const memberContainer = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    minHeight: "800px",
    gap: "60px",
    paddingTop: "120px",
    backgroundColor: settings.colors.white
});
