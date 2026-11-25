import beiLisaImage from "../../../../Home/content/WorksContent/images/bei_lisa.png";
import tvstgImage from "../../../../Home/content/WorksContent/images/tvstg.png";
import koloproktologieImage from "../../../../Home/content/WorksContent/images/koloproktologie.png";
import proceedImage from "../../../../Home/content/WorksContent/images/proceed.png";

export const projects = [
    {
        id: 1,
        title: "Bei Lisa.",
        description:
            "Das Haarstudio Marita ist ein lokaler Friseursalon in Freiburg St. Georgen. Wir haben die Webseite komplett neu gestaltet um den Salon und das Team besser in Szene zu setzen. Die grundlegende Farbgebung der Seite ist geprägt von der Inneneinrichtung des Salons und dem Farbfilter der Fotografien. Um die Inhalte möglichst dynamisch zu präsentieren, haben wir Parallax mit eingefügt.",
        image: beiLisaImage,
        type: "Friseursalon",
        date: "2026",
        roles: ["Webdesign", "Webentwicklung", "Content-Management"],
        link: "/work-1",
        color: "yellow"
    },
    {
        id: 2,
        title: "TV Freiburg St. Georgen",
        description:
            "Um den Kontakt zu den Mitgliedern enger zu gestalten und das Sportangebot umfassender präsentieren zu können, hat der TV Freiburg St. Georgen seine Webseite überarbeitet. Im Fokus stehen die Übungsleiter, die ihre eigenen Sportarten pflegen und eigenständig Inhalte auf der Seite veröffentlichen können. Damit wird die Interaktivität der Mitgleider mit der Seite erhöht, als auch die Vielfältigkeit und Aktualität der Inhalte und des Sportbetriebs präsentiert.",
        image: tvstgImage,
        type: "Sportverein",
        date: "2025",
        roles: ["Webdesign", "Webentwicklung", "Content-Management"],
        link: "/work-2",
        color: "blue"
    },
    {
        id: 3,
        title: "Deutsche Gesellschaft für Koloproktologie",
        description: "Description of the third work",
        type: "Ärztegesellschaft",
        date: "2025",
        roles: ["Webdesign", "Webentwicklung", "Content-Management"],
        image: koloproktologieImage,
        link: "/work-2",
        color: "blue"
    },
    {
        id: 4,
        title: "Proceed GmbH",
        description:
            "Proceed GmbH & Co KG ist ein Netzwerk, das mit dem Anliegen gestartet ist, die Leistungsfähigkeit von Unternehmen zu erhöhen. Wir haben den Webauftritt von Proceed von Anfang an begleitet und immer wieder an die sich veränderten Anforderungen angepasst. So sind Mitglieder, Blogbeiträge und die Events der Seite dynamisch verknüpft, um dem*r Seitenbesucher*in eine nahtlose Gesamterfahrung zu bieten.",
        image: proceedImage,
        type: "Unternehmensseite",
        date: "2022",
        roles: ["Webdesign", "Webentwicklung", "Content-Management"],
        link: "https://www.proceed.gmbh/",
        color: "blue"
    }
] as const;
