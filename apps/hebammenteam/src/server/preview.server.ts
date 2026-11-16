import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { isDraftMode } from "@repo/server";
import { sessionApi } from "./auth";

export const readPreviewSession = createServerFn({ method: "GET" }).handler(async () => {
  if (!isDraftMode()) {
    return false;
  }
  return sessionApi.hasPreviewSession(getRequest());
});
