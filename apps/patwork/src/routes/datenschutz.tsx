import { createFileRoute } from "@tanstack/react-router";
import { Layout, SEO, breadcrumbList, pageUrl } from "@/components";
import { Datenschutz } from "@/content";

const canonical = pageUrl("/datenschutz");

export const Route = createFileRoute("/datenschutz")({
    component: DatenschutzComponent
});

function DatenschutzComponent() {
    return (
        <>
            <SEO
                title="Datenschutzerklärung | patwork"
                description="Datenschutzerklärung von patwork: Hinweise zur Verarbeitung personenbezogener Daten, Hosting, Kontaktformular und Ihre Rechte nach der DSGVO."
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
                            name: "Datenschutzerklärung",
                            url: canonical,
                            description:
                                "Informationen zum Umgang mit personenbezogenen Daten auf patwork.",
                            inLanguage: "de-DE"
                        },
                        breadcrumbList([
                            { name: "Startseite", path: "/" },
                            { name: "Datenschutz", path: "/datenschutz" }
                        ])
                    ]
                }}
            />
            <Layout>
                <Datenschutz />
            </Layout>
        </>
    );
}
