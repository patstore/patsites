import { useCallback } from "react";
import type { PatstoreClassName, PatstoreCollections } from "@types";
import { usePatstoreCollection } from "../data";

export function useCollection<K extends PatstoreClassName>(className: K) {
  const items = usePatstoreCollection(className);
  const find = useCallback(
    (id: string | null | undefined): PatstoreCollections[K][number] | undefined =>
      id
        ? (items as PatstoreCollections[K][number][]).find((item) => item.objectId === id)
        : undefined,
    [items],
  );
  return { items, find };
}
