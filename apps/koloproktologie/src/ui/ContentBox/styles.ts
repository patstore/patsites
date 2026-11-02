import { css } from "@emotion/react";
import settings from "@settings";

export const contentBoxContainer = ({ background }: { background?: string }) =>
    css({
        width: "100%",
        // maxWidth: "50%",
        height: "auto",
        backgroundColor: background ? background : settings.colors.light,
        paddingLeft: settings.sizes.medium,
        paddingRight: settings.sizes.medium,
        borderRadius: settings.sizes.large,
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 0.4s ease",
        a: {
            fontSize: settings.fontSize.small
        }
    });

export const iconContainer = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: "24px"
});
