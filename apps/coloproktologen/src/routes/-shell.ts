import type { LocalizationConfig, RouteTransition, SeoData } from "@repo/core";

export const siteLocalization: LocalizationConfig = {
    languages: ["de"],
    defaultLanguage: "de"
};

export const routeTransitions: RouteTransition[] = [];

export const pageFade: Omit<RouteTransition, "from" | "to"> = {
    duration: 0.45,
    ease: "power2.out",
    page: {
        from: { autoAlpha: 0 },
        to: { autoAlpha: 1 }
    }
};

export function defaultSeo(pathname: string): SeoData {
    return {
        title: "Berufsverband Coloproktologie Deutschland e.V.",
        description:
            "Vereinigung der End- und Dickdarmspezialisten Deutschlands",
        siteName: "Berufsverband Coloproktologie Deutschland e.V.",
        locale: "de_DE",
        type: "website",
        url: pathname
    };
}
