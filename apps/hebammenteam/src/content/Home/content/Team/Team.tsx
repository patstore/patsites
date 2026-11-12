import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import type { ImageClass, PersonClass } from "@data";
import { useCollection } from "@provider";
import styles from "./Team.module.css";

const portraitSrc = (image: ImageClass | undefined) => {
  if (!image) {
    return null;
  }
  const path = image.filePath || image.thumbnailPath;
  if (path) {
    const encoded = path
      .split("/")
      .filter(Boolean)
      .map((part) => encodeURIComponent(part))
      .join("/");
    return `/data/files/${encoded}`;
  }
  const remote = image.file?.url;
  return remote && /^https?:\/\//i.test(remote) ? remote : null;
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const displayName = (person: PersonClass) => person.label || person.title || "Hebamme";

const Team = () => {
  const { items } = useCollection("Person");
  const { items: images } = useCollection("Image");
  const portraits = useMemo(() => {
    const byId = new Map(images.map((image) => [image.objectId, image]));
    return (id: string | null | undefined) => portraitSrc(id ? byId.get(id) : undefined);
  }, [images]);
  const persons = useMemo(
    () =>
      [...items].sort((a, b) => displayName(a).localeCompare(displayName(b), "de")),
    [items],
  );

  return (
    <section aria-label="Team">
      <div className="content">
        <h2>Team</h2>
        <ul className={styles.list}>
          {persons.map((person) => {
            const name = displayName(person);
            const portrait = portraits(person.image);
            return (
              <li key={person.objectId} className={styles.item}>
                <Link to="/team" hash={person.slug || undefined} className={styles.person}>
                  {portrait ? (
                    <img className={styles.portrait} src={portrait} alt="" />
                  ) : (
                    <span className={styles.placeholder} aria-hidden="true">
                      {initials(name) || "H"}
                    </span>
                  )}
                  <span className={styles.name}>{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Team;
