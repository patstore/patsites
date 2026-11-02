import { createContext, useContext } from "react";
import type { CmsPathValue } from "../content/types.ts";

export type ResolvedFile = {
  url?: string;
  filename?: string;
};

export type ContentContextValue = {
  pageData: CmsPathValue[];
  language: string;
  resolveImage?: (value: string) => string | undefined;
  resolveFile?: (value: string) => ResolvedFile | undefined;
};

export const ContentContext = createContext<ContentContextValue>({
  pageData: [],
  language: "",
});

export const SectionPathContext = createContext("");

export const RowValuesContext = createContext<Record<string, unknown> | null>(null);

export function useContent(): ContentContextValue {
  return useContext(ContentContext);
}

export function useSectionPath(): string {
  return useContext(SectionPathContext);
}

export function useRowValues(): Record<string, unknown> | null {
  return useContext(RowValuesContext);
}
