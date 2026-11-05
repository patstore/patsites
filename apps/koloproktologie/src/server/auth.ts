import { createSessionApi } from "@repo/server/auth";
import { serverEnv } from "./env";

export const sessionApi = createSessionApi({
    apiUrl: serverEnv.patstoreApiUrl,
    appId: serverEnv.patstoreAppId,
    restKey: serverEnv.patstoreRestKey,
    projectId: serverEnv.patstoreProjectId,
    cookieName: serverEnv.sessionToken,
    logFailedLoginService: "login_dgk",
    invalidCredentialsMessage: "Ungültige Zugangsdaten"
});
