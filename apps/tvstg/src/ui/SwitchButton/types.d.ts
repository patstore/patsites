import type { ReactNode } from "react";

export type SwitchButtonProps = {
  state: { value: any; label: string };
  initialState: { value: any; label: string };
  text: ReactNode;
  onClick: (T: SwitchButtonProps["initialState"]) => void;
  disabled?: boolean;
  /** Accessible name, required when `text` is only an icon. */
  ariaLabel?: string;
};
