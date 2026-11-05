const YEAR_SECONDS = 60 * 60 * 24 * 365;

export function readCookie(header: string | null, name: string): string {
  if (!header) {
    return "";
  }
  const match = header
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  if (!match) {
    return "";
  }
  return decodeURIComponent(match.slice(name.length + 1));
}

export function sessionCookieHeader(name: string, token: string): string {
  return `${name}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${YEAR_SECONDS}${secureAttribute()}`;
}

export function clearCookieHeader(name: string): string {
  return `${name}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secureAttribute()}`;
}

function secureAttribute(): string {
  return process.env.NODE_ENV === "production" ? "; Secure" : "";
}

export function jsonWithCookie(
  body: unknown,
  cookie: string,
  status = 200,
): Response {
  return Response.json(body, {
    status,
    headers: { "Set-Cookie": cookie },
  });
}
