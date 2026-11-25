export const SITE_URL = "https://patwork.net";
export const SITE_NAME = "patwork";
export const SITE_AUTHOR = "Patrick Hanke";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/logo_patwork.webp`;

export function pageUrl(path = "/"): string {
    if (path === "/") return `${SITE_URL}/`;
    const normalized = path.startsWith("/") ? path : `/${path}`;
    return `${SITE_URL}${normalized}`;
}

export function toAbsoluteUrl(pathOrUrl?: string): string | undefined {
    if (!pathOrUrl) return undefined;
    if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
    return `${SITE_URL}${pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`}`;
}

export function breadcrumbList(items: { name: string; path: string }[]) {
    return {
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: pageUrl(item.path)
        }))
    };
}
