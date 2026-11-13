import type { FC } from "react";
import { SwitchButtonProps } from "./types";
import styles from "./SwitchButton.module.css";

const SwitchButton: FC<SwitchButtonProps> = ({
  initialState,
  state,
  text,
  onClick,
  disabled,
  ariaLabel,
}) => {
  const isActive = state.value === initialState.value;

  return (
    <button
      type="button"
      className={isActive ? `${styles.switch} ${styles.active}` : styles.switch}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      title={ariaLabel}
      onClick={() => onClick(initialState)}
    >
      {text}
    </button>
  );
};

export default SwitchButton;
