import { isDraftMode, loadStaticRecords } from "@repo/server";
import type { PatstoreClassName, PatstoreCollections } from "@types";
import {
  getLiveCollection,
  publicClassNames,
  type PublicClassName,
  type PublicCollections,
} from "../../../data/public-content";

export type CollectionName = PublicClassName | PatstoreClassName;

export type CollectionItems<K extends CollectionName> = K extends PatstoreClassName
  ? PatstoreCollections[K]
  : K extends PublicClassName
    ? PublicCollections[K]
    : never;

const publicNames: readonly string[] = publicClassNames;

function isPublicClass(className: string): className is PublicClassName {
  return publicNames.includes(className);
}

type LiveEntry = {
  promise: Promise<unknown[]>;
  status: "pending" | "ready" | "error";
  result?: unknown[];
  error?: unknown;
};

const liveEntries = new Map<string, LiveEntry>();

function liveEntry(className: PublicClassName): LiveEntry {
  const existing = liveEntries.get(className);
  if (existing) {
    return existing;
  }

  const entry: LiveEntry = {
    promise: Promise.resolve([]),
    status: "pending",
  };
  liveEntries.set(className, entry);
  entry.promise = getLiveCollection({ data: className }).then(
    (rows) => {
      const list = Array.isArray(rows) ? (rows as unknown[]) : [];
      entry.status = "ready";
      entry.result = list;
      if (typeof window === "undefined") {
        setTimeout(() => {
          if (liveEntries.get(className) === entry) {
            liveEntries.delete(className);
          }
        }, 0);
      }
      return list;
    },
    (error: unknown) => {
      entry.status = "error";
      entry.error = error;
      liveEntries.delete(className);
      throw error;
    },
  );
  return entry;
}

function readLiveCollection(className: PublicClassName): unknown[] {
  const entry = liveEntry(className);
  if (entry.status === "pending") {
    throw entry.promise;
  }
  if (entry.status === "error") {
    throw entry.error;
  }
  return entry.result ?? [];
}

export function usePatstoreCollection<K extends CollectionName>(className: K): CollectionItems<K> {
  if (isDraftMode() && isPublicClass(className)) {
    return readLiveCollection(className) as CollectionItems<K>;
  }
  return loadStaticRecords(className, { states: ["published"] }) as CollectionItems<K>;
}
