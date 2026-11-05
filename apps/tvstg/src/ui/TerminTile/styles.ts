import settings from "@settings";

export const dateContainer = settings.mq({
  width: ["100%", "100%", "100%", "100%"],
  maxWidth: "360px",
  marginBottom: "2em",
  background: settings.colors.white,
  border: `1px solid ${settings.colors.grey}`,
  borderTop: `5px solid ${settings.colors.primary}`,
  p: {
    marginBottom: 0,
  },
  h2: {
    marginTop: 0,
  },
});

export const dateHeader = {
  backgroundColor: settings.colors.primary,
  padding: settings.padding.small,
  h4: { color: settings.colors.white },
};

export const innerContainer = {
  padding: settings.padding.small,
};
