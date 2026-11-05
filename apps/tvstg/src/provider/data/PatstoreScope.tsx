import { createContext, ReactNode, useContext, useMemo } from "react";
import type {
  PatstoreClassName,
  PatstoreCollections,
  PatstoreData,
} from "@types";

const PatstoreContext = createContext<PatstoreData>({});

const mergeData = (parent: PatstoreData, child: PatstoreData): PatstoreData => {
  const merged: Record<string, unknown[]> = { ...parent };
  for (const [className, items] of Object.entries(child)) {
    const existing = merged[className];
    if (!existing) {
      merged[className] = items;
      continue;
    }
    const byId = new Map<string, unknown>();
    for (const item of [...existing, ...items] as { objectId: string }[]) {
      byId.set(item.objectId, item);
    }
    merged[className] = [...byId.values()];
  }
  return merged as PatstoreData;
};

/**
 * Makes a route loader's Patstore slice available to the subtree.
 * Nested scopes merge with their parents; inner records win.
 */
export const PatstoreScope = ({
  data,
  children,
}: {
  data: PatstoreData | undefined;
  children: ReactNode;
}) => {
  const parent = useContext(PatstoreContext);
  const value = useMemo(
    () => (data ? mergeData(parent, data) : parent),
    [parent, data],
  );

  return <PatstoreContext.Provider value={value}>{children}</PatstoreContext.Provider>;
};

const EMPTY: never[] = [];
const warned = new Set<string>();

export const usePatstoreCollection = <K extends PatstoreClassName>(
  className: K,
): PatstoreCollections[K] => {
  const collection = useContext(PatstoreContext)[className];

  if (!collection && import.meta.env.DEV && !warned.has(className)) {
    warned.add(className);
    console.warn(
      `[patstore] "${className}" was requested but no route loader in scope provides it.`,
    );
  }

  return (collection ?? EMPTY) as PatstoreCollections[K];
};
