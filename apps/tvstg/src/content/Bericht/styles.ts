import settings from "@settings";

export const LabelLargeBlog = settings.mq({
  padding: "0.6em 1.2em",
  margin: "1em 0",
  width: "auto",
  display: "inline-block",
  border: [
    `1px solid ${settings.colors.dark}`,
    `1px solid ${settings.colors.dark}`,
    `1px solid ${settings.colors.dark}`,
    `1px solid ${settings.colors.dark}`,
    `1px solid ${settings.colors.dark}`,
  ],
  fontFamily: "Oswald, sans-serif",
  fontSize: "1.2em",
  color: [
    settings.colors.dark,
    settings.colors.dark,
    settings.colors.dark,
    settings.colors.dark,
    settings.colors.dark,
  ],
  lineHeight: "0.8em",
});

export const imageContainer = settings.mq({
  zIndex: 5,
  width: ["100%", "100%", "100%", "100%", "100%"],
  marginBottom: "1.2rem",
  borderRadius: settings.sizes.medium,
  overflow: "hidden",
});
