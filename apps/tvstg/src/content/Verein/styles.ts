import settings from "@settings";

export const vereinsContainer = settings.mq({
  maxWidth: "720px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: settings.sizes.medium,
  video: {
    maxWidth: "100%",
    margin: "1rem auto",
  },
});
