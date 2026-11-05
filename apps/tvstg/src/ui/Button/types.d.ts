import { CSSObject } from "@emotion/react";
import { ReactNode } from "react";

export type ButtonProps = {
  text: string;
  onClick: () => void;
  color?: "white" | "dark" | "primary";
  icon?: ReactNode;
  disabled?: boolean;
  styles?: CSSObject;
  size?: "small" | "medium" | "large";
  type?: "button" | "submit" | "reset";
};
