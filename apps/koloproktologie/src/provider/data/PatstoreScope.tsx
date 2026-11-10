import { createContext, useCallback, useContext, useMemo, type ReactNode } from "react";

export type ContentData = Record<string, { objectId?: string | null }[]>;

const ContentContext = createContext<ContentData>({});

/** Makes loader content available to the page. Nested scopes replace a class with the child list. */
export function PatstoreScope({
    data,
    children,
}: {
    data: ContentData | undefined;
    children: ReactNode;
}) {
    const parent = useContext(ContentContext);
    const value = useMemo(() => (data ? { ...parent, ...data } : parent), [parent, data]);
    return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

const EMPTY: { objectId?: string | null }[] = [];
const warned = new Set<string>();

export function useCollection<T extends { objectId?: string | null }>(className: string) {
    const items = (useContext(ContentContext)[className] ?? EMPTY) as T[];

    const find = useCallback(
        (id: string | null | undefined) =>
            id ? items.find((item) => item.objectId === id) : undefined,
        [items],
    );

    if (items === EMPTY && import.meta.env.DEV && !warned.has(className)) {
        warned.add(className);
        console.warn(
            `[patstore] "${className}" was requested but no route loader in scope provides it.`,
        );
    }

    return { items, find };
}
