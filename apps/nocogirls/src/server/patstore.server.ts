import "@tanstack/react-start/server-only";
import { readPatStoreEnv } from "@repo/server";
import { fetchCollection } from "./content";

const REQUEST_TIMEOUT_MS = 15_000;
const ENV_NAMES = [
	"VITE_PATSTORE_GRAPHQL_API_URL",
	"PATSTORE_GRAPHQL_API_URL",
	"GATSBY_PATSTORE_GRAPHQL_API_URL",
	"VITE_PATSTORE_APP_ID",
	"PATSTORE_APP_ID",
	"GATSBY_PATSTORE_APP_ID",
	"VITE_PATSTORE_PROJECT_ID",
	"PATSTORE_PROJECT_ID",
	"GATSBY_PATSTORE_PROJECT_ID",
	"VITE_PATSTORE_REST_KEY",
	"PATSTORE_REST_KEY",
	"GATSBY_PATSTORE_REST_KEY",
	"VITE_PATSTORE_API_URL",
	"PATSTORE_API_URL",
	"GATSBY_PATSTORE_API_URL",
	"VITE_PATSTORE_FILE_URL",
	"PATSTORE_FILE_URL",
	"GATSBY_PATSTORE_FILE_URL"
] as const;

function serverProcessEnv(): Record<string, string | undefined> {
	const source: Record<string, string | undefined> = {};
	for (const name of ENV_NAMES) {
		const value = process.env[name];
		if (!value) {
			continue;
		}
		source[name] = value;
		if (name.startsWith("GATSBY_")) {
			const unprefixed = name.slice("GATSBY_".length);
			source[unprefixed] ??= value;
			source[`VITE_${unprefixed}`] ??= value;
		}
	}
	return source;
}

export async function getCollection(className: string) {
	return fetchCollection(className);
}

export async function createObject(
	className: string,
	data: Record<string, unknown>
): Promise<void> {
	const env = readPatStoreEnv(serverProcessEnv());
	if (!env?.apiUrl || !env.restKey) {
		throw new Error(
			"PatStore is not configured for writes. Set PATSTORE_API_URL, PATSTORE_APP_ID, and PATSTORE_REST_KEY."
		);
	}

	const baseUrl = env.apiUrl.endsWith("/") ? env.apiUrl : `${env.apiUrl}/`;
	const response = await fetch(new URL(`classes/${className}`, baseUrl), {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"X-Parse-Application-Id": env.appId,
			"X-Parse-REST-API-Key": env.restKey
		},
		body: JSON.stringify(data),
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
	});

	if (!response.ok) {
		throw new Error(`Creating ${className} failed with ${response.status}`);
	}
}
