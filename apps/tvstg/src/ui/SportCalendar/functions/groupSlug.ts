import type { PatstoreGroup } from "@types";
import { slugify } from "../../../provider/functions/slugify";

type SluggableGroup = Pick<PatstoreGroup, "objectId" | "title">;

/** Public, indexable URL prefix of a single training group. */
export const GROUP_PATH_PREFIX = "/sportangebot";

const cache = new WeakMap<readonly SluggableGroup[], Map<string, string>>();

/**
 * Maps every group to a unique URL slug. Groups sharing a title get the
 * start of their object id appended, so each one keeps its own URL.
 */
function buildGroupSlugs(groups: readonly SluggableGroup[]) {
	const cached = cache.get(groups);
	if (cached) {
		return cached;
	}

	const taken = new Set<string>();
	const slugs = new Map<string, string>();
	for (const group of groups) {
		const base = slugify(group.title ?? "") || group.objectId;
		let slug = base;
		if (taken.has(slug)) {
			slug = `${base}-${group.objectId.slice(0, 6).toLowerCase()}`;
		}
		taken.add(slug);
		slugs.set(group.objectId, slug);
	}

	cache.set(groups, slugs);
	return slugs;
}

export const groupSlug = (
	group: SluggableGroup,
	groups: readonly SluggableGroup[]
): string =>
	buildGroupSlugs(groups).get(group.objectId) ??
	(slugify(group.title ?? "") || group.objectId);

export const groupPath = (
	group: SluggableGroup,
	groups: readonly SluggableGroup[]
): string => `${GROUP_PATH_PREFIX}/${groupSlug(group, groups)}`;

export const findGroupBySlug = <T extends SluggableGroup>(
	groups: readonly T[],
	slug: string
): T | undefined => groups.find((group) => groupSlug(group, groups) === slug);
