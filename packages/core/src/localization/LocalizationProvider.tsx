/** @jsxImportSource react */
import { useEffect, useMemo, type ReactNode } from "react";
import { LocalizationContext } from "./context.ts";
import { canonicalPagePath, resolveDocumentLang, type LocalizationConfig } from "./path.ts";

export type LocalizationProviderProps = LocalizationConfig & {
  children: ReactNode;
  /** Current URL pathname, including an optional language prefix. */
  pathname: string;
};

export function LocalizationProvider({
  children,
  pathname,
  languages,
  defaultLanguage,
}: LocalizationProviderProps) {
  const config = useMemo(
    () => ({ languages, defaultLanguage }),
    [languages, defaultLanguage],
  );
  const language = resolveDocumentLang(pathname, config);
  const canonicalPath = canonicalPagePath(pathname, config);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(
    () => ({ ...config, pathname, language, canonicalPath }),
    [config, pathname, language, canonicalPath],
  );

  return <LocalizationContext.Provider value={value}>{children}</LocalizationContext.Provider>;
}
