import type { PatStoreEnv } from "./types.ts";

const cache = new Map<string, Promise<boolean>>();

/**
 * PatStore fills `translations` only when a project has localization settings
 * with more than one language. Missing settings, an empty list, or a single
 * language keep the regular class fields.
 */
export function projectUsesTranslations(env: PatStoreEnv): Promise<boolean> {
	const existing = cache.get(env.projectId);
	if (existing) {
		return existing;
	}
	const pending = readProjectUsesTranslations(env);
	cache.set(env.projectId, pending);
	return pending;
}

async function readProjectUsesTranslations(env: PatStoreEnv): Promise<boolean> {
	if (!env.apiUrl || !env.restKey) {
		return false;
	}
	try {
		const response = await fetch(
			`${env.apiUrl.replace(/\/$/, "")}/classes/Project/${env.projectId}`,
			{
				headers: {
					"X-Parse-Application-Id": env.appId,
					"X-Parse-REST-API-Key": env.restKey
				}
			}
		);
		if (!response.ok) {
			return false;
		}
		const project = (await response.json()) as {
			settings?: { languages?: unknown };
		};
		return localeList(project.settings?.languages).length > 1;
	} catch {
		return false;
	}
}

function localeList(value: unknown): string[] {
	let current = value;
	if (typeof current === "string") {
		const trimmed = current.trim();
		if (!trimmed) {
			return [];
		}
		try {
			current = JSON.parse(trimmed) as unknown;
		} catch {
			return [];
		}
	}
	if (!Array.isArray(current)) {
		return [];
	}
	return current.filter(
		(language): language is string =>
			typeof language === "string" &&
			language.trim() !== "" &&
			language.trim().toLowerCase() !== "default"
	);
}

/** Drops the locale map so callers keep each class's own fields. */
export function omitTranslations<T extends Record<string, unknown>>(
	record: T
): T {
	if (!Object.prototype.hasOwnProperty.call(record, "translations")) {
		return record;
	}
	const next = { ...record };
	delete next.translations;
	return next;
}
