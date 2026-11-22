import { useMemo } from "react";
import { useCollection } from "@provider";

export type CategoryOption = { id: string; title: string };

export type CategoryOptions = {
	fachbereiche: CategoryOption[];
	sportarten: CategoryOption[];
};

const byTitle = (a: CategoryOption, b: CategoryOption) =>
	a.title.localeCompare(b.title, "de");

/**
 * Fachbereiche and Sportarten that at least one calendar group belongs to.
 * `categories` limits the groups the same way it limits the calendar itself.
 */
const useCategoryOptions = (categories: string[]): CategoryOptions => {
	const { items: allCategories } = useCollection("Category");
	const { items: groups } = useCollection("Group");

	return useMemo(() => {
		const used = new Set<string>();
		for (const group of groups) {
			if (!group.title || !group.times?.length) {
				continue;
			}
			if (
				categories.length > 0 &&
				!group.categories?.some((id) => categories.includes(id))
			) {
				continue;
			}
			group.categories?.forEach((id) => used.add(id));
		}

		const pick = (type: string): CategoryOption[] =>
			allCategories
				.filter(
					(category) =>
						category.type === type &&
						category.title &&
						used.has(category.objectId)
				)
				.map((category) => ({
					id: category.objectId,
					title: category.title as string
				}))
				.sort(byTitle);

		return {
			fachbereiche: pick("fachbereiche"),
			sportarten: pick("sportarten")
		};
	}, [allCategories, groups, categories.join(",")]);
};

export default useCategoryOptions;
