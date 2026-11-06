import "@data";
import { fetchCollection } from "@repo/server";

export { fetchCollection };

const PUBLIC_CLASSES = [
  "Entry",
  "Event",
  "Image",
  "Download",
  "Person",
  "Location",
  "Webpage",
] as const;

/** Collections this site renders. The draft-mode flag chooses snapshot or PatStore. */
export async function loadPublicContent(): Promise<
  Record<string, { objectId?: string | null }[]>
> {
  const entries = await Promise.all(
    PUBLIC_CLASSES.map(async (className) => {
      try {
        const records = await fetchCollection(className);
        return [className, records] as const;
      } catch (error) {
        console.error(`Content for ${className} was not available`, error);
        return [className, []] as const;
      }
    }),
  );
  return Object.fromEntries(entries) as Record<string, { objectId?: string | null }[]>;
}
