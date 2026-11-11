import { Link } from "@tanstack/react-router";
import { CmsBody, Layout } from "@components";
import styles from "./Home.module.css";
import { Events, Header, Welcome } from "./content";

const topics = [
  {
    to: "/kurse",
    title: "Kurse",
    text: "Geburtsvorbereitung, Rückbildung und weitere Termine.",
    action: "Kurse ansehen",
  },
  {
    to: "/team",
    title: "Team",
    text: "Die Hebammen, die Sie durch diese Zeit begleiten.",
    action: "Team kennenlernen",
  },
  {
    to: "/leistungen",
    title: "Leistungen",
    text: "Vorsorge, Geburt, Wochenbett und Beratung.",
    action: "Leistungen lesen",
  },
] as const;

const Home = () => (
  <Layout>
    <Header />
    <Welcome />
    <Events />
   
  
  </Layout>
);

export default Home;
