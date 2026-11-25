/**
 * Centralized, typed access to Vite environment variables.
 *
 * All variables must be prefixed with `VITE_` in the root `.env` file
 * so Vite exposes them to the client bundle via `import.meta.env`.
 */

const warned = new Set<keyof ImportMetaEnv>();

// Patstore credentials are optional for now — data is loaded at build time via
// the static-data plugin and the runtime client is wired up later. Until the
// credentials are provided we warn once (in dev) and fall back to an empty
// string instead of throwing, so the app still renders.
const required = <K extends keyof ImportMetaEnv>(key: K): string => {
	const value = import.meta.env[key];
	if (typeof value !== 'string' || value.length === 0) {
		if (import.meta.env.DEV && !warned.has(key)) {
			warned.add(key);
			console.warn(
				`[env] Missing environment variable: ${key}. ` +
					`Add it to your .env file (see .env.example).`,
			);
		}
		return '';
	}
	return value;
};

export const env = {
	patstore: {
		apiUrl: required('VITE_PATSTORE_API_URL'),
		graphqlApiUrl: required('VITE_PATSTORE_GRAPHQL_API_URL'),
		fileUrl: required('VITE_PATSTORE_FILE_URL'),
		appId: required('VITE_PATSTORE_APP_ID'),
		clientKey: required('VITE_PATSTORE_CLIENT_KEY'),
		restKey: required('VITE_PATSTORE_REST_KEY'),
		masterKey: required('VITE_PATSTORE_MASTER_KEY'),
		projectId: required('VITE_PATSTORE_PROJECT_ID'),
	},
	mode: import.meta.env.MODE,
	isDev: import.meta.env.DEV,
	isProd: import.meta.env.PROD,
} as const;

export type Env = typeof env;
