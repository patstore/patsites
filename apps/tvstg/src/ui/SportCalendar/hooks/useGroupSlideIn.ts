import { useCallback } from "react";
import type { Dispatch, SetStateAction } from "react";
import { useRouter, useSearch } from "@tanstack/react-router";

/**
 * Open state of a group's slide-in, kept in the URL.
 *
 * Opening sets `?gruppe=<slug>` on the current page, so the calendar stays
 * mounted and the slide-in opens. The router masks that location as
 * `/sportangebot/<slug>`, so the address bar shows the group's own URL. The
 * back button (or closing) returns to the calendar. After a reload of the
 * masked URL the group's standalone page renders instead.
 */
export function useGroupSlideIn(slug: string) {
	const router = useRouter();
	const openSlug = useSearch({
		strict: false,
		select: (search) => search.gruppe
	});
	const modalState = openSlug === slug;

	const setModalState: Dispatch<SetStateAction<boolean>> = useCallback(
		(next) => {
			const open = typeof next === "function" ? next(modalState) : next;
			if (open === modalState) {
				return;
			}

			if (open) {
				void router.navigate({
					to: ".",
					search: (prev: Record<string, unknown>) => ({
						...prev,
						gruppe: slug
					}),
					mask: {
						to: "/sportangebot/$slug",
						params: { slug },
						unmaskOnReload: true
					},
					resetScroll: false
				});
				return;
			}

			// The slide-in was opened by pushing a history entry, so closing
			// pops it. Without one (direct load) just drop the param.
			if (router.history.canGoBack()) {
				router.history.back();
			} else {
				void router.navigate({
					to: ".",
					search: (prev: Record<string, unknown>) => ({
						...prev,
						gruppe: undefined
					}),
					replace: true,
					resetScroll: false
				});
			}
		},
		[modalState, router, slug]
	);

	return { modalState, setModalState };
}
