import { createFileRoute } from "@tanstack/react-router";
import { Pricing } from "@content";
import { SEO, breadcrumbList, pageUrl } from "@/components";
import pricing_plans from "@/content/Pricing/content/PatworkPricing/constants/pricing_plans";

const canonical = pageUrl("/preise");

export const Route = createFileRoute("/preise")({
    component: PreiseComponent
});

function PreiseComponent() {
    return (
        <>
            <SEO
                title="Preise – patstore CMS & Webseiten | patwork"
                description="Transparente monatliche Preise für patstore CMS – Pakete S bis XL ab 6 Euro. Plus individuelle Lösungen und Orientierung zu den Kosten einer Webseite."
                keywords="Preise, patstore, CMS, Content Management, Webseite Kosten, patwork"
                url={canonical}
                canonicalUrl={canonical}
                type="website"
                structuredData={{
                    "@context": "https://schema.org",
                    "@graph": [
                        {
                            "@type": "CollectionPage",
                            "@id": `${canonical}#webpage`,
                            name: "Preise",
                            url: canonical,
                            description:
                                "Preisübersicht für patstore CMS und individuelle Weblösungen.",
                            isPartOf: {
                                "@type": "WebSite",
                                name: "patwork",
                                url: pageUrl("/")
                            },
                            inLanguage: "de-DE"
                        },
                        {
                            "@type": "OfferCatalog",
                            "@id": `${canonical}#patstore`,
                            name: "patstore Preise",
                            description:
                                "Monatliche Pakete für das patstore Content Management System – transparent und flexibel erweiterbar.",
                            url: canonical,
                            itemListElement: pricing_plans.map(
                                (plan, index) => ({
                                    "@type": "Offer",
                                    position: index + 1,
                                    name: plan.name,
                                    description: plan.description,
                                    priceSpecification: {
                                        "@type": "UnitPriceSpecification",
                                        price:
                                            plan.price.match(/\d+/)?.[0] ??
                                            undefined,
                                        priceCurrency: "EUR",
                                        billingDuration: "P1M"
                                    }
                                })
                            )
                        },
                        breadcrumbList([
                            { name: "Startseite", path: "/" },
                            { name: "Preise", path: "/preise" }
                        ])
                    ]
                }}
            />
            <Pricing />
        </>
    );
}
