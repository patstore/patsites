export type ModuleGroup = "group-a" | "group-b" | "group-c";

export type Module = {
    value: string;
    label: string;
    group: ModuleGroup;
    description: string;
};

const modules: Module[] = [
    {
        value: "users",
        label: "Nutzer",
        group: "group-a",
        description: "Verwaltung von Nutzern und Rollen"
    },
    {
        value: "news",
        label: "News",
        group: "group-a",
        description: "Erstellung und Verwaltung von News"
    },
    {
        value: "events",
        label: "Events",
        group: "group-a",
        description: "Erstellung und Verwaltung von Events"
    },
    {
        value: "images",
        label: "Bilder",
        group: "group-a",
        description: "Erstellung und Verwaltung von Bildern"
    },
    {
        value: "documents",
        label: "Dokumente",
        group: "group-a",
        description: "Erstellung und Verwaltung von Dokumenten"
    },
    {
        value: "downloads",
        label: "Downloads",
        group: "group-a",
        description: "Erstellung und Verwaltung von Downloads"
    },
    {
        value: "forms",
        label: "Formulare",
        group: "group-a",
        description: "Erstellung und Verwaltung von Formularen"
    },
    {
        value: "categories",
        label: "Kategorien",
        group: "group-a",
        description: "Erstellung und Verwaltung von Kategorien"
    },
    {
        value: "locations",
        label: "Orte",
        group: "group-a",
        description: "Erstellung und Verwaltung von Standorten"
    },
    {
        value: "persons",
        label: "Personen",
        group: "group-a",
        description: "Erstellung und Verwaltung von Personen"
    },
    {
        value: "groups",
        label: "Gruppen",
        group: "group-b",
        description: "Erstellung und Verwaltung von Gruppen"
    },
    {
        value: "E-Mail",
        label: "E-Mail",
        group: "group-c",
        description: "Erstellung und Versenden von E-Mails"
    },
    {
        value: "videos",
        label: "Videos",
        group: "group-c",
        description: "Erstellung und Verwaltung von Videos"
    }
];

export default modules;
