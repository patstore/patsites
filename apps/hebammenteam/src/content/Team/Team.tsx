import { useEffect, useMemo, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { CmsBody, Layout, PageHeader } from "@components";
import type { ImageClass, PersonClass } from "@data";
import { useOptionalScroll } from "@repo/core";
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

const initials = (name: string | null | undefined) =>
  (name ?? "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const phoneHref = (value: string) => {
  const compact = value.replace(/[^\d+]/g, "");
  return compact ? `tel:${compact}` : null;
};

const Member = ({
  person,
  portrait,
  reverse,
}: {
  person: PersonClass;
  portrait: string | null;
  reverse: boolean;
}) => {
  const name = person.label || person.title || "Hebamme";
  const email = person.email?.trim() || null;
  const phone = person.data?.telefon?.trim() || null;
  const address = person.data?.adresse?.trim() || null;
  const phoneLink = phone ? phoneHref(phone) : null;

  return (
    <section
      id={person.slug || undefined}
      className={reverse ? `${styles.member} ${styles.reverse}` : styles.member}
    >
      <aside className={styles.profile}>
        {portrait ? (
          <img className={styles.portrait} src={portrait} alt="" />
        ) : (
          <div className={styles.placeholder} aria-hidden="true">
            {initials(name) || "H"}
          </div>
        )}
        <h2>{name}</h2>
        {email || phone || address ? (
          <div className={styles.contact}>
            <h3>Kontakt</h3>
            {email ? <a href={`mailto:${email}`}>{email}</a> : null}
            {phone && phoneLink ? <a href={phoneLink}>{phone}</a> : null}
            {address ? <p className={styles.address}>{address}</p> : null}
          </div>
        ) : null}
      </aside>
      <div className={styles.bio}>
        <h3>Über {name}</h3>
        {person.text ? <div dangerouslySetInnerHTML={{ __html: person.text }} /> : null}
      </div>
    </section>
  );
};

const Team = () => {
  const { items } = useCollection("Person");
  const { items: images } = useCollection("Image");
  const hash = useLocation({ select: (location) => location.hash });
  const scroll = useOptionalScroll();
  const scrollRef = useRef(scroll);
  scrollRef.current = scroll;
  const portraits = useMemo(() => {
    const byId = new Map(images.map((image) => [image.objectId, image]));
    return (id: string | null | undefined) => portraitSrc(id ? byId.get(id) : undefined);
  }, [images]);
  const persons = useMemo(
    () => [...items].sort((a, b) => (a.label ?? "").localeCompare(b.label ?? "", "de")),
    [items],
  );

  useEffect(() => {
    const id = hash.replace(/^#/, "");
    if (!id) {
      return;
    }

    const align = (immediate: boolean) => {
      const el = document.getElementById(id);
      const api = scrollRef.current;
      const viewport = api?.getViewport() ?? null;
      if (!el || !api || !viewport) {
        return;
      }
      const headerOffset = 96;
      const top = Math.max(
        0,
        el.getBoundingClientRect().top -
          viewport.getBoundingClientRect().top +
          viewport.scrollTop -
          headerOffset,
      );
      if (Math.abs(viewport.scrollTop - top) < 8) {
        return;
      }
      api.scrollTo(top, { immediate });
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const frame = window.requestAnimationFrame(() => align(reduced));
    const timer = window.setTimeout(() => align(true), 450);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [hash, persons.length]);

  return (
    <Layout>
      <PageHeader eyebrow="Praxis" title="Team" lead="Die Hebammen, die Sie begleiten." />
      <div className="page-body">
        <div className={styles.cms}>
          <CmsBody path="/team" />
        </div>
        {persons.length === 0 ? (
          <p className={styles.empty}>Das Team erscheint hier, sobald die Profile veröffentlicht sind.</p>
        ) : (
          persons.map((person, index) => (
            <Member
              key={person.objectId}
              person={person}
              portrait={portraits(person.image)}
              reverse={index % 2 === 1}
            />
          ))
        )}
      </div>
    </Layout>
  );
};

export default Team;
