/** Server-side env access. Parse master keys stay here and are never sent to the client. */
export const serverEnv = {
    patstoreApiUrl:
        process.env.PATSTORE_API_URL ||
        process.env.VITE_PATSTORE_API_URL ||
        process.env.GATSBY_PATSTORE_API_URL ||
        "",
    patstoreAppId:
        process.env.PATSTORE_APP_ID ||
        process.env.VITE_PATSTORE_APP_ID ||
        process.env.GATSBY_PATSTORE_APP_ID ||
        "",
    patstoreRestKey:
        process.env.PATSTORE_REST_KEY ||
        process.env.VITE_PATSTORE_REST_KEY ||
        process.env.GATSBY_PATSTORE_REST_KEY ||
        "",
    patstoreMasterKey:
        process.env.PATSTORE_MASTER_KEY ||
        process.env.VITE_PATSTORE_MASTER_KEY ||
        process.env.GATSBY_PATSTORE_MASTER_KEY ||
        "",
    patstoreProjectId:
        process.env.PATSTORE_PROJECT_ID ||
        process.env.VITE_PATSTORE_PROJECT_ID ||
        process.env.GATSBY_PATSTORE_PROJECT_ID ||
        "",
    sessionToken:
        process.env.SESSION_TOKEN ||
        process.env.VITE_SESSION_TOKEN ||
        process.env.GATSBY_SESSION_TOKEN ||
        "bcd_token"
} as const;
