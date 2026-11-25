import { useSyncExternalStore } from "react";
import { useOptionalScroll } from "@repo/core";

const emptySubscribe = () => () => {};

/** The Lenis viewport, once smooth scroll has mounted. ScrollTrigger uses it as `scroller`. */
export function useScrollScroller(): HTMLElement | null {
    const scroll = useOptionalScroll();

    return useSyncExternalStore(
        scroll?.subscribe ?? emptySubscribe,
        () => scroll?.getViewport() ?? null,
        () => null
    );
}
