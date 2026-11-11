import { CmsBody, Layout } from "@components";
import { useFindImages } from "@provider";
import type { PatstorePerson } from "@types";
import styles from "./Team.module.css";

const initials = (name: string | null | undefined) =>
  (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const Team = ({ persons }: { persons: PatstorePerson[] }) => {
  const { findImageUrl } = useFindImages();

  return (
    <Layout>
      <header className={styles.header}>
        <h1 className={styles.title}>Team</h1>
        <p className={styles.lead}>Die Hebammen, die Sie begleiten.</p>
      </header>
      <div className={styles.cms}>
        <CmsBody path="/team" />
      </div>
      {persons.length === 0 ? (
        <p className={styles.empty}>Das Team erscheint hier, sobald die Profile veröffentlicht sind.</p>
      ) : (
        <ul className={styles.grid}>
          {persons.map((person) => {
            const portrait = findImageUrl(person.image);
            const name = person.title || "Hebamme";
            return (
              <li key={person.objectId} className={styles.card}>
                {portrait ? (
                  <img className={styles.portrait} src={portrait} alt="" />
                ) : (
                  <div className={styles.placeholder} aria-hidden="true">
                    {initials(name) || "H"}
                  </div>
                )}
                <h2>{name}</h2>
                {person.text ? <p>{person.text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()}</p> : null}
                {person.email ? (
                  <a className={styles.mail} href={`mailto:${person.email}`}>
                    {person.email}
                  </a>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </Layout>
  );
};

export default Team;
