export function canonicalPath(value: string | null | undefined): string {
  if (!value) {
    return "";
  }
  const withSlash = value.startsWith("/") ? value : `/${value}`;
  const trimmed = withSlash.replace(/\/+$/, "");
  return trimmed || "/";
}

/** Last segment of `/kurse/:kurs_id`. The listing path `/kurse` has no slug. */
export function courseSlug(path: string | null | undefined): string | null {
  const canonical = canonicalPath(path);
  const prefix = "/kurse/";
  if (!canonical.startsWith(prefix)) {
    return null;
  }
  const slug = canonical.slice(prefix.length).split("/").filter(Boolean)[0];
  return slug || null;
}
