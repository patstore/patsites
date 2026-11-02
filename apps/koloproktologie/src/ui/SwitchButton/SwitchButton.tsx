import React, { useMemo } from "react";

import settings from "@settings";
import { SwitchButtonProps } from "./types";
import { motion } from "motion/react";

const SwitchButton: React.FC<SwitchButtonProps> = ({
    initialState,
    state,
    text,
    onClick,
    disabled
}) => {
    const isActive = state.value === initialState.value;

    const fontColor = "";
    const fontHover = "";
    const backgroundHover = settings.colors.primary;

    const styledSwitchButton = useMemo(
        () =>
            settings.mq({
                fontFamily: "Montserrat",
                fontWeight: 500,
                textTransform: "uppercase",
                width: "auto",
                padding: settings.padding.small,
                letterSpacing: "0.06em",
                fontSize: settings.fontSize.small,
                backgroundColor: !isActive ? "transparent" : backgroundHover,
                color: !isActive ? fontColor : fontHover,
                cursor: disabled ? "default" : "pointer",
                transition: "background-color 0.1s ease, color 0.1s ease",
                borderRadius: "18px",
                ":hover": {
                    backgroundColor: backgroundHover,
                    color: fontHover
                }
            }),
        [isActive]
    );

    return (
        <motion.button
            css={styledSwitchButton}
            disabled={disabled}
            onClick={() => onClick(initialState)}
            animate={
                isActive
                    ? {
                        backgroundColor: settings.colors.primary,
                        color: settings.colors.white
                    }
                    : {
                        backgroundColor: "transparent",
                        color: settings.colors.dark
                    }
            }
            transition={{ duration: 0.2, ease: "easeOut" }}
        >
            {text}
        </motion.button>
    );
};

export default SwitchButton;
