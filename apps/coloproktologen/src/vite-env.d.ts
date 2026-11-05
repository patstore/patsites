/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PATSTORE_API_URL?: string;
    readonly VITE_PATSTORE_GRAPHQL_API_URL?: string;
    readonly VITE_PATSTORE_APP_ID?: string;
    readonly VITE_PATSTORE_REST_KEY?: string;
    readonly VITE_PATSTORE_PROJECT_ID?: string;
    readonly VITE_SESSION_TOKEN?: string;
    readonly VITE_GOOGLE_MAPS_API_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
