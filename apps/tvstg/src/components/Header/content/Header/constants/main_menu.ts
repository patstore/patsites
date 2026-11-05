import { Menu } from "../types";

const main_menu: Menu = [
  {
    name: "Unser Sportangebot",
    key: "sportangebot",
    link: "/sportarten",
    menuItems: [
      {
        name: "Ballsport",
        key: "ballsport",
        hasSubmenu: true,
        link: "/sportarten/ballsport",
        subMenuItems: [
          {
            name: "Prellball",
            key: "prellball",
            link: "/sportarten/ballsport/prellball",
          },
          {
            name: "Volleyball",
            key: "volleyball",
            link: "/sportarten/ballsport/volleyball",
          },
          {
            name: "Tischtennis",
            key: "tischtennis",
            link: "/sportarten/ballsport/tischtennis",
          }
        ],
      },
      {
        name: "Tanz und Rope Skipping",
        key: "tanzundshow",
        hasSubmenu: false,
        link: "/sportarten/tanz-und-rope-skipping",
      },
      {
        name: "Turnen",
        key: "turnen",
        hasSubmenu: false,
        link: "/sportarten/turnen",
      },
      {
        name: "Gesund und Fit",
        key: "gesundheitssport",
        hasSubmenu: false,
        link: "/sportarten/gesundheitssport",
      },
      {
        name: "Leichtathletik",
        key: "leichtathletik",
        hasSubmenu: false,
        link: "/sportarten/leichtathletik",
      },
    ],
  },
  {
    name: "Über den Verein",
    key: "verein",
    menuItems: [
      {
        name: "Vorstand",
        key: "vorstand",
        hasSubmenu: false,
        link: "/verein/vorstand",
      },
      {
        name: "Prävention",
        key: "praevention",
        hasSubmenu: false,
        link: "/verein/praevention",
      },
      {
        name: "Satzung",
        key: "satzung",
        hasSubmenu: false,
        link: "/verein/satzung",
      },
      {
        name: "Jugendordnung",
        key: "jugendordnung",
        hasSubmenu: false,
        link: "/verein/jugendordnung",
      },
      {
        name: "Berichte",
        key: "berichte",
        hasSubmenu: false,
        link: "/medien/berichte",
      },
      {
        name: "Downloads",
        key: "downloads",
        hasSubmenu: false,
        link: "/medien/downloads",
      },
      {
        name: "Veröffentlichungen",
        key: "veroeffentlichungen",
        hasSubmenu: false,
        link: "/medien/veroeffentlichungen",
      },
    ],
  },
  {
    name: "Termine",
    key: "termine",
    menuItems: [],
    link: "/termine",
  },
  {
    name: "Jobbörse",
    key: "jobboerse",
    link: "/jobboerse",
    menuItems: [],
  },
  {
    name: "Mitglied werden",
    key: "mitglied",
    link: "/mitgliedschaft",
    menuItems: [],
  },
  {
    name: "Kontakt",
    key: "kontakt",
    link: "/kontakt",
    menuItems: [],
  },
  {
    name: "Unser Shop",
    key: "shop",
    hasSubmenu: false,
    link: "https://tvstg.fan12.de/",
    color: "#BE0027",
    menuItems: [],
  },
];

export default main_menu;
