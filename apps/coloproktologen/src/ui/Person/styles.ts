import { css } from "@emotion/react";
import settings from "@settings";

export const personContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3px",
  p: {
    textAlign: "center",
    maxWidth: "300px",
  },
});

export const personImage = css({
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  objectFit: "cover",
  backgroundColor: settings.colors.light,
  marginBottom: settings.sizes.medium,
});
