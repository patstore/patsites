import { css } from "@emotion/react";
import settings from "@settings";

export const locationContainer = css({
  borderRadius: settings.borderRadius.medium,
  backgroundColor: settings.colors.lightgrey,
  padding: settings.padding.medium,
  display: "flex",
  flexDirection: "column",
  gap: settings.sizes.medium,
  h3: {
    margin: "0 !important",
  },
  p: {
    margin: "0 !important",
  },
  a: {
    margin: "0 !important",
  },
  // borderTop: `0.6px solid ${settings.colors.grey}`
});

export const locationIconContent = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: settings.sizes.small,
  minWidth: "90px",
});

export const specialistDescription = css({
  fontSize: settings.fontSize.small,
  p: {
    margin: "0 !important",
    fontSize: settings.fontSize.small,
  },
  a: {
    margin: "0 !important",
    fontSize: settings.fontSize.small,
  },
});
