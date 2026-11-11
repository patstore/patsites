import { useMemo } from "react";
import { CmsBody, Layout } from "@components";
import { useCollection, useFindImages } from "@provider";
import styles from "./Team.module.css";

const initials = (name: string | null | undefined) =>
  (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const Team = () => {
  const { items } = useCollection("Person");
  const { findImageUrl } = useFindImages();
  const persons = useMemo(
    () => [...items].sort((a, b) => (a.label ?? "").localeCompare(b.label ?? "", "de")),
    [items],
  );

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
            const name = person.label || "Hebamme";
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
