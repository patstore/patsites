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
  borderTop: `0.6px solid ${settings.colors.lightgrey}`,
  borderLeft: `0.6px solid ${settings.colors.lightgrey}`,
  borderRight: `0.6px solid ${settings.colors.lightgrey}`,
  alignItems: "stretch",
  flexDirection: "column",
  justifyContent: "space-between",
  gap: settings.sizes.medium,
  "&:last-child": {
    borderBottom: `0.6px solid ${settings.colors.lightgrey}`,
  },
});

export const desktop = "@media (min-width: 992px)";

/** Time, image, title, and arrow share one line. Labels sit under the title. */
const listColumns = "100px 112px minmax(320px, 1fr) 44px";

export const trainingListElement = {
  [desktop]: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: listColumns,
    alignItems: "stretch" as const,
    gap: 0,
    minHeight: 0,
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
  padding: settings.padding.medium,
  minWidth: 0,
} as const;

/** Lets the card's nested blocks become cells of the row grid. */
export const listCells = { [desktop]: { display: "contents", padding: settings.padding.medium } };

export const trainingListImage = {
  [desktop]: {
    width: "100%",
    height: "64px",
    padding: "4px 8px",
    boxSizing: "border-box" as const,
    overflow: "hidden",
    minWidth: 0,
    alignSelf: "center",
  },
};

export const trainingTitleCell = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: settings.sizes.medium,
  minWidth: 240,
} as const;

export const trainingListTitle = {
  [desktop]: {
    width: "100%",
    minWidth: 0,
    justifyContent: "center",
    gap: settings.sizes.medium,
    padding: "12px",
    h3: { margin: 0 },
    p: { margin: 0, maxWidth: "none" },
  },
};

export const trainingListTime = {
  [desktop]: {
    minWidth: 0,
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    padding: "6px 10px",
    borderRight: `0.6px solid ${settings.colors.grey}`,
    p: {
      maxWidth: "none",
      whiteSpace: "nowrap",
      overflow: "visible",
      textOverflow: "clip",
    },
  },
};

/** Labels sit in a row directly under the title. */
export const trainingListTags = {
  minWidth: 0,
  display: "flex",
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  alignItems: "center",
  gap: "6px",
  width: "100%",
};

export const trainingGridTags = {
  display: "flex",
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  alignItems: "center",
  gap: "6px",
  width: "100%",
} as const;

export const trainingTag = {
  display: "inline-block",
  maxWidth: "100%",
  fontSize: "0.7rem",
  lineHeight: 1.2,
  fontWeight: 600,
  letterSpacing: "0.02em",
  padding: "3px 8px",
  borderRadius: settings.borderRadius.small,
  backgroundColor: "transparent",
  color: settings.colors.grey,
  border: `1px solid ${settings.colors.grey}`,
} as const;

export const trainingListCell = {
  [desktop]: { minWidth: 0 },
};

export const trainingListButton = {
  [desktop]: {
    marginBottom: 0,
    padding: 0,
    width: "100%",
    maxWidth: "none",
    height: "100%",
    minHeight: "48px",
  },
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
};
