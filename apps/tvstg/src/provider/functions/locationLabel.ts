import type { EventLocation } from "@types";

type LocationRecord = { title?: string | null };

export function locationLabel(
  location: EventLocation | null | undefined,
  find: (id: string | null | undefined) => LocationRecord | undefined,
): string | undefined {
  if (!location) {
    return undefined;
  }
  if (location.type === "address") {
    return location.address || undefined;
  }
  if (location.type === "location") {
    return location.location ? find(location.location)?.title || undefined : undefined;
  }
  if (location.type === "online") {
    return "online";
  }
  if (location.type === "map") {
    return "Map";
  }
  return undefined;
}
