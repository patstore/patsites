import { ReactNode, useMemo, useContext, createContext, useState } from "react";
import { SiteContext as SiteContextDefaultProps } from "./types";

const defaultContext: SiteContextDefaultProps = {
  siteTitle: "Coming Home",
  siteDescription: "Begleitung in Schwangerschaft, Geburt und Wochenbett.",
  contactOpen: false,
  setContactOpen: () => false,
};

const SiteContext = createContext(defaultContext);

export const SiteContextProvider = ({ children }: { children: ReactNode }) => {
  const [contactOpen, setContactOpen] = useState(false);
  const siteContext: SiteContextDefaultProps = useMemo(
    () => ({
      siteTitle: "Coming Home",
      siteDescription: "Begleitung in Schwangerschaft, Geburt und Wochenbett.",
      contactOpen,
      setContactOpen,
    }),
    [contactOpen],
  );

  return <SiteContext.Provider value={siteContext}>{children}</SiteContext.Provider>;
};

export const useSiteContext = () => useContext(SiteContext);
