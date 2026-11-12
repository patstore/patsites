import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { CmsBody, Layout, PageHeader } from "@components";
import type { EntryClass, ImageClass, PersonClass } from "@data";
import { useOptionalScroll } from "@repo/core";
import { useCollection } from "@provider";
import styles from "./Services.module.css";
import ServiceCard from "./components/ServiceCard";
import ServiceSlideIn from "./components/ServiceSlideIn";

const portraitSrc = (image: ImageClass | undefined) => {
  if (!image) {
    return null;
  }
  const path = image.thumbnailPath || image.filePath;
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

const plainText = (value: string | null | undefined) =>
  (value ?? "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

const personsForService = (service: EntryClass, persons: PersonClass[]) => {
  const ids = service.categories ?? [];
  if (ids.length === 0) {
    return [];
  }
  const idSet = new Set(ids);
  return persons.filter((person) => idSet.has(person.objectId));
};

const fullName = (person: PersonClass) => person.title || person.label || "Hebamme";

const Services = () => {
  const { items: services } = useCollection("Entry");
  const { items: persons } = useCollection("Person");
  const { items: images } = useCollection("Image");
  const hash = useLocation({ select: (location) => location.hash });
  const scroll = useOptionalScroll();
  const scrollRef = useRef(scroll);
  scrollRef.current = scroll;
  const [openId, setOpenId] = useState<string | null>(null);
  const shownIdRef = useRef<string | null>(null);
  if (openId) {
    shownIdRef.current = openId;
  }

  const imagesById = useMemo(
    () => new Map(images.map((image) => [image.objectId, image])),
    [images],
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
  }, [hash, services.length]);

  const shown = services.find((service) => service.objectId === (openId ?? shownIdRef.current)) ?? null;
  const shownMembers = shown ? personsForService(shown, persons) : [];

  return (
    <Layout>
      <PageHeader
        eyebrow="Angebot"
        title="Leistungen"
        lead="Was Sie von der Begleitung erwarten können."
      />
      <div className="page-body">
        <div className={styles.cms}>
          <CmsBody path="/leistungen" />
        </div>
        {services.length === 0 ? (
          <p className={styles.empty}>Leistungen erscheinen hier, sobald sie veröffentlicht sind.</p>
        ) : (
          <ul className={styles.grid}>
            {services.map((service) => {
              const members = personsForService(service, persons);
              const portraits = members.flatMap((person) => {
                const src = portraitSrc(imagesById.get(person.image ?? ""));
                if (!src) {
                  return [];
                }
                return [{ id: person.objectId, src, name: person.label || fullName(person) }];
              });
              return (
                <li key={service.objectId} className={styles.cell}>
                  <ServiceCard
                    id={service.slug || undefined}
                    title={service.title || "Leistung"}
                    description={plainText(service.description) || plainText(service.text)}
                    portraits={portraits}
                    onOpen={() => setOpenId(service.objectId)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
      <ServiceSlideIn
        open={openId !== null}
        title={shown?.title || "Leistung"}
        text={shown?.text ?? null}
        members={shownMembers.map((person) => ({
          id: person.objectId,
          name: fullName(person),
          src: portraitSrc(imagesById.get(person.image ?? "")),
        }))}
        onClose={() => setOpenId(null)}
      />
    </Layout>
  );
};

export default Services;
