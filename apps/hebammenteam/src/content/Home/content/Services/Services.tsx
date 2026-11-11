import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import "@data";
import type { EntryClass, ImageClass, PersonClass } from "@data";
import { isDraftMode, loadStaticRecords } from "@repo/server";
import styles from "./Services.module.css";
import ServiceCard from "./components/ServiceCard";
import SliderControls from "./components/SliderControls";

const recordStates = isDraftMode() ? null : (["published"] as const);

const personsForService = (service: EntryClass, persons: PersonClass[]) => {
  const ids = service.categories ?? [];
  if (ids.length === 0) {
    return [];
  }
  const idSet = new Set(ids);
  return persons.filter((person) => idSet.has(person.objectId));
};

const Services = () => {
  const navigate = useNavigate();
  const scrollerRef = useRef<HTMLDivElement>(null);
  const services = loadStaticRecords<EntryClass>("Entry", { states: recordStates });
  const persons = loadStaticRecords<PersonClass>("Person", { states: recordStates });
  const images = loadStaticRecords<ImageClass>("Image", { states: null });
  const [edges, setEdges] = useState({ start: true, end: true });

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    const update = () => {
      const edge = 8;
      setEdges({
        start: el.scrollLeft <= edge,
        end: el.scrollLeft + el.clientWidth >= el.scrollWidth - edge,
      });
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [services.length]);

  const scrollByCard = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    const card = el?.querySelector<HTMLElement>("[data-service-card]");
    if (!el || !card) {
      return;
    }
    const gap = Number.parseFloat(getComputedStyle(el).columnGap || getComputedStyle(el).gap) || 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: direction * (card.offsetWidth + gap),
      behavior: reduced ? "auto" : "smooth",
    });
  };

  return (
    <section className={styles.section} aria-label="Leistungen">
      <div className="content">
        <h2 className={styles.heading}>Leistungen</h2>
        <div className={styles.track} ref={scrollerRef}>
          {services.map((service) => (
            <ServiceCard
              key={service.objectId}
              service={service}
              persons={personsForService(service, persons)}
              images={images}
            />
          ))}
        </div>
        <div className={styles.footer}>
          <SliderControls
            onPrev={() => scrollByCard(-1)}
            onNext={() => scrollByCard(1)}
            canPrev={!edges.start}
            canNext={!edges.end}
          />
          <button type="button" onClick={() => navigate({ to: "/leistungen" })}>
            Alle Leistungen
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;
