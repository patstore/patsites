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
};

const liveEntries = new Map<string, LiveEntry>();
let clearScheduled = false;

/**
 * Drop server results only after every in-flight read has settled.
 * Clearing on the next tick races the next suspended collection and
 * makes server rendering fetch the same class forever.
 */
function scheduleServerCacheClear() {
	if (typeof window !== "undefined" || clearScheduled) {
		return;
	}
	clearScheduled = true;
	setTimeout(() => {
		clearScheduled = false;
		for (const entry of liveEntries.values()) {
			if (entry.status === "pending") {
				scheduleServerCacheClear();
				return;
			}
		}
		liveEntries.clear();
	}, 0);
}

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
	const existing = liveEntries.get(className);
	if (existing) {
		return existing;
	}
	const entry: LiveEntry = {
		promise: Promise.resolve([]),
		status: "pending"
	};
	liveEntries.set(className, entry);
	entry.promise = loadLiveRows(className).then(
		(result) => {
			const list = Array.isArray(result) ? result : [];
			entry.status = "ready";
			entry.result = list;
			scheduleServerCacheClear();
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
