import { createFileRoute } from "@tanstack/react-router";
import { Projects } from "@content";
import { SEO, breadcrumbList, pageUrl } from "@/components";

const canonical = pageUrl("/projekte");

export const Route = createFileRoute("/projekte/")({
    component: ProjekteComponent
});

function ProjekteComponent() {
    return (
        <>
            <SEO
                title="Projekte – Webdesign & Webentwicklung | patwork"
                description="Ausgewählte Referenzen von patwork: individuelle Webseiten mit Webdesign, Webentwicklung und Content-Management für Unternehmen, Vereine und Organisationen."
                keywords="Projekte, Referenzen, Webdesign, Webentwicklung, Content-Management, patwork"
                url={canonical}
                canonicalUrl={canonical}
                type="website"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "CollectionPage",
                            "@id": `${canonical}#webpage`,
                            name: "Projekte",
                            url: canonical,
                            description:
                                "Ausgewählte Webprojekte von patwork – Webdesign, Webentwicklung und Content-Management.",
                            isPartOf: {
                                "@type": "WebSite",
                                name: "patwork",
                                url: pageUrl("/")
                            },
                            inLanguage: "de-DE"
                        },
                        breadcrumbList([
                            { name: "Startseite", path: "/" },
                            { name: "Projekte", path: "/projekte" }
                        ])
                    ]
                }}
            />
            <Projects />
        </>
    );
}
