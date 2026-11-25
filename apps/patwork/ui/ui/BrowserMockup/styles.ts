import { css } from "@emotion/react";

export const container = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
});

export const browser = (height: number, width: number, borderRadius: number) =>
    css({
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "white",
        borderRadius: `${borderRadius}px`,
        boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
        border: "1.2px solid var(--color-light)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column"
    });

export const topBar = (height: number) =>
    css({
        height: `${height}px`,
        backgroundColor: "#F3F4F6",
        display: "flex",
        alignItems: "center",
        padding: "0 16px",
        position: "relative",
        borderBottom: "2px solid #D1D5DB"
    });

export const circles = css({
    display: "flex",
    gap: "8px"
});

export const circle = (color: string, height: number, width: number) =>
    css({
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: color,
        borderRadius: "50%"
    });

export const contentContainer = css({
    flex: 1,
    position: "relative",
    overflow: "auto",
    backgroundColor: "#FFFFFF",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "stretch",
    fontSize: "18px",
    color: "#374151"
});
