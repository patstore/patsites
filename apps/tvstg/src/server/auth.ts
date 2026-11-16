import { createSessionApi } from "@repo/server/auth";
import { getServerEnv } from "./env.server";

function readEnv() {
  try {
    return getServerEnv();
  } catch {
    return null;
  }
}

const env = readEnv();

export const sessionApi = createSessionApi({
  apiUrl: env?.apiUrl ?? "",
  appId: env?.appId ?? "",
  restKey: env?.restKey ?? "",
  projectId: env?.projectId ?? "",
  cookieName: "preview",
});
