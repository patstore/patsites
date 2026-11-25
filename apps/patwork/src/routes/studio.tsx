import { createFileRoute } from "@tanstack/react-router";
import { Studio } from "@/content";
import { SEO, breadcrumbList, pageUrl } from "@/components";

const canonical = pageUrl("/studio");

export const Route = createFileRoute("/studio")({
    component: RouteComponent
});

function RouteComponent() {
    return (
        <>
            <SEO
                title="Studio – Design und Entwicklung | patwork"
                description="patwork ist ein Design- und Entwicklungsstudio für moderne Webseiten. Von Idee und Design über Entwicklung bis CMS und SEO – in langfristiger Kooperation."
                keywords="Studio, Designstudio, Webentwicklung, UI UX, Content Management, SEO, patwork"
                url={canonical}
                canonicalUrl={canonical}
                type="website"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "AboutPage",
                            "@id": `${canonical}#webpage`,
                            name: "Studio",
                            url: canonical,
                            description:
                                "Design- und Entwicklungsstudio patwork – Prozess, Skills und langfristige Kooperation.",
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
                            url: pageUrl("/"),
                            description:
                                "Design- und Entwicklungsstudio mit Fokus auf kreative, moderne und kundenindividuelle Webseiten und Webanwendungen.",
                            knowsAbout: [
                                "Frontend Development",
                                "Backend Development",
                                "Webdesign",
                                "Content Management",
                                "SEO Optimization",
                                "UI / UX Design"
                            ]
                        },
                        breadcrumbList([
                            { name: "Startseite", path: "/" },
                            { name: "Studio", path: "/studio" }
                        ])
                    ]
                }}
            />
            <Studio />
        </>
    );
}
