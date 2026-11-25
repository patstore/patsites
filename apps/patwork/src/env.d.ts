/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_PATSTORE_API_URL: string;
	readonly VITE_PATSTORE_GRAPHQL_API_URL: string;
	readonly VITE_PATSTORE_FILE_URL: string;
	readonly VITE_PATSTORE_APP_ID: string;
	readonly VITE_PATSTORE_CLIENT_KEY: string;
	readonly VITE_PATSTORE_REST_KEY: string;
	readonly VITE_PATSTORE_MASTER_KEY: string;
	readonly VITE_PATSTORE_PROJECT_ID: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
