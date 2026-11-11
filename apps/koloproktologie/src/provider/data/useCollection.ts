import { useCallback } from "react";
import { isDraftMode, loadStaticRecords } from "@repo/server";
import {
  getLiveCollection,
  publicClassNames,
  type PublicClassName,
} from "../../../data/public-content";

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

export function usePatstoreCollection(className: string): unknown[] {
  if (isDraftMode() && isPublicClass(className)) {
    return readLiveCollection(className);
  }
  return loadStaticRecords(className, { states: ["published"] });
}

export function useCollection<T extends { objectId?: string | null }>(className: string) {
  const items = usePatstoreCollection(className) as T[];
  const find = useCallback(
    (id: string | null | undefined) =>
      id ? items.find((item) => item.objectId === id) : undefined,
    [items],
  );
  return { items, find };
}
