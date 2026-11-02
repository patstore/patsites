/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_PATSTORE_API_URL?: string;
    readonly VITE_PATSTORE_GRAPHQL_API_URL?: string;
    readonly VITE_PATSTORE_APP_ID?: string;
    readonly VITE_PATSTORE_REST_KEY?: string;
    readonly VITE_PATSTORE_PROJECT_ID?: string;
    readonly VITE_SESSION_TOKEN?: string;
    readonly VITE_BYTESCALE_ACCOUNT_ID?: string;
    readonly VITE_GOOGLE_MAPS_API_KEY?: string;
    readonly GATSBY_PATSTORE_API_URL?: string;
    readonly GATSBY_PATSTORE_GRAPHQL_API_URL?: string;
    readonly GATSBY_PATSTORE_APP_ID?: string;
    readonly GATSBY_PATSTORE_REST_KEY?: string;
    readonly GATSBY_PATSTORE_PROJECT_ID?: string;
    readonly GATSBY_SESSION_TOKEN?: string;
    readonly GATSBY_BYTESCALE_ACCOUNT_ID?: string;
    readonly GATSBY_GOOGLE_MAPS_API_KEY?: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
