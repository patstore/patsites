import { clearCookieHeader, jsonWithCookie, readCookie, sessionCookieHeader } from "./cookie.ts";
import {
  asRecord,
  callFunction,
  createObject,
  parseFetch,
  ParseFailure,
  updateUser,
} from "./parse.ts";
import {
  PROBEMITGLIED_ROLE_ID,
  getUserRoles,
  probationLoginBlocked,
} from "./roles.ts";
import type { AuthConfig, SessionUser } from "./types.ts";

const NO_ACCESS = "Dieser Account hat keinen Zugriff auf die Anwendung";
const INVALID_CREDENTIALS = "Ungültige Zugangsdaten";
const UNKNOWN_ACCOUNT = "Für diese E-Mail Adresse ist kein Account hinterlegt";
const EXPIRED_MEMBERSHIP = "Ihre Mitgliedschaft ist abgelaufen";
const ROLE_LOOKUP_FAILED = "Die Mitgliedschaft konnte nicht geprüft werden";

function configured(config: AuthConfig): boolean {
  return Boolean(config.apiUrl && config.appId && config.restKey);
}

async function roleIdsFor(
  config: AuthConfig,
  user: Record<string, unknown>,
  sessionToken: string,
): Promise<string[]> {
  const userId = user.objectId;
  if (typeof userId !== "string" || userId.length === 0) {
    return [];
  }
  const roles = await getUserRoles(config, userId, sessionToken);
  const ids = roles.map((role) => role.objectId);
  user.roles = ids;
  return ids;
}

async function probationBlocked(
  config: AuthConfig,
  user: Record<string, unknown>,
  sessionToken: string,
): Promise<boolean> {
  if (!config.rejectExpiredMembership) {
    return false;
  }
  const ids = await roleIdsFor(config, user, sessionToken);
  return probationLoginBlocked(
    ids,
    user.createdAt,
    config.probationRoleId ?? PROBEMITGLIED_ROLE_ID,
  );
}

function cleared(config: AuthConfig, body: unknown, status = 200): Response {
  return jsonWithCookie(body, clearCookieHeader(config.cookieName), status);
}

export async function login(request: Request, config: AuthConfig): Promise<Response> {
  if (!configured(config)) {
    return Response.json({ message: "not valid keys" }, { status: 500 });
  }

  const body = asRecord(await request.json().catch(() => ({}))) ?? {};
  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";
  const email = username.includes("@") ? username : undefined;
  const userName = username.includes("@") ? undefined : username;

  try {
    const userData = asRecord(
      await parseFetch(config, "/functions/get_user_data", {
        method: "POST",
        body: { email, username: userName, project: config.projectId },
      }),
    );
    const user = asRecord(asRecord(userData?.result)?.user);

    if (!user) {
      return Response.json(
        { message: config.noAccessMessage ?? NO_ACCESS },
        { status: 500 },
      );
    }

    try {
      const response = asRecord(
        await parseFetch(config, "/login", {
          method: "POST",
          body: { username: email || userName, password },
        }),
      );
      const token = response?.sessionToken;
      if (typeof token !== "string" || token.length === 0 || !response) {
        return Response.json(
          { message: config.invalidCredentialsMessage ?? INVALID_CREDENTIALS },
          { status: 401 },
        );
      }
      if (config.rejectExpiredMembership) {
        try {
          const signedInUser = { ...response, createdAt: response.createdAt ?? user.createdAt };
          if (await probationBlocked(config, signedInUser, token)) {
            await parseFetch(config, "/logout", { method: "POST", sessionToken: token }).catch(
              () => undefined,
            );
            return Response.json(
              { message: config.expiredMembershipMessage ?? EXPIRED_MEMBERSHIP },
              { status: 401 },
            );
          }
        } catch {
          await parseFetch(config, "/logout", { method: "POST", sessionToken: token }).catch(
            () => undefined,
          );
          return Response.json({ message: ROLE_LOOKUP_FAILED }, { status: 500 });
        }
      }
      return jsonWithCookie(
        { message: "Nutzer eingeloggt" },
        sessionCookieHeader(config.cookieName, token),
      );
    } catch (error) {
      const userId = user.objectId;
      if (config.logFailedLoginService && typeof userId === "string") {
        await parseFetch(config, "/functions/create_log", {
          method: "POST",
          body: {
            type: "error",
            operation: "login",
            className: "User",
            message: `Ungültiger Login: ${error instanceof ParseFailure ? error.message : ""}`,
            data: { username: email || userName },
            service: config.logFailedLoginService,
            userId,
            objectId: userId,
            projectId: config.projectId,
          },
        }).catch(() => undefined);
      }
      return Response.json(
        { message: config.invalidCredentialsMessage ?? INVALID_CREDENTIALS },
        { status: 401 },
      );
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error(error);
    }
    return Response.json(
      { message: config.unknownAccountMessage ?? UNKNOWN_ACCOUNT },
      { status: 500 },
    );
  }
}

export async function logout(request: Request, config: AuthConfig): Promise<Response> {
  const token = readCookie(request.headers.get("cookie"), config.cookieName);
  if (token && configured(config)) {
    await parseFetch(config, "/logout", { method: "POST", sessionToken: token }).catch(
      () => undefined,
    );
  }
  return cleared(config, { ok: true });
}

export async function session(request: Request, config: AuthConfig): Promise<Response> {
  const token = readCookie(request.headers.get("cookie"), config.cookieName);
  if (!token || !configured(config)) {
    return Response.json({ user: null });
  }

  try {
    const user = asRecord(
      await parseFetch(config, "/users/me", { method: "GET", sessionToken: token }),
    );
    if (!user) {
      return cleared(config, { user: null });
    }
    try {
      if (await probationBlocked(config, user, token)) {
        await parseFetch(config, "/logout", { method: "POST", sessionToken: token }).catch(
          () => undefined,
        );
        return cleared(config, { user: null, expired: true });
      }
      if (!config.rejectExpiredMembership) {
        await roleIdsFor(config, user, token);
      }
    } catch {
      user.roles = Array.isArray(user.roles) ? user.roles : [];
    }
    return Response.json({ user });
  } catch {
    return cleared(config, { user: null });
  }
}

export async function requireUser(
  request: Request,
  config: AuthConfig,
): Promise<SessionUser | Response> {
  const token = readCookie(request.headers.get("cookie"), config.cookieName);
  if (!token || !configured(config)) {
    return Response.json({ message: "Nicht authentifiziert" }, { status: 401 });
  }

  try {
    const user = asRecord(
      await parseFetch(config, "/users/me", { method: "GET", sessionToken: token }),
    );
    if (!user || typeof user.objectId !== "string") {
      return cleared(config, { message: "Ungültige Sitzung" }, 401);
    }
    try {
      if (await probationBlocked(config, user, token)) {
        await parseFetch(config, "/logout", { method: "POST", sessionToken: token }).catch(
          () => undefined,
        );
        return cleared(config, { message: EXPIRED_MEMBERSHIP }, 401);
      }
      if (!config.rejectExpiredMembership) {
        await roleIdsFor(config, user, token);
      }
    } catch {
      user.roles = Array.isArray(user.roles) ? user.roles : [];
    }
    return { token, user };
  } catch {
    return cleared(config, { message: "Ungültige Sitzung" }, 401);
  }
}

export function createSessionApi(config: AuthConfig) {
  return {
    config,
    login: (request: Request) => login(request, config),
    logout: (request: Request) => logout(request, config),
    session: (request: Request) => session(request, config),
    requireUser: (request: Request) => requireUser(request, config),
    getUserRoles: (userId: string, sessionToken: string) =>
      getUserRoles(config, userId, sessionToken),
    readToken: (request: Request) => readCookie(request.headers.get("cookie"), config.cookieName),
    callFunction: (name: string, payload: unknown, sessionToken?: string) =>
      callFunction(config, name, payload, sessionToken),
    updateUser: (sessionToken: string, userId: string, fields: Record<string, unknown>) =>
      updateUser(config, sessionToken, userId, fields),
    createObject: (
      className: string,
      fields: Record<string, unknown>,
      sessionToken?: string,
    ) => createObject(config, className, fields, sessionToken),
  };
}
