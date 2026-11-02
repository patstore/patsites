import { createContext, useContext } from "react";
import type { LocalizationConfig } from "./path.ts";

export type LocalizationContextValue = LocalizationConfig & {
  pathname: string;
  language: string;
  canonicalPath: string;
};

export const LocalizationContext = createContext<LocalizationContextValue | null>(null);

export function useLocalization(): LocalizationContextValue {
  const value = useContext(LocalizationContext);
  if (!value) {
    throw new Error("useLocalization must be used within LocalizationProvider");
  }
  return value;
}
