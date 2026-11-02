import { css } from "@emotion/react";
import settings from "@settings";

export const eventTextContainer = css({
  maxWidth: "720px",
  h3: {
    marginBottom: "6px !important",
    fontWeight: 600
  },
  p: {
    fontSizes: settings.fontSize.tiny,
    margin: "0 !important",
    marginTop: "6px !important"
  },
});
