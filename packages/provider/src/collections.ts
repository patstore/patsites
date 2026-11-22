import { localizeRecord, useOptionalLocalization } from "@repo/core";
import {
	createDataContext,
	isDraftMode,
	loadContent,
	loadStaticRecords,
	omitTranslations
} from "@repo/server";

export type CollectionRecord = { objectId?: string | null };

export type CollectionRegistry = {
	/** Classes this app can load live while draft mode is on. */
	publicClassNames: readonly string[];
	/** App server function that reads one class on the client. */
	getLiveCollection: (className: string) => Promise<unknown>;
};

let registry: CollectionRegistry | null = null;

/** Connects the shared hooks to one app's generated PatStore server function. */
export function registerCollections(next: CollectionRegistry) {
	registry = next;
}

type LiveEntry = {
	promise: Promise<unknown[]>;
	status: "pending" | "ready" | "error";
	result?: unknown[];
	error?: unknown;
	/** Server only: a ready entry is dropped once it has not been read for this long. */
	expiresAt: number;
};

const liveEntries = new Map<string, LiveEntry>();

/**
 * How long a server result survives without being read.
 * Server rendering suspends on one collection at a time and re-renders the
 * boundary after each one settles, so every read must find the earlier results
 * again. Clearing on a timer races those re-renders: the retry finds an empty
 * cache, fetches again, suspends again, and the response never finishes.
 * Each read pushes the expiry back, so a result lives as long as a render uses it.
 */
const SERVER_ENTRY_TTL_MS = 10_000;

function isPublicClass(className: string): boolean {
	return registry?.publicClassNames.includes(className) ?? false;
}

function loadLiveRows(className: string): Promise<unknown[]> {
	if (typeof window === "undefined") {
		return loadContent(
			className,
			createDataContext({ mode: "ssr", states: null })
		);
	}
	const load = registry?.getLiveCollection;
	if (!load) {
		return Promise.reject(
			new Error(
				"registerCollections must run before a live collection read."
			)
		);
	}
	return Promise.resolve(load(className)).then((result) =>
		Array.isArray(result) ? result : []
	);
}

function liveEntry(className: string): LiveEntry {
	const onServer = typeof window === "undefined";
	const existing = liveEntries.get(className);
	if (existing) {
		if (!onServer || existing.status !== "ready") {
			return existing;
		}
		const now = Date.now();
		if (existing.expiresAt > now) {
			existing.expiresAt = now + SERVER_ENTRY_TTL_MS;
			return existing;
		}
		liveEntries.delete(className);
	}
	const entry: LiveEntry = {
		promise: Promise.resolve([]),
		status: "pending",
		expiresAt: Infinity
	};
	liveEntries.set(className, entry);
	entry.promise = loadLiveRows(className).then(
		(result) => {
			const list = Array.isArray(result) ? result : [];
			entry.status = "ready";
			entry.result = list;
			entry.expiresAt = Date.now() + SERVER_ENTRY_TTL_MS;
			return list;
		},
		(error: unknown) => {
			entry.status = "error";
			entry.error = error;
			liveEntries.delete(className);
			throw error;
		}
	);
	return entry;
}

function readLiveCollection(className: string): unknown[] {
	const entry = liveEntry(className);
	if (entry.status === "pending") {
		throw entry.promise;
	}
	if (entry.status === "error") {
		throw entry.error;
	}
	return entry.result ?? [];
}

/** Published snapshot, or live rows — including `translations` — in draft mode. */
export function usePatstoreCollection<T extends CollectionRecord>(
	className: string
): T[] {
	const localization = useOptionalLocalization();
	const records = (
		isDraftMode() && isPublicClass(className)
			? readLiveCollection(className)
			: loadStaticRecords(className, { states: ["published"] })
	) as T[];
	if (!localization || localization.languages.length <= 1) {
		return records.map(
			(record) =>
				omitTranslations(record as T & Record<string, unknown>) as T
		);
	}
	return records.map(
		(record) =>
			localizeRecord(
				record as T & Record<string, unknown>,
				localization.language
			) as T
	);
}

/** Collection rows plus a lookup by `objectId`. */
export function useCollection<T extends CollectionRecord>(className: string) {
	const items = usePatstoreCollection<T>(className);
	const find = (id: string | null | undefined): T | undefined =>
		id ? items.find((item) => item.objectId === id) : undefined;
	return { items, find };
}
