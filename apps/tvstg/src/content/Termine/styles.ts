import { css } from "@emotion/react";
import settings from "@settings";

export const monthFilterBar = settings.mq({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "stretch",
  justifyContent: "center",
  gap: settings.sizes.small,
  width: "100%",
  marginBottom: settings.sizes.large,
  padding: ["0 2em", "0 2em", "0 2em", "0 2em", 0],
});

type MonthFilterButtonVariant = "disabled" | "default" | "selected";

export const monthFilterButton = (variant: MonthFilterButtonVariant) =>
  css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "3.25rem",
    minHeight: "3.25rem",
    padding: settings.padding.small,
    border: "none",
    borderRadius: 0,
    fontFamily: "Oswald",
    fontWeight: 600,
    fontSize: settings.fontSize.small,
    letterSpacing: "0.06em",
    lineHeight: 1.2,
    cursor: variant === "disabled" ? "default" : "pointer",
    color: settings.colors.white,
    backgroundColor:
      variant === "disabled"
        ? settings.colors.grey
        : variant === "selected"
          ? settings.colors.primary
          : settings.colors.dark,
    transition: "background-color 0.2s ease",
    ":hover":
      variant === "disabled"
        ? undefined
        : {
            backgroundColor:
              variant === "selected"
                ? settings.colors.primary
                : settings.colors.darkgrey,
          },
  });

export const termineContainer = settings.mq({
  marginTop: settings.sizes.large,
  display: "flex",
  flexDirection: "row",
  alignItems: "stretch",
  justifyContent: "space-between",
  flexWrap: "wrap",
  minHeight: "60vh",
  width: "100%",
});

export const monthContainer = settings.mq({
  marginTop: settings.sizes.medium,
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: settings.sizes.medium,
  width: "100%",
  padding: ["0 2em", "0 2em", "0 2em", "0 2em", 0],
});

export const monthHeader = css({
  width: "100%",
  marginBottom: "1.2rem",
  textTransform: "uppercase",
  fontWeight: 600,
  backgroundColor: settings.colors.lightgrey,
  padding: settings.padding.medium,
  border: `1px solid ${settings.colors.grey}`,
  borderRadius: "3px",
  h2: {
    margin: 0,
  },
});

export const eventName = css({
  flex: 0.2,
  padding: "12px",
});

export const eventCategory = css({
  flex: 0.1,
  padding: "12px",
});

export const eventDate = css({
  flex: 0.1,
  padding: "12px",
});

export const eventTime = css({
  flex: 0.1,
  padding: "12px",
});

export const eventPlace = css({
  flex: 0.2,
  padding: "12px",
});

export const eventInfo = css({
  flex: 0.3,
  padding: "12px",
});
