import { FC } from "react";
import { ButtonProps } from "./types";

const FullButton: FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  color = "dark",
  disabled = false,
  className,
  type = "button",
}) => {
  const tone = color === "primary" ? "primary" : color === "white" ? "light" : "";

  return (
    <button
      className={["btn", "solid", tone, className].filter(Boolean).join(" ")}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon}
      {text}
    </button>
  );
};

export default FullButton;
