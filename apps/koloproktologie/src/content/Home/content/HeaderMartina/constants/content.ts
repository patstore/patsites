export const CONGRESS_PROGRAM_URL = "https://www.koloproktologen-kongress.de/programm.php?fksart=0";

export type HeaderMartinaEventContent = {
    title: string;
    meta: string;
    link: string;
};

export const headerMartinaEvents: HeaderMartinaEventContent[] = [
    {
        title: "Download Vorprogramm",
        meta: "12. - 13. Mrz. | Augsburg",
        link: "https://www.koloproktologen-kongress.de/download.php?fksart=0"
    },
    {
        title: "MFA- Seminar",
        meta: "Fr., 12. Mrz. | Augsburg",
        link: "https://www.koloproktologen-kongress.de/download/DGK2027_Pflegeflyer.pdf"
    },
    {
        title: "Pflegeseminar",
        meta: "Do., 11. Mrz. | Augsburg",
        link: "https://www.koloproktologen-kongress.de/download/DGK2027_Pflegeflyer.pdf"
    }
];
