import { css } from "@emotion/react";
import settings from "@settings";
import { h1, h2, h3, h4, h5, h6, p, th, tr } from "@styles";

export const layoutContainer = settings.mq({
  position: "relative",
  overflow: "hidden",
  main: {
    overflow: "hidden",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  h5: h5,
  h6: h6,
  p: p,
  ul: {
    marginBlockEnd: settings.sizes.medium,
  },
  a: [
    p,
    {
      textDecoration: "underline",
      marginBlockEnd: "0 !important",
    },
  ],
  table: {
    borderCollapse: "collapse",
    thead: {
      th: th,
    },
    tbody: {
      tr: tr,
    },
  },
});

export const siteContentContainer = settings.mq({
  position: "relative",
  overflowY: "auto",
  overflowX: "hidden",
  height: "100%",
  width: "100%",
  paddingLeft: ["12px", "12px", "48px"],
  paddingRight: ["12px", "12px", "48px"],
});

export const siteInnerContent = settings.mq({
  maxWidth: "1040px",
  paddingTop: ["60px", "60px", "90px"],
  marginLeft: "auto",
  marginRight: "auto",
  position: "relative",
});
