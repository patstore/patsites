import settings from "@settings";

export const stickyAsideTrack = settings.mq({
  width: "100%",
  position: "relative",
  flex: ["0 0 auto", "0 0 auto", "0 0 auto", "1 1 auto"],
  minHeight: ["0", "0", "0", "100%"],
});

export const stickyAsidePanel = settings.mq({
  width: "100%",
  maxHeight: [
    "none",
    "none",
    "none",
    "calc(100vh - var(--tvstg-site-header, 100px) - 1rem)",
  ],
  overflowY: ["visible", "visible", "visible", "auto"],
});
