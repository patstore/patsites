import { FC, useMemo } from "react";
import { button } from "./styles";
import { ButtonProps } from "./types";
import { motion } from "motion/react";
import settings from "@settings";

const Button: FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  color = "dark",
  disabled = false,
  styles = {},
}) => {
  const buttonColors = useMemo(() => {
    if (color === "white") {
      return {
        color: settings.colors.white,
        hover: settings.colors.dark,
      };
    }
    if (color === "dark") {
      return {
        color: settings.colors.dark,
        hover: settings.colors.white,
      };
    }

    return {
      color: settings.colors.dark,
      hover: settings.colors.white,
    };
  }, [color]);

  return (
    <motion.button
      css={[
        button(disabled),
        {
          ...styles,
          backgroundColor: disabled ? settings.colors.grey : "transparent",
          color: buttonColors.color,
          padding: settings.padding.small,
          fontSize: settings.fontSize.small,
          border: `1px solid ${buttonColors.color}`,
          textDecoration: "none",
          "&:hover": {
            backgroundColor: disabled
              ? settings.colors.grey
              : buttonColors.color,
            color: buttonColors.hover,
          },
        },
      ]}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && icon}
      {text}
    </motion.button>
  );
};

export default Button;
