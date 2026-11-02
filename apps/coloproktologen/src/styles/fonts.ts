import settings from "@settings";
import { css } from "@emotion/react";
import { highlightText } from "./styles";

export const h1 = settings.mq({
    fontFamily: "Raleway",
    fontWeight: 600,
    letterSpacing: "2px",
    fontSize: ["36px", "42px", "48px"],
    margin: 0,
    lineHeight: "1.2",
    // textTransform: "uppercase",
    strong: { fontWeight: 700 },
    fontStyle: "regular",
    marginBottom: ["18px"]
});

export const h2 = settings.mq({
    fontFamily: "Raleway",
    fontSize: ["24px", "30px", "36px"],
    lineHeight: 1.3,
    maxWidth: "720px",
    // marginTop: ["18px", "21px", "24px"],
    marginBottom: ["12px"],
    // marginTop: 0,
    letterSpacing: "2px",
    fontWeight: 600,
    color: "inherit"
});

export const h3 = settings.mq({
    marginBlockEnd: 0,
    fontFamily: "Raleway",
    fontWeight: 500,
    fontSize: ["18px", "18px", "18px"],
    marginTop: 0,
    marginBottom: ["18px", "18px", "18px"],
    letterSpacing: "1.8px",
    // maxWidth: "540px",
    lineHeight: 1.2
});

export const h4 = css({
    fontFamily: "Raleway",
    fontWeight: 600,
    letterSpacing: "2px",
    // maxWidth: "660px",
    // textTransform: "uppercase",
    lineHeight: 1.2,
    fontSize: "14px",
    marginTop: settings.sizes.small,
    marginBottom: settings.sizes.small
});

export const h5 = css({
    fontFamily: "Raleway",
    fontWeight: 600,
    // fontSize: settings.fontSize.medium,
    letterSpacing: "1.2px",
    maxWidth: "660px",
    lineHeight: 1.5,
    margin: 0,
    marginBottom: settings.sizes.medium,
    fontSize: settings.fontSize.small
});

export const h6 = css({
    fontFamily: "Raleway",
    fontWeight: 300,
    fontSize: settings.fontSize.large,
    letterSpacing: "1.2px",
    maxWidth: "660px",
    lineHeight: 1.5,
    margin: 0,
    marginBottom: settings.sizes.small
});

export const p = settings.mq({
    fontFamily: "Raleway",
    fontWeight: 400,
    fontSize: [
        settings.fontSize.semismall,
        settings.fontSize.semismall,
        settings.fontSize.semismall
    ],
    letterSpacing: "1px",
    lineHeight: 1.6,
    margin: 0,
    marginBlockEnd: settings.sizes.medium,
    maxWidth: "660px"
});

export const a = settings.mq({
    fontFamily: "Raleway",
    fontWeight: 400,
    fontSize: [
        settings.fontSize.semismall,
        settings.fontSize.semismall,
        settings.fontSize.semismall
    ],
    textDecoration: "underline",
    // color: "inherit",
    marginBlockEnd: settings.sizes.medium,
    color: settings.colors.primary
});

export const li = settings.mq({
    fontFamily: "Raleway",
    fontWeight: 400,
    fontSize: [
        settings.fontSize.semismall,
        settings.fontSize.semismall,
        settings.fontSize.semismall
    ],
    letterSpacing: "1px",
    lineHeight: 1.6,
    marginBlockEnd: settings.sizes.medium,
    maxWidth: "600px"
});

// export const headlineContainer = settings.mq({
//     flex: 1,
//     marginTop: "36px",
//     paddingTop: "36px",
//     marginBottom: "36px",
//     textAlign: "left",
//     display: "flex",
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     width: "100%",
//     borderTop: `0.6px solid ${settings.colors.grey}`,
//     gap: settings.sizes.medium,
//     h2: {
//         marginTop: 0,
//         marginBottom: "48px",
//         maxWidth: "360px",
//     },
//     p:  {
//         ...highlightText,
//         maxWidth: "auto",
//         flex: "0 1 50%",
//         paddingLeft: ["0", "0", settings.sizes.small],
//     }
// });

export const headlineContainer = settings.mq({
    flex: 1,
    marginTop: "36px",
    paddingTop: "36px",
    marginBottom: "36px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "100%",
    h2: {
        marginTop: 0
    },
    p: {
        ...highlightText,
        maxWidth: "auto"
    }
});
