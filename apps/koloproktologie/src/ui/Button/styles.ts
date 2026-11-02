import { css } from "@emotion/react";
import settings from "@settings";

export const buttonContainer = ({
    color,
    background,
    size
}: {
    color?: string;
    background?: string;
    size?: "medium" | "large";
}) =>
    css({
        cursor: "pointer",
        color: color,
        backgroundColor: background,
        padding: size === "large" ? "10px 20px" : "8px 16px",
        borderRadius: settings.sizes.large,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: "Montserrat",
        gap: "6px",
        textDecoration: "none !important",
        textTransform: "uppercase",
        fontWeight: 600,
        letterSpacing: "0.6px",
        fontSize:
            size === "large" ? settings.fontSize.small : settings.fontSize.tiny,
        a: {
            textDecoration: "none !important"
        },
        ":disabled": {
            backgroundColor: `${settings.colors.grey} !important`,
            color: settings.colors.darkgrey
        }
    });
