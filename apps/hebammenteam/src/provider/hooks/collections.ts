import { useCallback } from "react";
import {
  usePatstoreCollection,
  type CollectionItems,
  type CollectionName,
} from "../data/usePatstoreCollection";

export function useCollection<K extends CollectionName>(className: K) {
  const items = usePatstoreCollection(className);
  const find = useCallback(
    (id: string | null | undefined): CollectionItems<K>[number] | undefined =>
      id ? items.find((item) => item.objectId === id) : undefined,
    [items],
  );
  return { items, find };
}
