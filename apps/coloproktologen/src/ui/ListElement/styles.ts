import settings from "@settings";
import { highlightText } from "@styles";

export const listElementContainer = settings.mq({
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: "100%",
  borderTop: `0.6px solid ${settings.colors.grey}`,
  paddingTop: settings.padding.small,
  backgroundColor: settings.colors.white,
  h3: {
    marginTop: "30px !important",
    marginBottom: "48px",
    maxWidth: "360px",
  },
  p: {
    ...highlightText,
    maxWidth: "360px",
  },
});

export const listElementContent = settings.mq({
  flex: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
});

export const listContainer = settings.mq({
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  flex: "50%",
  li: {
    width: "100%",
    paddingLeft: settings.sizes.medium,
    paddingRight: settings.sizes.medium,
    paddingTop: "30px",
    paddingBottom: "30px",
    borderBottom: `0.6px solid ${settings.colors.grey}`,
  },
});
