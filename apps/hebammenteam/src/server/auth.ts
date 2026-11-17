import { createSessionApi } from "@repo/server/auth";
import { readOptionalServerEnv } from "./env.server";

const env = readOptionalServerEnv();

export const sessionApi = createSessionApi({
	apiUrl: env?.apiUrl ?? "",
	appId: env?.appId ?? "",
	restKey: env?.restKey ?? "",
	projectId: env?.projectId ?? "",
	cookieName: "preview"
});
