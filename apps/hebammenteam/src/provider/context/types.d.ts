import { Dispatch, SetStateAction } from "react";

export type SiteContext = {
  siteTitle: string;
  siteDescription: string;
  contactOpen: boolean;
  setContactOpen: Dispatch<SetStateAction<boolean>>;
};
