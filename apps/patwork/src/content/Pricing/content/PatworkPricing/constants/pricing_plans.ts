export type PricingPlan = {
    name: string;
    users: number;
    images: number;
    features: ("group-a" | "group-b" | "group-c")[];
    price: string;
    description: string;
    projects: string;
};

const pricing_plans: PricingPlan[] = [
    {
        name: "Paket S",
        users: 3,
        images: 120,
        features: ["group-a"],
        price: "6 Euro mtl.",
        description: "Für kleine Webseiten oder Blogs",
        projects: "Bis zu 1 Projekt"
    },
    {
        name: "Paket M",
        users: 6,
        images: 180,
        features: ["group-a", "group-b"],
        price: "12 Euro mtl.",
        description: "Für Mittelgroße Webseiten mit Mehreren Inhalten",
        projects: "Bis zu 1 Projekt"
    },
    {
        name: "Paket L",
        users: 12,
        images: 240,
        features: ["group-a", "group-b"],
        price: "18 Euro mtl.",
        description:
            "Für größere Webseiten mit mehreren Inhaltselementen, und Mitredakteuren",
        projects: "Bis zu 3 Projekte"
    },
    {
        name: "Paket XL",
        users: 24,
        images: 300,
        features: ["group-a", "group-b", "group-c"],
        price: "24 Euro mtl.",
        description: "für Große Webseiten mit eigenem Nutzerbereich",
        projects: "Unbegrenzt"
    }
];

export default pricing_plans;
