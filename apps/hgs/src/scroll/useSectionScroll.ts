import { useEffect, useState } from "react";
import { useScroll } from "@repo/core";

const SECTION_IDS = [
	"service",
	"objekte",
	"team",
	"partner",
	"kontakt"
] as const;

export type SectionId = (typeof SECTION_IDS)[number];

export function useSectionScroll() {
	const { scrollTo } = useScroll();

	return (id: SectionId | string) => {
		const target = document.getElementById(id);
		if (!target) {
			return;
		}
		scrollTo(target);
	};
}

/** Which home section sits under the top of the smooth-scroll viewport. */
export function useActiveSection(): SectionId | "" {
	const { scroll, viewport } = useScroll();
	const [active, setActive] = useState<SectionId | "">("");

	useEffect(() => {
		const rootTop = viewport?.getBoundingClientRect().top ?? 0;
		let current: SectionId | "" = "";
		for (const id of SECTION_IDS) {
			const element = document.getElementById(id);
			if (!element) {
				continue;
			}
			if (element.getBoundingClientRect().top - rootTop <= 180) {
				current = id;
			}
		}
		setActive(current);
	}, [scroll, viewport]);

	return active;
}
