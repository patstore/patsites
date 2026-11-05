import settings from "@settings";

export const calendarContainer = {
  width: "100%",
  minHeight: "40vh",
  overflow: "auto",
  h3: { fontWeight: "bold", marginBottom: 0 },
};

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
  marginTop: settings.sizes.medium,
  marginBottom: settings.sizes.medium,
  transition: "border 0.4s ease",
  floeat: "left",
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
  justifyContent: "flex-end",
  alignItems: "center",
  gap: settings.sizes.small,
  width: "100%",
  button: { display: "inline-flex", alignItems: "center" },
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
