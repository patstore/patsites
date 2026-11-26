import "@tanstack/react-start/server-only";
import { readPatStoreEnv, type PatStoreEnv } from "@repo/server";

const REQUEST_TIMEOUT_MS = 15_000;
const CONTACT_SLUG = "kontakt";

type Pointer = {
	__type: "Pointer";
	className: "Project" | "Module";
	objectId: string;
};

export type FormFieldDefinition = {
	id: string;
	name: string;
	type: string;
	required: boolean;
	options: string[];
	info: string;
	description: string;
	placeholder: string;
	label: string;
};

export type SubmissionField = {
	name: string;
	label: string;
};

type QueryResult<T> = { results: T[] };

function requireEnv(): PatStoreEnv & { apiUrl: string; restKey: string } {
	const env = readPatStoreEnv(process.env);
	if (!env?.apiUrl || !env.restKey) {
		throw new Error(
			"PatStore is not configured for writes. Set PATSTORE_API_URL, PATSTORE_APP_ID, PATSTORE_PROJECT_ID, and PATSTORE_REST_KEY."
		);
	}
	return { ...env, apiUrl: env.apiUrl, restKey: env.restKey };
}

function projectPointer(projectId: string): Pointer {
	return { __type: "Pointer", className: "Project", objectId: projectId };
}

async function rest<T>(
	env: PatStoreEnv & { apiUrl: string; restKey: string },
	path: string,
	init?: RequestInit
): Promise<T> {
	const base = env.apiUrl.endsWith("/") ? env.apiUrl : `${env.apiUrl}/`;
	const response = await fetch(new URL(path.replace(/^\//, ""), base), {
		...init,
		headers: {
			"X-Parse-Application-Id": env.appId,
			"X-Parse-REST-API-Key": env.restKey,
			...(init?.body ? { "Content-Type": "application/json" } : {}),
			...init?.headers
		},
		signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS)
	});

	if (!response.ok) {
		const detail = await response.text().catch(() => "");
		console.error(`PatStore ${path} failed`, response.status, detail);
		throw new Error(
			`PatStore ${init?.method ?? "GET"} failed with ${response.status}`
		);
	}

	return (await response.json()) as T;
}

function where(query: Record<string, unknown>) {
	return encodeURIComponent(JSON.stringify(query));
}

/** Reuse the Kontakt form, or create it on the project's Formulare module. */
export async function ensureContactForm(
	fields: readonly FormFieldDefinition[]
): Promise<string> {
	const env = requireEnv();
	const project = projectPointer(env.projectId);
	const existing = await rest<QueryResult<{ objectId: string }>>(
		env,
		`classes/Form?limit=1&keys=objectId&where=${where({
			slug: CONTACT_SLUG,
			project
		})}`
	);
	const found = existing.results[0]?.objectId;
	if (found) {
		return found;
	}

	const modules = await rest<QueryResult<{ objectId: string }>>(
		env,
		`classes/Module?limit=1&keys=objectId&where=${where({
			connected_class: "Form",
			project
		})}`
	);
	const moduleId = modules.results[0]?.objectId;
	if (!moduleId) {
		throw new Error("PatStore has no form module for this project.");
	}

	const created = await rest<{ objectId: string }>(env, "classes/Form", {
		method: "POST",
		body: JSON.stringify({
			title: "Kontakt",
			label: "Kontakt",
			slug: CONTACT_SLUG,
			state: "published",
			description: "Kontaktformular der Website",
			project,
			module: {
				__type: "Pointer",
				className: "Module",
				objectId: moduleId
			},
			form_fields: fields
		})
	});
	return created.objectId;
}

export async function createFormEntry(input: {
	referenceId: string;
	data: Record<string, string>;
	fields: readonly SubmissionField[];
}): Promise<void> {
	const env = requireEnv();
	await rest(env, "classes/Item", {
		method: "POST",
		body: JSON.stringify({
			data: input.data,
			fields: input.fields,
			reference_id: input.referenceId,
			type: "form"
		})
	});
}
