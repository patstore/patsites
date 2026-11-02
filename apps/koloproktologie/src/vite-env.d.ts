/// <reference types="vite/client" />

declare module "*.png" {
    const src: string;
    export default src;
}

declare module "*.jpg" {
    const src: string;
    export default src;
}

declare module "*.jpeg" {
    const src: string;
    export default src;
}

declare module "*.webp" {
    const src: string;
    export default src;
}

declare module "*.avif" {
    const src: string;
    export default src;
}

declare module "*.svg" {
    const src: string;
    export default src;
}

declare module "*.scss" {
    const content: string;
    export default content;
}

interface ImportMetaEnv {
    readonly VITE_PATSTORE_API_URL: string;
    readonly VITE_PATSTORE_GRAPHQL_API_URL: string;
    readonly VITE_PATSTORE_APP_ID: string;
    readonly VITE_PATSTORE_REST_KEY: string;
    readonly VITE_PATSTORE_MASTER_KEY: string;
    readonly VITE_PATSTORE_PROJECT_ID: string;
    readonly VITE_BYTESCALE_ACCOUNT_ID: string;
    readonly VITE_SESSION_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
