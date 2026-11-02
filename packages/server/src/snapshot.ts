import { candidateKeys } from "./collection-keys.ts";
import type { ContentSnapshot, PatStoreModule } from "./types.ts";

let snapshot: ContentSnapshot | null = null;

export function registerStaticSnapshot(data: unknown): void {
  if (!data || typeof data !== "object") {
    snapshot = null;
    return;
  }
  snapshot = data as ContentSnapshot;
}

export function getStaticSnapshot(): ContentSnapshot | null {
  return snapshot;
}

export function readSnapshotRecords(
  data: object,
  className: string,
): Record<string, unknown>[] {
  const snapshot = data as ContentSnapshot;
  for (const key of candidateKeys(className)) {
    const value = snapshot[key];
    if (Array.isArray(value)) {
      return value as Record<string, unknown>[];
    }
  }
  return [];
}

export function readSnapshotModules(data: ContentSnapshot | null): PatStoreModule[] {
  const modules = data?._modules;
  return Array.isArray(modules) ? modules : [];
}
