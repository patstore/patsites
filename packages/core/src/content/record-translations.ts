import { toLocale } from "./locale.ts";

function languageTag(value: string): string {
	return value.trim().split(/[-_]/)[0]?.toLowerCase() ?? "";
}

function translationMap(
	value: unknown
): Record<string, Record<string, unknown>> | null {
	let current = value;
	if (typeof current === "string") {
		try {
			current = JSON.parse(current) as unknown;
		} catch {
			return null;
		}
	}
	if (!current || typeof current !== "object" || Array.isArray(current)) {
		return null;
	}
	const record = current as Record<string, unknown>;
	const locales: Record<string, Record<string, unknown>> = {};
	for (const [key, fields] of Object.entries(record)) {
		if (!fields || typeof fields !== "object" || Array.isArray(fields)) {
			continue;
		}
		locales[key] = fields as Record<string, unknown>;
	}
	return Object.keys(locales).length > 0 ? locales : null;
}

/** Locale key on `translations` for the active language. `en` matches `en-GB`. */
export function translationLocale(
	language: string,
	locales: readonly string[]
): string | undefined {
	const wanted = language.trim();
	if (!wanted) {
		return undefined;
	}
	const exact = locales.find(
		(locale) => locale.toLowerCase() === wanted.toLowerCase()
	);
	if (exact) {
		return exact;
	}
	const normalized = toLocale(wanted).toLowerCase();
	const byLocale = locales.find(
		(locale) => locale.toLowerCase() === normalized
	);
	if (byLocale) {
		return byLocale;
	}
	const tag = languageTag(wanted);
	return locales.find((locale) => languageTag(locale) === tag);
}

/**
 * Overlay the active locale from `record.translations` onto the record fields.
 * One class row holds every language. Missing or empty translations keep the base field.
 */
export function localizeRecord<T extends Record<string, unknown>>(
	record: T,
	language: string
): T {
	const translations = translationMap(record.translations);
	if (!translations) {
		return record;
	}
	const locale = translationLocale(language, Object.keys(translations));
	const fields = locale ? translations[locale] : undefined;
	if (!fields) {
		return record;
	}
	const next: Record<string, unknown> = { ...record };
	for (const [key, value] of Object.entries(fields)) {
		if (value === undefined || value === null || value === "") {
			continue;
		}
		next[key] = value;
	}
	return next as T;
}
