/** Server-side env access (Parse REST keys — never expose to client). */
export const serverEnv = {
    patstoreApiUrl:
        process.env.PATSTORE_API_URL ||
        process.env.VITE_PATSTORE_API_URL ||
        "",
    patstoreAppId:
        process.env.PATSTORE_APP_ID ||
        process.env.VITE_PATSTORE_APP_ID ||
        "",
    patstoreRestKey:
        process.env.PATSTORE_REST_KEY ||
        process.env.VITE_PATSTORE_REST_KEY ||
        "",
    patstoreProjectId:
        process.env.PATSTORE_PROJECT_ID ||
        process.env.VITE_PATSTORE_PROJECT_ID ||
        "",
    sessionToken:
        process.env.SESSION_TOKEN ||
        process.env.VITE_SESSION_TOKEN ||
        "kol_token"
} as const;
