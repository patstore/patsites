import { createServerFn } from "@tanstack/react-start";
import { isDraftMode } from "@repo/server";

export const readPreviewSession = createServerFn({ method: "GET" }).handler(async () => {
  if (!isDraftMode()) {
    return false;
  }
  const [{ getRequest }, { sessionApi }] = await Promise.all([
    import("@tanstack/react-start/server"),
    import("./auth"),
  ]);
  return sessionApi.hasPreviewSession(getRequest());
});
