import type { LocalizationConfig, RouteTransition, SeoData } from "@repo/core";

export const siteLocalization: LocalizationConfig = {
  languages: ["de", "en"],
  defaultLanguage: "de",
};

/**
 * One entry per navigation. The most specific `from` / `to` pair wins.
 * Shared elements use the same `id` as `<TransitionElement id="...">`.
 */
export const routeTransitions: RouteTransition[] = [
  {
    from: "/",
    to: "/kontakt",
    clonePrevious: false,
    duration: 0.6,
    ease: "power2.inOut",
    page: {
      from: { autoAlpha: 0, y: 24 },
      to: { autoAlpha: 1, y: 0 },
    },
  },
];

export const pageFade: Omit<RouteTransition, "from" | "to"> = {
  duration: 0.45,
  ease: "power2.out",
  page: {
    from: { autoAlpha: 0 },
    to: { autoAlpha: 1 },
  },
};

export function defaultSeo(pathname: string): SeoData {
  return {
    title: "Deutsche Gesellschaft für Koloproktologie",
    description:
      "Expertise bündeln, Wissen teilen – gemeinsam für eine starke und zukunftsorientierte Koloproktologie",
    siteName: "Deutsche Gesellschaft für Koloproktologie",
    locale: "de_DE",
    type: "website",
    url: pathname,
  };
}
