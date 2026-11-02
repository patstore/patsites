export type SwitchButtonProps = {
  state: { value: any; label: string };
  initialState: { value: any; label: string };
  text: string;
  onClick: (T: SwitchButtonProps["initialState"]) => void;
  disabled?: boolean;
};
