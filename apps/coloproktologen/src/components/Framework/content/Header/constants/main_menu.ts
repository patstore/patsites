import { ColoproktologenUser } from "@types";

const main_menu = ({ user }: { user?: ColoproktologenUser }) => [
    {
        name: "Der BCD",
        key: "bcd",
        link: "/bcd",
        hasSubmenu: false,
        menuItems: [
            {
                name: "Der BCD",
                key: "der-bcd",
                link: "/bcd/#der-bcd"
            },
            {
                name: "Vorstand",
                key: "vorstand",
                link: "/bcd/#vorstand"
            },
            {
                name: "Was uns auszeichnet",
                key: "was-uns-auszeichnet",
                link: "/bcd/#was-uns-auszeichnet"
            },
            {
                name: "Kooperation",
                key: "kooperation",
                link: "/bcd/#kooperation"
            },
            {
                name: "Coloproctology",
                key: "coloproctology",
                link: "/bcd/#coloproctology"
            },
            {
                name: "Geschichte",
                key: "geschichte",
                link: "/bcd/#geschichte"
            },
            {
                name: "Satzung / Beitragsordnung",
                key: "satzung",
                link: "/bcd/#satzung"
            }
        ]
    },{
        name: "Für Ärzte",
        key: "aerzte",
        link: "/aerzte",
        hasSubmenu: false,
        menuItems: [
            {
                name: "Veranstaltungen",
                key: "veranstaltungen",
                link: "/aerzte/#veranstaltungen"
            },
            {
                name: "Manual der Koloproktologie",
                key: "manual-der-koloproktologie",
                link: "/aerzte/#manual-der-koloproktologie"
            },
            {
                name: "Empfehlungen zur Hygiene",
                key: "empfehlungen-zur-hygiene",
                link: "/aerzte/#empfehlungen-zur-hygiene"
            },
            {
                name: "Leitlinien zur Proktologie",
                key: "leitlinien-zur-proktologie",
                link: "/aerzte/#leitlinien-zur-proktologie"
            },
            {
                name: "Mitglied werden",
                key: "mitglied-werden",
                link: "/aerzte/#mitglied-werden"
            }
        ]
    },
    {
        name: "Für Patienten",
        key: "patienten",
        link: "/patienten",
        hasSubmenu: false,
        menuItems: [
            {
                name: "Koloproktologie",
                key: "koloproktologie",
                link: "/patienten/#koloproktologie"
            },
            {
                name: "Enddarmerkrankungen",
                key: "enddarmerkrankungen",
                link: "/patienten/#enddarmerkrankungen"
            },
            {
                name: "Behandlungen",
                key: "behandlungen",
                link: "/patienten/#untersuchungen-und-behandlungen"
            },
            {
                name: "Wundpflege",
                key: "wundpflege",
                link: "/patienten/#wundpflege"
            },
            {
                name: "Häufige Fragen",
                key: "haeufige-fragen",
                link: "/patienten/#haeufige-fragen"
            },
            {
                name: "Spezialistensuche",
                key: "spezialistensuche",
                link: "/patienten/#spezialistensuche"
            }
          
        ]
    },
    
    {
        name: "Weiterbildung",
        key: "fortbildung",
        link: "/fortbildung",
        menuItems: [
            {
                name: "Fortbildung",
                key: "fortbildung",
                link: "/fortbildung/#fortbildung"
            },
            {
                name: "Zusatzbezeichnung",
                key: "zusatzbezeichnung",
                link: "/fortbildung/#zusatzbezeichnung"
            },
            {
                name: "Grundkurs",
                key: "koloproktologischer-grundkurs",
                link: "/fortbildung/#koloproktologischer-grundkurs"
            },
            {
                name: "Manual der Koloproktologie",
                key: "manual-der-koloproktologie",
                link: "/fortbildung/#manual-der-koloproktologie"
            },
            {
                name: "Coloproctology",
                key: "coloproctology",
                link: "/fortbildung/#coloproctology"
            },
        ],
        hasSubmenu: false
    },
    {
        name: "Mitgliedschaft",
        key: "mitgliedschaft",
        link: "/mitgliedschaft",
        menuItems: [],
        hasSubmenu: false
    },
    {
        name: user ? "Mitgliederbereich" : "Login",
        key: "user",
        menuItems: user ? userMenu : [],
        hasSubmenu: user ? true : false,
        link: !user ? "/login" : "/app/benutzerkonto"
    }
];

const userMenu = [
    {
        name: "Benutzerkonto",
        key: "benutzerkonto",
        link: "/app/benutzerkonto"
    },
    {
        name: "Leistungen",
        key: "leistungen",
        link: "/app/leistungen"
    },
    {
        name: "Spezialistensuche",
        key: "spezialistensuche",
        link: "/app/spezialistensuche"
    },
    {
        name: "Mitglieder-Infos",
        key: "mitglieder-infos",
        link: "/app/mitglieder-infos"
    },
    {
        name: "Rundmails",
        key: "rundmails",
        link: "/app/rundmails"
    },
    {
        name: "Protokolle",
        key: "protokolle",
        link: "/app/protokolle"
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
