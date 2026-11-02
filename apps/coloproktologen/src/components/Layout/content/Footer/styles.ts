import { css } from "@emotion/react";
import settings from "@settings";

export const footerContainer = settings.mq({
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    gap: "30px",
    a: {
        textDecoration: "none !important",
        fontSize: "14px !important"
    },
    "a:hover": {
        color: `${settings.colors.secondary} !important`
    }
});

export const footerLinks = css({
    fontSize: "12px",
    fontWeight: 500,
    color: settings.colors.darkgrey,
    textDecoration: "none !important",
    letterSpacing: "2px",
    a: {
        fontSize: "12px",
        fontWeight: 500,
        color: settings.colors.darkgrey,
        textDecoration: "none !important",
        letterSpacing: "2px"
    }
});

export const footerLinksTwo = css({
    fontSize: "12px",
    fontWeight: 500,
    color: settings.colors.white,
    letterSpacing: "2px",
    a: {
        fontSize: "12px",
        fontWeight: 500,
        color: `${settings.colors.white} !important`,
        textDecoration: "underline !important",
        letterSpacing: "2px"
    }
});
