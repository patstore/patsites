import { css } from "@emotion/react";
import settings from "@settings";

export const calendarContainer = {
  width: "100%",
  minHeight: "40vh",
};

export const calendarLayout = settings.mq({
  display: "flex",
  flexDirection: ["column", "column", "column", "row"],
  flexWrap: "wrap",
  alignItems: ["stretch", "stretch", "stretch", "stretch"],
  justifyContent: "space-between",
  gap: settings.sizes.large,
  width: "100%",
});

export const calendarMain = settings.mq({
  order: [2, 2, 2, 1],
  flex: ["1 1 auto", "1 1 auto", "1 1 auto", "1 1 0"],
  minWidth: 0,
  width: "100%",
  backgroundColor: settings.colors.white,
});

export const calendarFiltersSidebar = settings.mq({
  order: [1, 1, 1, 2],
  width: ["100%", "100%", "100%", "360px"],
  flex: ["0 0 auto", "0 0 auto", "0 0 auto", "0 0 360px"],
  alignSelf: ["stretch", "stretch", "stretch", "stretch"],
});

export const calendarFiltersPanel = css({
  backgroundColor: settings.colors.white,
  padding: settings.padding.medium,
  boxSizing: "border-box",
});

export const calendarFiltersStack = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: settings.sizes.medium,
  width: "100%",
});

export const sidebarFilterField = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: settings.sizes.small,
  width: "100%",
});

export const subHeaderContainer = {
  position: "fixed",
  width: "100vw",
  zIndex: 2,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  left: 0,
  backgroundColor: settings.colors.light,
  color: settings.colors.dark,
  borderTop: `1px solid ${settings.colors.grey}`,
  borderBottom: `1px solid ${settings.colors.grey}`,
  h3: {
    marginBottom: 0,
  },
};

export const subHeaderButton = {
  border: `2px solid ${settings.colors.primary}`,
  color: settings.colors.primary,
  fontFamily: "Oswald",
  textTransform: "uppercase",
  fontSize: "14px",
  cursor: "pointer",
  transition: "all 0.4s ease",
};

export const styledInput = {
  padding: settings.padding.small,
  color: settings.colors.dark,
  border: `1px solid ${settings.colors.grey}`,
  height: "auto",
  width: "100%",
  outline: "0px",
  marginTop: 0,
  marginBottom: 0,
  transition: "border 0.4s ease",
  ":focus-visible": {
    border: `1px solid ${settings.colors.primary}`,
  },
};

export const searchButton = settings.mq({
  display: "inline-block",
  fontFamily: "Oswald",
  fontWeight: 600,
  letterSpacing: ".15rem",
  textTransform: "uppercase",
  width: "auto",
  padding: [
    settings.padding.small,
    settings.padding.small,
    settings.padding.medium,
  ],
  fontSize: [
    settings.fontSize.small,
    settings.fontSize.small,
    settings.fontSize.medium,
  ],
  backgroundColor: settings.colors.primary,
  color: settings.colors.white,
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease",
  ":hover": {
    backgroundColor: settings.colors.primary,
    color: settings.colors.white,
  },
});

export const label = {
  color: settings.colors.dark,
  marginTop: settings.sizes.medium,
  marginBottom: settings.sizes.small,
  transition: "outline 0.4s ease",
  fontWeight: 600,
  fontSize: settings.fontSize.semismall,
  textTransform: "uppercase",
  float: "left",
};

/** The list view only exists on desktop, so the switch does too. */
export const viewSwitchContainer = settings.mq({
  display: ["none", "none", "none", "flex"],
  justifyContent: "flex-start",
  alignItems: "center",
  gap: settings.sizes.small,
  width: "100%",
});

type SquareChoiceVariant = "disabled" | "default" | "selected";

const choiceButtonColors = (variant: SquareChoiceVariant) => ({
  cursor: variant === "disabled" ? "default" : "pointer",
  color: settings.colors.white,
  backgroundColor:
    variant === "disabled"
      ? settings.colors.grey
      : variant === "selected"
        ? settings.colors.primary
        : settings.colors.dark,
});

const choiceButtonBase = {
  display: "inline-flex",
  flexDirection: "column" as const,
  alignItems: "center",
  justifyContent: "center",
  border: "none",
  borderRadius: 0,
  fontFamily: "Inter, sans-serif",
  fontWeight: 600,
  letterSpacing: "0.04em",
  lineHeight: 1.15,
  textAlign: "center" as const,
  textTransform: "uppercase" as const,
  transition: "background-color 0.2s ease",
};

/** Weekday bar: short square labels on mobile, full names spanning the row on desktop. */
export const weekdayChoiceButton = (variant: SquareChoiceVariant) =>
  settings.mq({
    ...choiceButtonBase,
    ...choiceButtonColors(variant),
    flex: ["0 0 auto", "0 0 auto", "0 0 auto", "1 1 0"],
    width: ["4.5rem", "4.5rem", "4.5rem", "auto"],
    minWidth: ["4.5rem", "4.5rem", "4.5rem", 0],
    height: ["4.5rem", "4.5rem", "4.5rem", "auto"],
    minHeight: ["4.5rem", "4.5rem", "4.5rem", "3.25rem"],
    padding: ["4px", "4px", "4px", settings.padding.small],
    fontSize: ["10px", "10px", "10px", settings.fontSize.tiny],
    textTransform: ["uppercase", "uppercase", "uppercase", "none"],
  });

export const weekdayLabelShort = settings.mq({
  display: ["inline", "inline", "inline", "none"],
});

export const weekdayLabelFull = settings.mq({
  display: ["none", "none", "none", "inline"],
});

/** Smaller square buttons for age and view filters. */
export const filterChoiceButtonSquare = (variant: SquareChoiceVariant) =>
  css({
    ...choiceButtonBase,
    ...choiceButtonColors(variant),
    width: "3.25rem",
    height: "3.25rem",
    padding: "2px",
    fontSize: "9px",
  });

/** Compact padded buttons (e.g. Geschlecht). */
export const filterChoiceButtonPadded = (variant: SquareChoiceVariant) =>
  css({
    ...choiceButtonBase,
    ...choiceButtonColors(variant),
    flexDirection: "row",
    width: "auto",
    height: "auto",
    padding: settings.padding.tiny,
    fontSize: settings.fontSize.tiny,
    fontWeight: 500,
    letterSpacing: "0.02em",
  });

export const choiceButtonRow = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  gap: settings.sizes.small,
});

export const weekdayFilterBar = settings.mq({
  order: 0,
  flex: "1 1 100%",
  display: "flex",
  flexDirection: "row",
  flexWrap: ["wrap", "wrap", "wrap", "nowrap"],
  alignItems: "stretch",
  justifyContent: ["center", "center", "center", "stretch"],
  gap: settings.sizes.small,
  width: "100%",
});

export const searchInputContainer = settings.mq({
  display: "flex",
  gap: settings.sizes.medium,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  margin: `${settings.sizes.small} 0`,
});
