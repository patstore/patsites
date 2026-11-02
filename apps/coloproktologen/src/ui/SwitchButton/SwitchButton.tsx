import React from "react";

import settings from "@settings";
import { SwitchButtonProps } from "./types";
import { motion } from "motion/react";
import { css } from "@emotion/react";

const SwitchButton: React.FC<SwitchButtonProps> = ({
    initialState,
    state,
    text,
    onClick,
    disabled
}) => {
    const isActive = state.value === initialState.value;

    const backgroundHover = settings.colors.primary;

    const styledSwitchButton = css({
        fontFamily: "Raleway",
        fontWeight: 500,
        textTransform: "uppercase",
        width: "auto",
        padding: settings.padding.small,
        letterSpacing: "0.06em",
        fontSize: settings.fontSize.small,
        backgroundColor:
      disabled || !isActive ? "transparent" : settings.colors.primary,
        color: disabled
            ? settings.colors.grey
            : !isActive
                ? settings.colors.primary
                : settings.colors.white,
        cursor: disabled ? "default" : "pointer",
        transition: "background-color 0.1s ease, color 0.1s ease",
        borderRadius: "18px",
        ":hover": {
            backgroundColor: disabled ? "transparent" : backgroundHover,
            color: disabled ? settings.colors.grey : settings.colors.white
        }
    });
    return (
        <motion.button
            css={styledSwitchButton}
            disabled={disabled}
            onClick={() => onClick(initialState)}
        >
            {text}
        </motion.button>
    );
};

export default SwitchButton;
