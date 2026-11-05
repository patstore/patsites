import settings from "@settings";

export const weekDayContainer = {
  minWidth: "300px",
};

export const weekDayContainerInvisible = {
  minWidth: "300px",
  opacity: 0,
};

export const trainingImage = {
  width: "100%",
  overflow: "hidden",
  // borderRadius: `${settings.siz.medium}`,
};

export const trainingElement = settings.mq({
  position: "relative",
  height: "auto",
  overflow: "hidden",
  width: ["100%", "49%", "49%", "32%"],
  display: "flex",
  borderTop: `0.6px solid ${settings.colors.grey}`,

  borderLeft: `0.6px solid ${settings.colors.grey}`,
  borderRight: `0.6px solid ${settings.colors.grey}`,
  alignItems: "stretch",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: settings.sizes.medium,
  "&:last-child": {
    borderBottom: `0.6px solid ${settings.colors.grey}`,
  },
});

export const desktop = "@media (min-width: 992px)";

/** Every row uses the same column template so rows line up like a table. */
const listColumns =
  "96px minmax(180px, 1fr) 120px 190px minmax(0, 1.6fr) 150px";

const ellipsis = {
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
} as const;

export const trainingListElement = {
  [desktop]: {
    width: "100%",
    display: "flex",
    flexDirection: "row" as const,
    alignItems: "stretch" as const,
    gap: 0,
    minHeight: "180px",
  },
};

export const trainingCardContent = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  justifyContent: "flex-start",
  gap: settings.sizes.medium,
  borderBottom: `0.6px solid ${settings.colors.grey}`,
} as const;

export const trainingCardInfo = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  gap: settings.sizes.small,
  padding: settings.padding.small,
  minWidth: 0,
} as const;

/** Lets the card's nested blocks become cells of the row grid. */
export const listCells = { [desktop]: { display: "contents", padding: settings.padding.small } };

export const trainingListImage = {
  [desktop]: {
    width: "240px",
    // height: "auto",
    aspectRatio: "16/9",
    padding: settings.padding.small,
    boxSizing: "border-box" as const,
    overflow: "hidden",
  },
};

export const trainingTitleCell = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: settings.sizes.small,
  minWidth: 240,
} as const;

export const trainingListCell = {
  [desktop]: { minWidth: 0, p: { maxWidth: "none", ...ellipsis } },
};

export const trainingListButton = {
  [desktop]: { marginBottom: 0, padding: 0 },
};

export const calendarContent = settings.mq({
  display: "flex",
  flexDirection: ["column", "column", "column"],
  alignItems: ["flex-start", "flex-start", "flex-start"],
  justifyContent: "space-between",
  gap: settings.sizes.medium,
});

export const trainingElementuttonContainer = settings.mq({
  fontFamily: "var(--font-family-primary)",
  fontSize: "1.2rem",
  fontWeight: 600,
  textAlign: "center",
  lineHeight: "1.2 !important",
  maxWidth: "240px",
  marginBottom: settings.sizes.small,
  justifySelf: "flex-end",
  width: "90px",
  padding: settings.padding.small,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  borderLeft: `0.6px solid ${settings.colors.grey}`,
});

export const weekdayElement = {
  width: "100%",
  backgroundColor: settings.colors.primary,
  color: settings.colors.light,
  padding: settings.padding.medium,
  marginBottom: settings.sizes.medium,
  marginTop: settings.sizes.medium,
  boxShadow: settings.shadows.regular,
};

export const calendarContainer = {
  width: "100%",
  minHeight: "40vh",
  overflow: "auto",
  h3: { fontWeight: "bold", marginBottom: 0 },
};
