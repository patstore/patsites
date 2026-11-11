import { Link } from "@tanstack/react-router";
import { CmsBody, Layout } from "@components";
import styles from "./Home.module.css";

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
    <section className={styles.hero}>
      <p className={styles.eyebrow}>Hebammen-Team</p>
      <h1 className={styles.title}>Begleitung, die Zeit lässt.</h1>
      <p className={styles.lead}>
        Schwangerschaft, Geburt und Wochenbett. Persönlich, ruhig und in Ihrer Nähe.
      </p>
    </section>
    <section className={styles.grid} aria-label="Bereiche">
      {topics.map((topic) => (
        <Link key={topic.to} to={topic.to} className={styles.card}>
          <h2>{topic.title}</h2>
          <p>{topic.text}</p>
          <span>{topic.action}</span>
        </Link>
      ))}
    </section>
    <div className={styles.cms}>
      <CmsBody path={["/", "/start"]} />
    </div>
  </Layout>
);

export default Home;
