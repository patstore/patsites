import { createFileRoute } from "@tanstack/react-router";
import { Layout, SEO, breadcrumbList, pageUrl } from "@/components";
import { Impressum } from "@/content";

const canonical = pageUrl("/impressum");

export const Route = createFileRoute("/impressum")({
    component: ImpressumComponent
});

function ImpressumComponent() {
    return (
        <>
            <SEO
                title="Impressum | patwork"
                description="Impressum von patwork gemäß § 5 TMG: Angaben zu Patrick Hanke in Freiburg, Kontaktdaten, USt-IdNr. und rechtliche Hinweise."
                url={canonical}
                canonicalUrl={canonical}
                noindex={true}
                type="website"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "WebPage",
                            "@id": `${canonical}#webpage`,
                            name: "Impressum",
                            url: canonical,
                            description:
                                "Rechtliche Informationen und Kontaktdaten von patwork.",
                            inLanguage: "de-DE"
                        },
                        breadcrumbList([
                            { name: "Startseite", path: "/" },
                            { name: "Impressum", path: "/impressum" }
                        ])
                    ]
                }}
            />
            <Layout>
                <Impressum />
            </Layout>
        </>
    );
}
