import { gsap } from "gsap";

export const PAGE_TRANSITION_COMPLETE = "pagetransitioncomplete";

/** True when no ancestor is mid-transition and creating a containing block for `position: fixed`. */
export const pageTransitionIsIdle = (page: Element | null) => {
    let node: Element | null = page;
    while (node) {
        const style = getComputedStyle(node);
        if (
            style.transform !== "none" ||
            style.willChange.includes("transform")
        ) {
            return false;
        }
        node = node.parentElement;
    }
    return true;
};

export function whenPageTransitionIdle(
    page: Element | null,
    onIdle: () => void
): () => void {
    if (pageTransitionIsIdle(page)) {
        onIdle();
        return () => {};
    }

    let cleanedUp = false;

    const cleanup = () => {
        if (cleanedUp) return;
        cleanedUp = true;
        gsap.ticker.remove(tryIdle);
        window.removeEventListener(PAGE_TRANSITION_COMPLETE, tryIdle);
    };

    const tryIdle = () => {
        if (!pageTransitionIsIdle(page)) return;
        cleanup();
        onIdle();
    };

    gsap.ticker.add(tryIdle);
    window.addEventListener(PAGE_TRANSITION_COMPLETE, tryIdle);

    return cleanup;
}
