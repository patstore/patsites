
export const env = {
    previewMode:
        import.meta.env.VITE_PREVIEW_MODE ||
        "false",
    patstoreApiUrl:
        import.meta.env.VITE_PATSTORE_API_URL ||
        "",
    patstoreGraphqlUrl:
        import.meta.env.VITE_PATSTORE_GRAPHQL_API_URL ||
        "",
    patstoreAppId:
        import.meta.env.VITE_PATSTORE_APP_ID ||
        "",
    patstoreRestKey:
        import.meta.env.VITE_PATSTORE_REST_KEY ||
        "",
    patstoreProjectId:
        import.meta.env.VITE_PATSTORE_PROJECT_ID ||
        "",
    sessionToken:
        import.meta.env.VITE_SESSION_TOKEN ||
        "kol_token",
} as const;
