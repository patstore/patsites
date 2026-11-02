import { css } from "@emotion/react";
import settings from "@settings";

export const formContainer = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: settings.sizes.small,
    flex: 1
});

export const horizontalContainer = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: settings.sizes.small,
    width: "100%"
});

export const loginContainer = css({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: settings.sizes.small
});

export const oldContentBox = css({
    backgroundColor: settings.colors.light,
    borderRadius: settings.sizes.medium,
    padding: settings.padding.medium
});
