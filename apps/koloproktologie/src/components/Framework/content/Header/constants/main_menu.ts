import { KoloproktologieUser } from "@types";

const main_menu = ({ user }: { user?: KoloproktologieUser }) => [
    {
        name: "Die DGK",
        key: "dgk",
        menuItems: [
            {
                name: "Vorstand & Präsidium",
                key: "auszeichnungen",
                link: "/dgk/vorstand"
            },
            {
                name: "Mitglied werden",
                key: "mitgliedschaft",
                link: "/dgk/mitgliedschaft"
            },
            {
                name: "Mitgliedersuche",
                key: "mitgliedersuche",
                link: "/dgk/mitgliedersuche"
            },
            {
                name: "Beitragsordnung",
                key: "beitragsordnung",
                link: "/dgk/beitragsordnung"
            },
            {
                name: "Satzung",
                key: "satzung",
                link: "/dgk/satzung"
            },
            {
                name: "Geschichte",
                key: "geschichte",
                link: "/dgk/geschichte"
            }
        ]
    },
    {
        name: "Aktivitäten",
        key: "aktivitaeten",
        menuItems: [
            {
                name: "Kongress",
                key: "kongress",
                link: "/aktivitaeten/kongress"
            },
            {
                name: "Auszeichnungen",
                key: "auszeichnungen",
                link: "/aktivitaeten/auszeichnungen"
            },
            {
                name: "Leitlinien",
                key: "leitlinien",
                link: "/aktivitaeten/leitlinien"
            },
            {
                name: "Forschungsförderung",
                key: "forschungsfoerderung",
                link: "/aktivitaeten/forschungsfoerderung"
            },
            {
                name: "Hospitationen",
                key: "hospitationen",
                link: "/aktivitaeten/hospitationen"
            },
            {
                name: "Zertifizierung",
                key: "zertifizierung",
                link: "/aktivitaeten/zertifizierung"
            },
            {
                name: "Schirmherrschaft",
                key: "schirmherrschaft",
                link: "/aktivitaeten/schirmherrschaft"
            }
        ]
    },
    {
        name: "Fortbildung",
        key: "fortbildung",
        menuItems: [
            {
                name: "Manual der Koloproktologie",
                key: "manual",
                link: "/fortbildung/manual"
            },
            {
                name: "Coloproctology",
                key: "coloproctology",
                link: "/fortbildung/coloproctology"
            },
            {
                name: "Koloproktologischer Grundkurs",
                key: "grundkurs",
                link: "/fortbildung/grundkurs"
            },
            {
                name: "EBSQ-Coloproctology",
                key: "ebsq",
                link: "/fortbildung/ebsq"
            },
            {
                name: "Veranstaltungen",
                key: "veranstaltungen",
                link: "/fortbildung/veranstaltungen"
            }
        ]
    },
    {
        name: "Kontakt",
        key: "kontakt",
        menuItems: [],
        hasSubmenu: false,
        link: "/kontakt"
    },
    {
        name: user ? user.label : "Login",
        key: "user",
        menuItems: user ? userMenu : [],
        hasSubmenu: user ? true : false,
        link: !user ? "/login" : undefined
    }
];

const userMenu = [
    {
        name: "Mitgliederbereich",
        key: "mitgliederbereich",
        link: "/app/mitgliederbereich"
    },
    {
        name: "Profil",
        key: "profil",
        link: "/app/profile"
    },
    {
        name: "Ausloggen",
        key: "logout",
        function: async () => {
            await fetch("/api/logout", { method: "POST" });
            return (window.location.pathname = "/login");
        }
    }
];

export default main_menu;
