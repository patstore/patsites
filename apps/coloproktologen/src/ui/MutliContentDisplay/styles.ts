import { css } from "@emotion/react";
import settings from "@settings";

export const contentNavigationContainer = (
    direction: "vertical" | "horizontal"
) =>
    settings.mq({
        display: "flex",
        flexDirection: direction === "vertical" ? "row" : "column",
        alignItems: direction === "vertical" ? "center" : "stretch",
        justifyContent: direction === "vertical" ? "center" : "stretch",
        gap: settings.sizes.small,
        flex: 1,
        width: direction === "vertical" ? "100%" : "auto",
        borderRadius: settings.borderRadius.medium,
        border: `1px solid ${settings.colors.grey}`,
        padding: settings.padding.small,
        overflowX: "auto",
        flexWrap: "wrap"
    });

export const verticalDivider = css({
    position: "relative",
    width: "1px",
    height: "30px",
    backgroundColor: settings.colors.grey
});

export const displayContentContainer = (
    direction: "vertical" | "horizontal",
    contentHeight: string,
    color: "light" | "white"
) =>
    settings.mq({
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        alignItems: direction === "vertical" ? "stretch" : "center",
        justifyContent: direction === "vertical" ? "stretch" : "space-evenly",
        gap: settings.sizes.medium,
        backgroundColor: color === "light" ? settings.colors.light : settings.colors.white,
        // boxShadow: settings.shadows.regular,
        flex: 1,
        width: "100%",
        borderRadius: settings.borderRadius.medium,
        padding: settings.padding.medium,
        height: contentHeight
    });

export const contentNavigationItemContainer = (active: boolean, color: "light" | "white") =>
    settings.mq({
        fontFamily: "Raleway",
        fontSize: settings.fontSize.small,
        fontWeight: 500,
        letterSpacing: "0.4px",
        textTransform: "uppercase",
        cursor: "pointer",
        padding: settings.padding.large,
        borderRadius: settings.borderRadius.small,
        backgroundColor: active ? color === "light" ? settings.colors.light : settings.colors.white : "transparent",
        color: active ? settings.colors.primary : settings.colors.primary
    });
