import { useMemo } from "react";
import { useFindData } from "@data";

export function useClassRecords<T extends { objectId?: string | null }>(storageKey: string) {
    const { findByClassName } = useFindData();
    const records = useMemo(
        () => (findByClassName(storageKey) ?? []) as T[],
        [findByClassName, storageKey]
    );
    const find = (id: string) => records.find((item) => item.objectId === id);
    return { records, find };
}
