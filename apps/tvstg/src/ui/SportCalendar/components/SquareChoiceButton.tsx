import React from "react";
import { SerializedStyles } from "@emotion/react";
import {
  filterChoiceButtonPadded,
  filterChoiceButtonSquare,
  weekdayChoiceButton,
} from "../styles";

export type ChoiceButtonShape = "weekday" | "filter-square" | "filter-padded";

type SquareChoiceButtonProps = {
  label: React.ReactNode;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
  ariaLabel?: string;
  shape?: ChoiceButtonShape;
};

const shapeStyles: Record<
  ChoiceButtonShape,
  (variant: "disabled" | "default" | "selected") => SerializedStyles
> = {
  weekday: weekdayChoiceButton,
  "filter-square": filterChoiceButtonSquare,
  "filter-padded": filterChoiceButtonPadded,
};

const SquareChoiceButton: React.FC<SquareChoiceButtonProps> = ({
  label,
  selected,
  disabled = false,
  onClick,
  ariaLabel,
  shape = "filter-square",
}) => {
  const variant = selected ? "selected" : disabled ? "disabled" : "default";

  return (
    <button
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      aria-label={ariaLabel}
      css={shapeStyles[shape](variant)}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SquareChoiceButton;
