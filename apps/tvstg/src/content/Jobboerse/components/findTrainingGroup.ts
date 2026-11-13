import type { PatstoreEntry, PatstoreGroup } from "@types";

/** News category that marks an entry as a job posting, not a training group. */
export const JOBBOERSE_CATEGORY = "YLHdF8iCjA";

const normalize = (value: string | null | undefined) =>
  (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss")
    .replace(/<[^>]*>/g, " ")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Longer, more specific titles win. Extra letters such as "Skippingg" still match. */
const titleScore = (haystack: string, groupTitle: string) => {
  if (groupTitle.length < 8) return 0;
  if (haystack.includes(groupTitle)) return groupTitle.length + 100;

  const words = groupTitle.split(" ").filter((word) => word.length > 3);
  if (words.length < 2) return 0;

  const haystackWords = haystack.split(" ");
  const matched = words.every((word) =>
    haystackWords.some((haystackWord) => haystackWord === word || haystackWord.startsWith(word)),
  );
  return matched ? groupTitle.length : 0;
};

/**
 * A job points at a training group through its categories.
 * A direct `group` id or a category id that is a group id wins.
 * When several groups share the sport category, the group named in the posting wins.
 */
export const findTrainingGroup = (
  job: PatstoreEntry,
  groups: PatstoreGroup[],
): PatstoreGroup | undefined => {
  if (job.group) {
    const linked = groups.find((group) => group.objectId === job.group);
    if (linked) return linked;
  }

  const categoryIds = (job.categories ?? []).filter((id) => id && id !== JOBBOERSE_CATEGORY);
  if (categoryIds.length === 0) return undefined;

  const linkedById = groups.find((group) => categoryIds.includes(group.objectId));
  if (linkedById) return linkedById;

  const matches = groups.filter((group) =>
    (group.categories ?? []).some((id) => categoryIds.includes(id)),
  );
  if (matches.length === 0) return undefined;
  if (matches.length === 1) return matches[0];

  const haystack = normalize(`${job.title ?? ""} ${job.description ?? ""} ${job.text ?? ""}`);
  const ranked = matches
    .map((group) => ({ group, score: titleScore(haystack, normalize(group.title)) }))
    .sort((a, b) => b.score - a.score);

  return ranked[0].score > 0 ? ranked[0].group : undefined;
};
