import { css } from "@emotion/react";
import settings from "@settings";
import { fullButton } from "@ui";

export const fieldContainer = css({
  width: "100%",
  position: "relative",
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: settings.sizes.small,
});

export const formField = css({
  position: "relative",
  input: {
    width: "100%",
    borderInlineWidth: 0,
    outline: 0,
    border: "1px solid lightgrey",
    backgroundColor: "transparent",
    transition: "border .2s ease",
    fontFamily: "inherit",
    padding: "6px 3px",
    marginBottom: "3px",
    fontSize: settings.fontSize.small,
    display: "block",
    "&:active": {
      borderInlineWidth: 0,
      border: "1px solid #333",
    },
    "&:focus": {
      borderInlineWidth: 0,
      border: "1px solid #333",
    },
    "&:disabled": {
      borderInlineWidth: 0,
      color: "lightgrey",
      border: "1px solid lightgrey",
    },
  },
  textArea: {
    width: "100%",
    borderInlineWidth: 0,
    outline: 0,
    border: "1px solid lightgrey",
    backgroundColor: "transparent",
    transition: "border .2s ease",
    fontFamily: "inherit",
    padding: "6px 3px",
    marginBottom: "3px",
    fontSize: settings.fontSize.small,
    display: "block",
    minHeight: "180px",
    "&:active": {
      borderInlineWidth: 0,
      border: "1px solid #333",
    },
    "&:focus": {
      borderInlineWidth: 0,
      border: "1px solid #333",
    },
  },
});

export const label = css({
  display: "inline-block",
  fontFamily: "inherit",
  textTransform: "uppercase",
  position: "relative",
  fontSize: "10px",
  marginTop: "12px",
  paddingTop: "12px",
  paddingBottom: "3px",
  letterSpacing: "1px",
  fontWeight: 500,
  '&[data-disabled="true"]': {
    color: "lightgrey",
  },
  '&[data-size="small"]': {
    flex: "0 0 60px",
  },
  '&[data-size="half"]': {
    flex: "0 1 calc(50% - 6px)",
  },
  '&[data-size="full"]': {
    flex: "0 1 100%",
  },
  '&[data-size="fill"]': {
    flex: "1 1 80%",
  },
});

export const formError = css({
  margin: "6px 0",
  fontSize: "9px",
  height: "12px",
  fontFamily: "inherit",
  color: "#d75055",
  position: "relative",
  width: "fit-content",
  bottom: 0,
  left: 0,
  display: "inline-block",
});

export const submitButton = (disabled: boolean) => fullButton(disabled);
