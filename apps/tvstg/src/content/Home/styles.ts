import { css } from "@emotion/react";
import settings from "@settings";
import { sectionHeader } from "@styles";

const desktop = "@media (min-width: 992px)";

/** Sidebar column: full row height on desktop so the JS sticky track has room. */
export const homeSidebarColumn = settings.mq({
  alignSelf: ["flex-start", "flex-start", "flex-start", "stretch"],
  alignItems: ["center", "center", "center", "stretch"],
  justifyContent: "flex-start",
  paddingTop: ["2em", "2em", "2em", 0, 0],
});

export const homeTwoColumnRow = settings.mq({
  width: "100%",
  alignItems: ["flex-start", "flex-start", "flex-start", "stretch"],
});

/** Placeholder column for measured `position: fixed` sidebar (see HomeStickySidebar). */
export const homeStickyTrack = settings.mq({
  width: "100%",
  position: "relative",
  flex: ["0 0 auto", "0 0 auto", "0 0 auto", "1 1 auto"],
  minHeight: ["0", "0", "0", "100%"],
});

export const homeStickyPanel = settings.mq({
  width: "100%",
  maxHeight: [
    "none",
    "none",
    "none",
    "calc(100vh - var(--tvstg-site-header, 100px) - 1rem)",
  ],
  overflowY: ["visible", "visible", "visible", "auto"],
});

/** Keeps Jobbörse flush with the article grid (no vertical centering / space-between). */
export const homeSidebarInner = css({
  width: "100%",
  "& > div": {
    justifyContent: "flex-start",
    height: "auto",
    minHeight: 0,
  },
});

export const homeSectionGap = css({
  display: "flex",
  flexDirection: "column",
  gap: settings.sizes.large,
  width: "100%",
});

export const homeAppointmentsHeader = [sectionHeader];

const listColumns = "112px minmax(0, 1fr) 48px";

export const appointmentRow = settings.mq({
  position: "relative",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: settings.sizes.small,
  padding: settings.padding.medium,
  borderTop: `0.6px solid ${settings.colors.lightgrey}`,
  backgroundColor: settings.colors.white,
  cursor: "pointer",
  ":hover": {
    backgroundColor: settings.colors.light,
  },
  "&:last-child": {
    borderBottom: `0.6px solid ${settings.colors.lightgrey}`,
  },
  [desktop]: {
    display: "grid",
    gridTemplateColumns: listColumns,
    alignItems: "stretch",
    gap: 0,
    minHeight: "72px",
    padding: 0,
  },
});

export const appointmentMain = {
  [desktop]: {
    display: "flex",
    flexDirection: "column" as const,
    justifyContent: "center",
    alignItems: "flex-start",
    gap: settings.sizes.small,
    padding: "12px 16px",
    minWidth: 0,
  },
};

export const appointmentTitle = {
  margin: 0,
  fontSize: "1.25rem !important",
  lineHeight: "1.25 !important",
};

export const appointmentTags = {
  display: "flex",
  flexDirection: "row" as const,
  flexWrap: "wrap" as const,
  alignItems: "center",
  gap: "6px",
  width: "100%",
};

export const appointmentTag = {
  display: "inline-block",
  fontSize: "0.7rem",
  lineHeight: 1.2,
  fontWeight: 600,
  letterSpacing: "0.02em",
  padding: "3px 8px",
  borderRadius: settings.borderRadius.small,
  color: settings.colors.grey,
  borderTop: `1px solid ${settings.colors.grey}`,
  borderBottom: `1px solid ${settings.colors.grey}`,
};

export const appointmentDate = settings.mq({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  textAlign: "left",
  gap: "2px",
  padding: [0, 0, 0, 0, "6px 10px"],
  [desktop]: {
    borderRight: `0.6px solid ${settings.colors.light}`,
  },
});

export const appointmentLinkButton = settings.mq({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  alignSelf: "stretch",
  minHeight: "48px",
  width: "100%",
  padding: settings.padding.small,
  border: "none",
  background: "transparent",
  color: settings.colors.dark,
  cursor: "pointer",
  [desktop]: {
    borderLeft: `0.6px solid ${settings.colors.light}`,
    height: "100%",
    width: "100%",
    minHeight: "72px",
  },
});

export const appointmentsList = css({
  width: "100%",
  marginTop: settings.sizes.small,
  backgroundColor: settings.colors.white,
});
