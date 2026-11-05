import { ReactNode, useMemo, useContext, createContext, useState } from "react";
import { SiteContext as SiteContextDefaultProps } from "./types";

const defaultContext: SiteContextDefaultProps = {
  siteTitle: "My Site",
  siteDescription: "My site description",
  contactOpen: false,
  setContactOpen: () => false,
};

const SiteContext = createContext(defaultContext);

export const SiteContextProvider = ({ children }: { children: ReactNode }) => {
  const [contactOpen, setContactOpen] = useState(false);
  const siteContext: SiteContextDefaultProps = useMemo(
    () => ({
      siteTitle: "My Site",
      siteDescription: "My site description",
      contactOpen,
      setContactOpen,
    }),
    [contactOpen],
  );

  return (
    <SiteContext.Provider value={siteContext}>{children}</SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  return useContext(SiteContext);
};
