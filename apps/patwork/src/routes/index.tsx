import { createFileRoute } from "@tanstack/react-router";
import { Home } from "@content";
import { SEO, breadcrumbList, pageUrl } from "@/components";

const canonical = pageUrl("/");

export const Route = createFileRoute("/")({
    component: IndexComponent
});

function IndexComponent() {
    return (
        <>
            <SEO
                title="Ausdrucksstarke Webseiten & Weblösungen | patwork"
                description="patwork ist ein Design- und Entwicklungsstudio für individuelle Webseiten und Weblösungen. Verwandle deine Ideen in digitale Erfolge – Webdesign, CMS und SEO."
                keywords="Webdesign, Webentwicklung, Weblösungen, CMS, Content Management, SEO, Freiburg, patwork"
                url={canonical}
                canonicalUrl={canonical}
                type="website"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "ProfessionalService",
                            "@id": `${canonical}#business`,
                            name: "patwork",
                            url: canonical,
                            logo: pageUrl("/images/logo_patwork.webp"),
                            image: pageUrl("/images/logo_patwork.webp"),
                            description:
                                "Design- und Entwicklungsstudio für individuelle Webseiten und Weblösungen.",
                            founder: {
                                "@type": "Person",
                                name: "Patrick Hanke"
                            },
                            address: {
                                "@type": "PostalAddress",
                                streetAddress: "Bergmannsweg 5",
                                addressLocality: "Freiburg",
                                postalCode: "79111",
                                addressCountry: "DE"
                            },
                            email: "info@patwork.net",
                            telephone: "+49-151-64716453",
                            areaServed: {
                                "@type": "Country",
                                name: "Germany"
                            },
                            knowsAbout: [
                                "Frontend Development",
                                "Backend Development",
                                "Webdesign",
                                "Content Management",
                                "SEO Optimization",
                                "UI / UX Design"
                            ]
                        },
                        {
                            "@type": "WebSite",
                            "@id": `${canonical}#website`,
                            name: "patwork",
                            url: canonical,
                            inLanguage: "de-DE",
                            publisher: {
                                "@id": `${canonical}#business`
                            }
                        },
                        breadcrumbList([{ name: "Startseite", path: "/" }])
                    ]
                }}
            />
            <Home />
        </>
    );
}
