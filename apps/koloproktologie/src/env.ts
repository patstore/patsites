/** Centralized Vite env access (replaces Gatsby GATSBY_* vars). */
export const env = {
    patstoreApiUrl:
        import.meta.env.VITE_PATSTORE_API_URL ||
        import.meta.env.GATSBY_PATSTORE_API_URL ||
        "",
    patstoreGraphqlUrl:
        import.meta.env.VITE_PATSTORE_GRAPHQL_API_URL ||
        import.meta.env.GATSBY_PATSTORE_GRAPHQL_API_URL ||
        "",
    patstoreAppId:
        import.meta.env.VITE_PATSTORE_APP_ID ||
        import.meta.env.GATSBY_PATSTORE_APP_ID ||
        "",
    patstoreRestKey:
        import.meta.env.VITE_PATSTORE_REST_KEY ||
        import.meta.env.GATSBY_PATSTORE_REST_KEY ||
        "",
    patstoreProjectId:
        import.meta.env.VITE_PATSTORE_PROJECT_ID ||
        import.meta.env.GATSBY_PATSTORE_PROJECT_ID ||
        "",
    sessionToken:
        import.meta.env.VITE_SESSION_TOKEN ||
        import.meta.env.GATSBY_SESSION_TOKEN ||
        "kol_token",
} as const;
