import { ReactNode } from "react";

export type ButtonProps = {
  text: string;
  onClick?: () => void;
  color?: "white" | "dark" | "primary";
  icon?: ReactNode;
  disabled?: boolean;
  className?: string;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
};
