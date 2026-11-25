import { useCallback, useEffect, useRef, useState } from "react";
import { useOptionalScroll } from "@repo/core";
import type { RefObject } from "react";

/**
 * Element travel through the viewport:
 * `0` = just entering (top edge at the bottom of the viewport),
 * `1` = just leaving (bottom edge at the top of the viewport).
 */
function getViewportProgress(el: Element): number {
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    const distance = vh + rect.height;
    if (distance === 0) return 0;
    return (vh - rect.top) / distance;
}

export function resolveTrigger(
    trigger: boolean | undefined,
    viewport: number | undefined,
    viewportReached: boolean
): boolean | undefined {
    if (viewport === undefined) return trigger;
    if (trigger === undefined) return viewportReached;
    return trigger && viewportReached;
}

export function useViewportTrigger(
    ref: RefObject<Element | null>,
    viewport?: number
): boolean {
    const scroll = useOptionalScroll();
    const [reached, setReached] = useState(false);
    const reachedRef = useRef(false);
    const viewportRef = useRef(viewport);
    viewportRef.current = viewport;

    const measure = useCallback(() => {
        const el = ref.current;
        const threshold = viewportRef.current;
        if (!el || threshold === undefined) return;

        const next =
            getViewportProgress(el) >= Math.min(1, Math.max(0, threshold));
        if (next === reachedRef.current) return;

        reachedRef.current = next;
        setReached(next);
    }, [ref]);

    useEffect(() => {
        if (viewport === undefined) {
            if (reachedRef.current) {
                reachedRef.current = false;
                setReached(false);
            }
            return;
        }

        measure();
        const stop = scroll?.subscribe(() => measure());
        window.addEventListener("resize", measure);
        return () => {
            stop?.();
            window.removeEventListener("resize", measure);
        };
    }, [viewport, measure, scroll]);

    return reached;
}
