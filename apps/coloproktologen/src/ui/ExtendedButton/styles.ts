import { css } from "@emotion/react";
import settings from "@settings";

export const extendedButtonContainer = css(
  settings.mq({
    // border: `1px solid ${settings.colors.grey}`,
    marginTop: settings.sizes.medium,
    // marginBottom: settings.sizes.medium,
    // backgroundColor: settings.colors.light,
    position: "relative",
    fontFamily: "Raleway",
    // textTransform: 'uppercase',
    fontSize: [
      settings.fontSize.small,
      settings.fontSize.small,
      settings.fontSize.medium,
    ],
    textAlign: "left",
    fontWeight: 500,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: settings.sizes.small,
    paddingBottom: settings.sizes.small,
    letterSpacing: "1px",
    cursor: "pointer",
  }),
);

export const buttonContentContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: settings.sizes.medium,
  transition: "color .2s ease",
});

export const underline = css({
  backgroundColor: settings.colors.dark,
  height: "1.5px",
  position: "absolute",
  left: 0,
  bottom: 0,
  zIndex: 2,
});

export const underlineGrey = css({
  position: "absolute",
  backgroundColor: settings.colors.grey,
  height: "1.5px",
  left: 0,
  bottom: 0,
  width: "100%",
});
