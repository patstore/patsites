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
        padding: size === "large" ? "12px 24px" : "10px 20px",
        borderRadius: settings.sizes.small,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        fontFamily: "Raleway",
        gap: "6px",
        textDecoration: "none !important",
        textTransform: "uppercase",
        marginTop: settings.sizes.medium,
        fontSize:
      size === "large" ? settings.fontSize.semismall : settings.fontSize.small,
        a: {
            textDecoration: "none !important",
            margin: "0 !important"
        },
        ":disabled": {
            backgroundColor: `${settings.colors.grey} !important`,
            color: settings.colors.darkgrey
        }
    });
