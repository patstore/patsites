import { useFindData } from "@data";
import { Layout, SEO, breadcrumbList, pageUrl } from "@components";
import { NextProject, ProjektContent, ProjektHeader } from "./content";
import { getProjektSeoFields } from "./utils";
import type { ImageClass } from "@data";
import type { FC } from "react";
import type { ProjektProps } from "./types";

const Projekt: FC<ProjektProps> = ({ project }) => {
    const { findByObjectId } = useFindData();
    const seo = getProjektSeoFields(project);
    const canonical = pageUrl(seo.path);
    const image = project.image
        ? findByObjectId<ImageClass & { filePath?: string }>(project.image)
        : null;
    const ogImage = image?.filePath
        ? `/data/files/${image.filePath}`
        : undefined;

    return (
        <>
            <SEO
                title={seo.seoTitle}
                description={seo.description}
                keywords={seo.keywords}
                url={canonical}
                canonicalUrl={canonical}
                image={ogImage}
                type="article"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "CreativeWork",
                            "@id": `${canonical}#webpage`,
                            name: seo.title,
                            headline: seo.title,
                            url: canonical,
                            description: seo.description,
                            image: ogImage ? pageUrl(ogImage) : undefined,
                            isPartOf: {
                                "@type": "WebSite",
                                name: "patwork",
                                url: pageUrl("/")
                            },
                            inLanguage: "de-DE"
                        },
                        breadcrumbList([
                            { name: "Startseite", path: "/" },
                            { name: "Projekte", path: "/projekte" },
                            { name: seo.title, path: seo.path }
                        ])
                    ]
                }}
            />
            <Layout>
                <ProjektHeader title={seo.title} />
                <ProjektContent project={project} />
                <NextProject project={project} />
            </Layout>
        </>
    );
};

export default Projekt;
