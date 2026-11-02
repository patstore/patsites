import { css } from "@emotion/react";
import settings from "@settings";
import { h3 } from "../../styles";

export const elementsContainer = css({
  position: "relative",
});

export const filterContainer = css({
  width: "100%",
  top: 0,
  left: 0,
  marginBottom: settings.sizes.small,
});

export const elementsInterfaceContainer = (isHorizontal: boolean) =>
  css({
    display: "flex",
    flexDirection: isHorizontal ? "row" : "column",
    justifyContent: "flex-start",
    alignItems: isHorizontal ? "center" : "stretch",
    gap: settings.sizes.small,
    overflow: "auto",
    flexWrap: "wrap",
    paddingBottom: settings.sizes.small,
  });

export const listElementContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: settings.sizes.medium,
  cursor: "pointer",
  flex: 1,
  border: `.6px solid ${settings.colors.grey}`,
  padding: settings.sizes.medium,
  backgroundColor: settings.colors.white,
  fontFamily: "Raleway",
  fontSize: settings.fontSize.medium,
  fontWeight: 500,
  whiteSpace: "nowrap",
  "&:hover": {
    backgroundColor: settings.colors.light,
  },
  "&:disabled": {
    cursor: "default",
    "&:hover": {
      backgroundColor: settings.colors.white,
    },
  },
  '&[data-selected="true"]': {
    backgroundColor: settings.colors.light,
  },
});
