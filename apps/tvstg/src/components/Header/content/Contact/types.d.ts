import { Dispatch, SetStateAction } from "react";

export type ContactProps = {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
};
