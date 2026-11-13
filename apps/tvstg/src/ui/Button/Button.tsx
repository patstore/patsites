import { FC } from "react";
import { ButtonProps } from "./types";

const Button: FC<ButtonProps> = ({
  text,
  icon,
  onClick,
  disabled = false,
  className,
  type = "button",
}) => {
  return (
    <button
      className={["btn", className].filter(Boolean).join(" ")}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
