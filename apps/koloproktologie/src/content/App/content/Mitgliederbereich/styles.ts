import { css } from "@emotion/react";
import settings from "@settings";

export const informationContainer = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    minHeight: "800px",
    gap: "60px",
    paddingTop: "120px"
});

export const headerBackground = {
    // backgroundColor: settings.colors.lightgrey,
    padding: settings.padding.medium,
    borderRadius: settings.sizes.medium,
    border: `1px solid ${settings.colors.grey}`
};

/** Wrap ReactPaginate — its containerClassName only accepts plain strings. */
export const paginationWrapper = css({
    display: "flex",
    alignItems: "center",
    "& ul": {
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        gap: "6px",
        padding: 0,
        margin: "0 !important"
    },
    "& ul li": {
        margin: "0 !important",
        listStyle: "none"
    },
    "& ul a": {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "36px",
        height: "36px",
        padding: "0 12px",
        fontFamily: "Montserrat, sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: 1,
        textDecoration: "none",
        color: settings.colors.dark,
        backgroundColor: settings.colors.white,
        border: `1px solid ${settings.colors.grey}`,
        borderRadius: "18px",
        cursor: "pointer",
        transition:
            "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease",
        userSelect: "none"
    },
    "& ul a:hover": {
        backgroundColor: settings.colors.primary,
        color: settings.colors.white,
        borderColor: settings.colors.primary
    },
    "& ul li.active a": {
        backgroundColor: settings.colors.primary,
        color: settings.colors.white,
        borderColor: settings.colors.primary,
        boxShadow: "0 2px 8px rgba(1, 102, 170, 0.25)"
    },
    "& ul li.disabled a": {
        opacity: 0.35,
        cursor: "not-allowed",
        pointerEvents: "none"
    },
    "& ul li.previous a, & ul li.next a": {
        minWidth: "36px",
        padding: "0 10px",
        fontSize: "20px",
        fontWeight: 400
    },
    "& ul li.break a": {
        minWidth: "auto",
        padding: "0 2px",
        color: settings.colors.grey,
        background: "transparent",
        border: "none",
        cursor: "default"
    },
    "& ul li.break a:hover": {
        color: settings.colors.grey,
        background: "transparent",
        border: "none",
        boxShadow: "none"
    },
    "& ul a:focus-visible": {
        outline: `2px solid ${settings.colors.primary}`,
        outlineOffset: "2px"
    }
});

export const memberHighlightContent = ({
    background
}: {
    background?: string;
}) =>
    settings.mq({
        flex: "1 1 100%",
        // maxWidth: "50%",
        height: "auto",
        backgroundColor: "#f9f9f9",
        padding: settings.padding.large,
        borderRadius: settings.sizes.small,
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 0.4s ease",
        h4: {
            marginBottom: settings.sizes.medium
        }
        // borderBottom: `1px solid ${settings.colors.grey}`
    });
