import { createSessionApi } from "@repo/server/auth";
import { serverEnv } from "./env";

export const sessionApi = createSessionApi({
    apiUrl: serverEnv.patstoreApiUrl,
    appId: serverEnv.patstoreAppId,
    restKey: serverEnv.patstoreRestKey,
    projectId: serverEnv.patstoreProjectId,
    cookieName: serverEnv.sessionToken,
    rejectExpiredMembership: true,
    probationRoleId: "tKlza4ZBib",
    invalidCredentialsMessage: "Ungültiger Nutzername oder Passwort.",
    expiredMembershipMessage: "Ihre Mitgliedschaft ist abgelaufen"
});
