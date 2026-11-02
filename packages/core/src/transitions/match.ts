import type { RouteTransition } from "./types.ts";

export function normalizePathname(pathname: string): string {
  const bare = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (bare === "" || bare === "/") {
    return "/";
  }
  return bare.replace(/\/+$/, "") || "/";
}

export function pathMatches(pattern: string, pathname: string): boolean {
  if (pattern === "*") {
    return true;
  }
  if (pattern.endsWith("/*")) {
    const prefix = pattern.slice(0, -2);
    if (prefix === "" || prefix === "/") {
      return pathname.startsWith("/");
    }
    return pathname === prefix || pathname.startsWith(`${prefix}/`);
  }
  return pattern === pathname;
}

function specificity(pattern: string): number {
  if (pattern === "*") {
    return 0;
  }
  if (pattern.endsWith("/*")) {
    return 1 + pattern.length;
  }
  return 1000 + pattern.length;
}

/** Most specific `from` + `to` pair wins. Exact paths beat wildcards. */
export function matchRouteTransition(
  transitions: readonly RouteTransition[],
  from: string,
  to: string,
): RouteTransition | null {
  const fromPath = normalizePathname(from);
  const toPath = normalizePathname(to);
  let best: RouteTransition | null = null;
  let bestScore = -1;

  for (const transition of transitions) {
    if (!pathMatches(transition.from, fromPath) || !pathMatches(transition.to, toPath)) {
      continue;
    }
    const score = specificity(transition.from) + specificity(transition.to);
    if (score > bestScore) {
      best = transition;
      bestScore = score;
    }
  }

  return best;
}
