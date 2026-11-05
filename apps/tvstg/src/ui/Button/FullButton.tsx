import { FC, useMemo } from "react";
import { fullButton } from "./styles";
import { ButtonProps } from "./types";
import { motion } from "motion/react";
import settings from "@settings";

const FullButton: FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  color = "dark",
  disabled = false,
  styles = {},
  type = "button",
}) => {
  const buttonColors = useMemo(() => {
    if (color === "white") {
      return {
        color: settings.colors.dark,
        background: settings.colors.white,
      };
    }
    if (color === "dark") {
      return {
        color: settings.colors.white,
        background: settings.colors.dark,
      };
    }
    if (color === "primary") {
      return {
        color: settings.colors.white,
        background: settings.colors.primary,
      };
    }

    return {
      color: settings.colors.dark,
      background: settings.colors.white,
    };
  }, [color]);

  return (
    <motion.button
      css={[
        fullButton(disabled),
        {
          ...styles,
          backgroundColor: disabled
            ? settings.colors.grey
            : buttonColors.background,
          color: buttonColors.color,

          border: `2px solid ${buttonColors.background}`,
        },
      ]}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon && icon}
      {text}
    </motion.button>
  );
};

export default FullButton;
