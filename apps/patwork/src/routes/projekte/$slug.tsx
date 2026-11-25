import { createFileRoute, notFound } from "@tanstack/react-router";
import { buildTimeData, useFindData } from "@data";
import { Projekt, findProjectBySlug, getProjektSeoFields } from "@content";
import type { ArticleClass, ImageClass } from "@data";
import { pageUrl, toAbsoluteUrl } from "@/components";

function projectFromSlug(slug: string) {
    const articles =
        (buildTimeData as { articles?: ArticleClass[] }).articles ?? [];
    return findProjectBySlug(articles, slug);
}

export const Route = createFileRoute("/projekte/$slug")({
    head: ({ params }) => {
        const project = projectFromSlug(params.slug);
        if (!project) return {};

        const seo = getProjektSeoFields(project);
        const canonical = pageUrl(seo.path);
        const images =
            (
                buildTimeData as {
                    images?: Array<ImageClass & { filePath?: string }>;
                }
            ).images ?? [];
        const image = project.image
            ? images.find((item) => item.objectId === project.image)
            : undefined;
        const ogImage = image?.filePath
            ? toAbsoluteUrl(`/data/files/${image.filePath}`)
            : undefined;

        return {
            meta: [
                { title: seo.seoTitle },
                { name: "description", content: seo.description },
                { name: "keywords", content: seo.keywords },
                { property: "og:title", content: seo.seoTitle },
                { property: "og:description", content: seo.description },
                { property: "og:type", content: "article" },
                { property: "og:url", content: canonical },
                ...(ogImage
                    ? [
                          { property: "og:image", content: ogImage },
                          { name: "twitter:image", content: ogImage }
                      ]
                    : []),
                { name: "twitter:card", content: "summary_large_image" },
                { name: "twitter:title", content: seo.seoTitle },
                { name: "twitter:description", content: seo.description }
            ],
            links: [{ rel: "canonical", href: canonical }]
        };
    },
    component: ProjektRoute
});

function ProjektRoute() {
    const { slug } = Route.useParams();
    const { findByClassName } = useFindData();
    const project = findProjectBySlug(findByClassName("articles"), slug);

    if (!project) {
        throw notFound();
    }

    return <Projekt project={project} />;
}
