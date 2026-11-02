import settings from "@settings";
import { a, h1, h2, h3, h4, h5, h6, li, p } from "@styles";

export const layoutContainer = settings.mq({
  h1: h1,
  h2: h2,
  h3: h3,
  h4: h4,
  h5: h5,
  h6: h6,
  p: p,
  a: a,
  li: li,
  ul: {
    marginBlockEnd: settings.sizes.medium,
  },
});
