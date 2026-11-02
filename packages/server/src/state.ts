import type { DataContext, DataMode } from "./types.ts";

export function normalizeStates(
  states: readonly string[] | null | undefined,
): string[] | null {
  if (states == null) {
    return null;
  }
  const unique = [
    ...new Set(states.map((state) => state.trim()).filter(Boolean)),
  ];
  return unique.length > 0 ? unique : null;
}

export function createDataContext(options: {
  mode: DataMode;
  states?: readonly string[] | null;
}): DataContext {
  return {
    mode: options.mode,
    states: normalizeStates(options.states),
  };
}

/** GraphQL `state` predicate. Null means the query should not filter on state. */
export function stateWhere(
  states: readonly string[] | null,
): Record<string, unknown> | null {
  const allowed = normalizeStates(states);
  if (!allowed) {
    return null;
  }
  const only = allowed[0];
  if (allowed.length === 1 && only) {
    return { equalTo: only };
  }
  return { in: allowed };
}

/**
 * Records with no `state` stay included, so classes without that field are unchanged.
 * A non-empty allow-list keeps only matching states.
 */
export function filterByStates<T>(
  records: readonly T[],
  states: readonly string[] | null,
): T[] {
  const allowed = normalizeStates(states);
  if (!allowed) {
    return [...records];
  }
  const allowedSet = new Set(allowed);
  return records.filter((record) => {
    if (!record || typeof record !== "object" || !("state" in record)) {
      return true;
    }
    const state = record.state;
    if (state == null || state === "") {
      return true;
    }
    return allowedSet.has(String(state));
  });
}
