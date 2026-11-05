import { asRecord, callFunction } from "./parse.ts";
import type { AuthConfig } from "./types.ts";

/** Parse `_Role` objectId for "Probemitglied". */
export const PROBEMITGLIED_ROLE_ID = "tKlza4ZBib";

export type UserRole = {
  objectId: string;
  name: string;
};

export function readDate(value: unknown): Date | undefined {
  if (typeof value === "string" && value.length > 0) {
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? undefined : date;
  }
  const record = asRecord(value);
  if (typeof record?.iso === "string") {
    const date = new Date(record.iso);
    return Number.isNaN(date.getTime()) ? undefined : date;
  }
  return undefined;
}

/** True when `createdAt` is at least one year before `now`. */
export function accountIsOneYearOld(createdAt: unknown, now = new Date()): boolean {
  const created = readDate(createdAt);
  if (!created) {
    return false;
  }
  const anniversary = new Date(created);
  anniversary.setFullYear(anniversary.getFullYear() + 1);
  return now.getTime() >= anniversary.getTime();
}

export function probationLoginBlocked(
  roleIds: string[],
  createdAt: unknown,
  roleId = PROBEMITGLIED_ROLE_ID,
  now = new Date(),
): boolean {
  return roleIds.includes(roleId) && accountIsOneYearOld(createdAt, now);
}

/** Roles whose `users` relation contains this user. Requires that user's session. */
export async function getUserRoles(
  config: AuthConfig,
  userId: string,
  sessionToken: string,
): Promise<UserRole[]> {
  const data = asRecord(
    await callFunction(config, "get_user_roles", { user_id: userId }, sessionToken),
  );
  const result = asRecord(data?.result) ?? data;
  if (!Array.isArray(result?.roles)) {
    return [];
  }
  return result.roles.flatMap((role) => {
    const record = asRecord(role);
    if (!record || typeof record.objectId !== "string") {
      return [];
    }
    return [
      {
        objectId: record.objectId,
        name: typeof record.name === "string" ? record.name : "",
      },
    ];
  });
}
