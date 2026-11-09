import { css } from "@emotion/react";
import settings from "@settings";

export const h1 = settings.mq({
  fontFamily: "Inter, sans-serif",
  textTransform: "uppercase",
  margin: 0,
  padding: 0,
  letterSpacing: "1.2px",
  color: "inherit",
  fontWeight: 600,
  textRendering: "optimizeLegibility",
  lineHeight: 1.1,
  fontSize: ["1.8rem", "2.4rem", "3.6rem"],
});

export const h2 = settings.mq({
  fontFamily: "Inter, sans-serif",
  margin: "1.8rem 0 0.9rem 0",
  padding: 0,
  letterSpacing: "0.01rem",
  color: "inherit",
  fontWeight: 400,
  textRendering: "optimizeLegibility",
  lineHeight: 1.1,
  textTransform: "none",
  fontSize: ["1.2rem", "1.8rem"],
});

export const h3 = settings.mq({
  fontSize: ["0.9rem", "1.1rem", "1.2rem"],
  textTransform: "none",
  fontFamily: "Inter, sans-serif",
  margin: "0 ",
  padding: 0,
  letterSpacing: "0.05rem",
  color: "inherit",
  fontWeight: 500,
  textRendering: "optimizeLegibility",
  lineHeight: 1.2,
});

export const h4 = css({
  margin: "0 0 0.5em 0",
  padding: 0,
  color: "inherit",
  fontFamily: "Inter, sans-serif",
  fontWeight: 400,
  textRendering: "optimizeLegibility",
  fontSize: "1.1rem",
});

export const h5 = css({
  fontFamily: "Inter, sans-serif",
  padding: 0,
  fontWeight: 600,
  color: "inherit",
  textRendering: "optimizeLegibility",
  fontSize: "0.85rem",
  lineHeight: 1.1,
  margin: "0 0 0.6rem 0",
  letterSpacing: "0.1rem",
});

export const h6 = css({
  fontFamily: "Inter, sans-serif",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
  fontWeight: 600,
  margin: 0,
  padding: 0,
  color: "inherit",
  textRendering: "optimizeLegibility",
  fontSize: "0.85rem",
  lineHeight: 1.1,
});

export const hgroup = css({
  margin: "0 0 1.45rem 0",
  padding: 0,
});

export const p = css({
  fontFamily: "Open Sans, sans-serif",
  fontSize: ["0.84rem", "0.9rem"],
  lineHeight: "1.6",
  padding: 0,
  marginBlockEnd: "0",
});

export const a = css({
  fontFamily: "Open Sans, sans-serif",
  fontSize: "1rem",
  lineHeight: "1.2rem",
  margin: 0,
  padding: 0,
});
