import { toLocale } from "../content/locale.ts";
import type { CmsPathValue } from "../content/types.ts";

export function findValueForKey({
  key,
  lang,
  content,
}: {
  key: string;
  lang: string;
  content: CmsPathValue[] | null | undefined;
}): unknown {
  if (!content) {
    return undefined;
  }
  const localized = content.find((entry) => entry.path === `${toLocale(lang)}.${key}`);
  if (localized) {
    return localized.value;
  }
  return content.find((entry) => entry.path === key)?.value;
}

export function isDirectMediaSrc(value: string): boolean {
  return (
    value.startsWith("/") ||
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:")
  );
}
