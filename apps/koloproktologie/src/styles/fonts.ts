import settings from "@settings";
import { css } from "@emotion/react";

export const h1 = settings.mq({
    fontFamily: "Montserrat",
    fontWeight: 500,
    letterSpacing: "2px",
    fontSize: ["24px", "36px", "42px"],
    margin: 0,
    lineHeight: "1.2",
    // textTransform: "uppercase",
    maxWidth: "660px",
    strong: { fontWeight: 700 },
    fontStyle: "regular",
    marginBottom: ["18px"]
});

export const h2 = settings.mq({
    fontFamily: "Montserrat",
    fontSize: ["21px", "24px", "24px"],
    lineHeight: 1.3,
    maxWidth: "600px",
    marginBottom: [settings.sizes.l, settings.sizes.xl, settings.sizes.xxl],

    letterSpacing: "2px",
    fontWeight: 500,
    color: "inherit",
    textAlign: "left"
});

export const h3 = settings.mq({
    marginBlockEnd: 0,
    fontFamily: "Montserrat",
    fontWeight: 500,
    fontSize: ["16px", "18px", "18px"],
    // marginTop: ["14px", "18px", "24px"],
    marginBottom: ["12px", "12px", "12px"],
    letterSpacing: "1.8px",
    // maxWidth: "540px",
    lineHeight: 1.2
});

export const h4 = css({
    fontFamily: "Montserrat",
    fontWeight: 600,
    letterSpacing: "2px",
    // maxWidth: "660px",
    // textTransform: "uppercase",
    lineHeight: 1.2,
    fontSize: [
        settings.fontSize.semismall,
        settings.fontSize.semismall,
        settings.fontSize.semismall
    ],
    marginTop: settings.sizes.small,
    marginBottom: settings.sizes.small
});

export const h5 = css({
    fontFamily: "Montserrat",
    fontWeight: 300,
    // fontSize: settings.fontSize.medium,
    letterSpacing: "1.2px",
    maxWidth: "660px",
    lineHeight: 1.5,
    margin: 0,
    marginBottom: settings.sizes.medium,
    fontSize: settings.fontSize.small
});

export const h6 = css({
    fontFamily: "Montserrat",
    fontWeight: 300,
    fontSize: settings.fontSize.large,
    letterSpacing: "1.2px",
    maxWidth: "660px",
    lineHeight: 1.5,
    margin: 0,
    marginBottom: settings.sizes.small
});

export const p = settings.mq({
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: [
        settings.fontSize.small,
        settings.fontSize.semismall,
        settings.fontSize.semismall
    ],
    letterSpacing: "1px",
    lineHeight: 1.6,
    margin: 0,
    marginBlockEnd: settings.sizes.medium,
    maxWidth: "660px",
    a: {
        paddingInline: "5px"
    },
    "a.no-padding-left": {
        paddingInlineStart: 0
    },
    "a.no-padding-right": {
        paddingInlineEnd: 0
    }
});

export const a = css({
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: "inherit",
    textDecoration: "underline",
    // color: "inherit",
    marginBlockEnd: settings.sizes.medium,
    color: settings.colors.primary
});

export const li = css({
    fontFamily: "Montserrat",
    fontWeight: 400,
    fontSize: [
        settings.fontSize.small,
        settings.fontSize.semismall,
        settings.fontSize.semismall
    ],
    letterSpacing: "1px",
    lineHeight: 1.6,
    marginBlockEnd: settings.sizes.small,
    maxWidth: "600px",
    p: {
        margin: "0 !important"
    }
});
