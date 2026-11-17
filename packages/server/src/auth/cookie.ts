const YEAR_SECONDS = 60 * 60 * 24 * 365;

/** Separate from the member session cookie, and limited to the browser session. */
export const PREVIEW_COOKIE_NAME = "preview";

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

/**
 * No Max-Age: the browser drops this cookie when the session ends.
 * Lax, not Strict: the CMS opens the preview link from another site, and the
 * browser only attaches the cookie to that top-level navigation when it is Lax.
 */
export function previewCookieHeader(token: string): string {
	return `${PREVIEW_COOKIE_NAME}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax${secureAttribute()}`;
}

function secureAttribute(): string {
	return process.env.NODE_ENV === "production" ? "; Secure" : "";
}

export function jsonWithCookie(
	body: unknown,
	cookie: string,
	status = 200
): Response {
	return Response.json(body, {
		status,
		headers: { "Set-Cookie": cookie }
	});
}
