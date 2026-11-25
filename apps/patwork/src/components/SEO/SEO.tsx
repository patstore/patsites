import { useEffect } from "react";
import {
    DEFAULT_OG_IMAGE,
    SITE_AUTHOR,
    SITE_NAME,
    toAbsoluteUrl
} from "./site";
import type { SEOProps } from "./types";

export function SEO({
    title,
    description,
    keywords,
    author = SITE_AUTHOR,
    image = DEFAULT_OG_IMAGE,
    url,
    type = "website",
    siteName = SITE_NAME,
    locale = "de_DE",
    twitterCard = "summary_large_image",
    twitterHandle,
    canonicalUrl,
    noindex = false,
    nofollow = false,
    structuredData
}: SEOProps) {
    useEffect(() => {
        document.title = title;

        const updateMetaTag = (
            name: string,
            content: string,
            isProperty = false
        ) => {
            if (!content) return;

            const attribute = isProperty ? "property" : "name";
            let element = document.querySelector<HTMLMetaElement>(
                `meta[${attribute}="${name}"]`
            );

            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attribute, name);
                document.head.appendChild(element);
            }

            element.content = content;
        };

        const resolvedImage = toAbsoluteUrl(image) ?? DEFAULT_OG_IMAGE;
        const resolvedUrl = url ?? canonicalUrl;

        updateMetaTag("description", description);
        if (keywords) updateMetaTag("keywords", keywords);
        if (author) updateMetaTag("author", author);

        updateMetaTag(
            "robots",
            [
                noindex ? "noindex" : "index",
                nofollow ? "nofollow" : "follow"
            ].join(", ")
        );

        updateMetaTag("og:title", title, true);
        updateMetaTag("og:description", description, true);
        updateMetaTag("og:type", type, true);
        updateMetaTag("og:site_name", siteName, true);
        updateMetaTag("og:locale", locale, true);
        if (resolvedUrl) updateMetaTag("og:url", resolvedUrl, true);
        updateMetaTag("og:image", resolvedImage, true);
        updateMetaTag("og:image:alt", title, true);

        updateMetaTag("twitter:card", twitterCard);
        updateMetaTag("twitter:title", title);
        updateMetaTag("twitter:description", description);
        updateMetaTag("twitter:image", resolvedImage);
        if (twitterHandle) updateMetaTag("twitter:site", twitterHandle);

        if (canonicalUrl) {
            let linkElement = document.querySelector<HTMLLinkElement>(
                'link[rel="canonical"]'
            );
            if (!linkElement) {
                linkElement = document.createElement("link");
                linkElement.rel = "canonical";
                document.head.appendChild(linkElement);
            }
            linkElement.href = canonicalUrl;
        }

        if (structuredData) {
            let scriptElement = document.querySelector<HTMLScriptElement>(
                'script[type="application/ld+json"]'
            );
            if (!scriptElement) {
                scriptElement = document.createElement("script");
                scriptElement.type = "application/ld+json";
                document.head.appendChild(scriptElement);
            }
            scriptElement.textContent = JSON.stringify(structuredData);
        }

        return () => {
            if (structuredData) {
                const scriptElement = document.querySelector(
                    'script[type="application/ld+json"]'
                );
                if (scriptElement) {
                    scriptElement.remove();
                }
            }
        };
    }, [
        title,
        description,
        keywords,
        author,
        image,
        url,
        type,
        siteName,
        locale,
        twitterCard,
        twitterHandle,
        canonicalUrl,
        noindex,
        nofollow,
        structuredData
    ]);

    return null;
}
