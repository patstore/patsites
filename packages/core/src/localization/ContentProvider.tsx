/** @jsxImportSource react */
import { useContext, useMemo, type ReactNode } from "react";
import type { CmsPathValue } from "../content/types.ts";
import { ContentContext, type ResolvedFile } from "./content-context.ts";
import { LocalizationContext } from "./context.ts";

export type ContentProviderProps = {
  children: ReactNode;
  /** `{ path, value }` rows for this page. Locale may be prefixed (`de-DE.page.hero.title`). */
  pageData?: CmsPathValue[];
  /** Overrides the language from `LocalizationProvider`. */
  language?: string;
  /** Maps a stored image id to a URL. Direct paths and URLs are used as-is. */
  resolveImage?: (value: string) => string | undefined;
  /** Maps a stored file id to a URL and download name. */
  resolveFile?: (value: string) => ResolvedFile | undefined;
};

export function ContentProvider({
  children,
  pageData = [],
  language,
  resolveImage,
  resolveFile,
}: ContentProviderProps) {
  const localization = useContext(LocalizationContext);
  const value = useMemo(
    () => ({
      pageData,
      language: language ?? localization?.language ?? "",
      resolveImage,
      resolveFile,
    }),
    [pageData, language, localization, resolveImage, resolveFile],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}
