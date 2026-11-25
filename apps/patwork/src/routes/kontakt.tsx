import { Kontakt } from "@content";
import { createFileRoute } from "@tanstack/react-router";
import { SEO, breadcrumbList, pageUrl } from "@/components";

const canonical = pageUrl("/kontakt");

export const Route = createFileRoute("/kontakt")({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <>
            <SEO
                title="Kontakt – Projekt anfragen | patwork"
                description="Schreibe deine Fragen, Ideen oder Vorstellungen. Erreiche patwork per Kontaktformular, unter info@patwork.net oder telefonisch unter 0151 64716453."
                keywords="Kontakt, Anfrage, Webdesign, Webentwicklung, Freiburg, patwork"
                url={canonical}
                canonicalUrl={canonical}
                type="website"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "ContactPage",
                            "@id": `${canonical}#webpage`,
                            name: "Kontakt",
                            url: canonical,
                            description:
                                "Kontaktformular und Kontaktdaten von patwork.",
                            isPartOf: {
                                "@type": "WebSite",
                                name: "patwork",
                                url: pageUrl("/")
                            },
                            inLanguage: "de-DE"
                        },
                        {
                            "@type": "ProfessionalService",
                            "@id": `${pageUrl("/")}#business`,
                            name: "patwork",
                            email: "info@patwork.net",
                            telephone: "+49-151-64716453",
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "Bergmannsweg 5",
                                addressLocality: "Freiburg",
                                postalCode: "79111",
                                addressCountry: "DE"
                            },
                            contactPoint: {
                                "@type": "ContactPoint",
                                contactType: "customer support",
                                email: "info@patwork.net",
                                telephone: "+49-151-64716453",
                                availableLanguage: ["de", "en"]
                            }
                        },
                        breadcrumbList([
                            { name: "Startseite", path: "/" },
                            { name: "Kontakt", path: "/kontakt" }
                        ])
                    ]
                }}
            />
            <Kontakt />
        </>
    );
}
