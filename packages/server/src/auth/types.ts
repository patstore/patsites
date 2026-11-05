export interface AuthConfig {
  apiUrl: string;
  appId: string;
  restKey: string;
  projectId: string;
  cookieName: string;
  /**
   * Reject login and later requests when the user belongs to `probationRoleId`
   * and the account `createdAt` is at least one year old.
   */
  rejectExpiredMembership?: boolean;
  /** `_Role` objectId for the one-year probation membership. Defaults to Probemitglied. */
  probationRoleId?: string;
  /** Parse `create_log` service name written after a bad password. */
  logFailedLoginService?: string;
  invalidCredentialsMessage?: string;
  noAccessMessage?: string;
  unknownAccountMessage?: string;
  expiredMembershipMessage?: string;
}

export interface SessionUser {
  token: string;
  user: Record<string, unknown>;
}
