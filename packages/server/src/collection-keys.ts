/** GraphQL collection names used by PatStore / Parse. */
const COLLECTION_KEYS: Record<string, string> = {
  Article: "articles",
  Event: "events",
  Entry: "entries",
  Category: "categories",
  Person: "people",
  Image: "images",
  Group: "groups",
  Download: "downloads",
  Form: "forms",
  Email: "emails",
  Calendar: "calendars",
  User: "users",
  Video: "videos",
  Location: "locations",
  Dates: "dates",
  TrainingGroup: "trainingGroups",
  Webpage: "webpages",
  Module: "modules",
};

/** Classes that are never written into the public static snapshot. */
const SKIP_STATIC_CLASSES = new Set(["User", "_User", "Email"]);

export function getCollectionKey(className: string): string {
  return (
    COLLECTION_KEYS[className] ??
    `${className.charAt(0).toLowerCase()}${className.slice(1)}s`
  );
}

/**
 * Key used in `build-time-data.json`.
 * Keeps the site's existing names (`persons`, `categorys`, `entrys`).
 */
export function getStorageKey(className: string): string {
  return `${className.toLowerCase()}s`;
}

export function shouldStoreClass(className: string): boolean {
  return Boolean(className) && !SKIP_STATIC_CLASSES.has(className);
}

const STORAGE_ALIASES: Record<string, string[]> = {
  persons: ["people"],
  people: ["persons"],
  categorys: ["categories"],
  categories: ["categorys"],
  entrys: ["entries"],
  entries: ["entrys"],
};

export function candidateKeys(className: string): string[] {
  const trimmed = className.trim();
  const pascal = /^[a-z]/.test(trimmed)
    ? `${trimmed.charAt(0).toUpperCase()}${trimmed.slice(1)}`
    : trimmed;
  const storage = getStorageKey(pascal);
  const graphql = getCollectionKey(pascal);
  const keys = [trimmed, storage, graphql];
  for (const key of [trimmed, storage, graphql]) {
    keys.push(...(STORAGE_ALIASES[key] ?? []));
  }
  return [...new Set(keys.filter(Boolean))];
}
