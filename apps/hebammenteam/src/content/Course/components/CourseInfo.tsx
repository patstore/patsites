import "@data";
import type { EventClass, ImageClass, LocationClass, PersonClass } from "@data";
import { isDraftMode, loadStaticRecords } from "@repo/server";
import styles from "../Course.module.css";

const recordStates = isDraftMode() ? null : (["published"] as const);

const WEEKDAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

type Weekday = (typeof WEEKDAYS)[number];

type TimeEntry = {
  id?: string;
  start?: string | null;
  end?: string | null;
  text?: string | null;
};

type TimeSlot = TimeEntry & {
  weekday?: string | null;
  day?: string | null;
  times?: TimeEntry[] | null;
};

type CourseEvent = EventClass & {
  generatedTimes?: TimeSlot[] | null;
};

const isWeekday = (value: string): value is Weekday =>
  (WEEKDAYS as readonly string[]).includes(value);

const germanWeekday = (day: Weekday) => {
  const date = new Date(Date.UTC(2024, 0, 1 + WEEKDAYS.indexOf(day)));
  return date.toLocaleDateString("de-DE", { weekday: "long", timeZone: "UTC" });
};

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

const timeLabel = (entry: TimeEntry) => [entry.start, entry.end].filter(Boolean).join(" – ");

const scheduleFor = (event: CourseEvent) => {
  const source = event.generatedTimes ?? event.times;
  const slots = Array.isArray(source) ? (source as TimeSlot[]) : [];
  const groups = new Map<Weekday, TimeEntry[]>();

  for (const slot of slots) {
    const day = (slot.weekday || slot.day || "").toLowerCase();
    if (!isWeekday(day)) {
      continue;
    }
    const entries = Array.isArray(slot.times) && slot.times.length > 0 ? slot.times : [slot];
    const list = groups.get(day) ?? [];
    list.push(...entries);
    groups.set(day, list);
  }

  return WEEKDAYS.filter((day) => groups.has(day)).map((day) => ({
    day,
    label: germanWeekday(day),
    times: groups.get(day) ?? [],
  }));
};

const peopleFor = (event: CourseEvent, persons: PersonClass[]) => {
  const byId = new Map(persons.map((person) => [person.objectId, person]));
  return (event.categories ?? []).flatMap((id) => {
    const person = byId.get(id);
    return person ? [person] : [];
  });
};

const CourseInfo = ({ event }: { event: CourseEvent }) => {
  const persons = loadStaticRecords<PersonClass>("Person", { states: recordStates });
  const images = loadStaticRecords<ImageClass>("Image", { states: null });
  const locations = loadStaticRecords<LocationClass>("Location", { states: recordStates });
  const people = peopleFor(event, persons);
  const location = locations.find((item) => item.objectId === event.location);
  const days = scheduleFor(event);
  const imagesById = new Map(images.map((image) => [image.objectId, image]));

  return (
    <div className={styles.info_container}>
      <h3 className={styles.info_title}>Kursinformationen</h3>
      {people.length > 0 ? (
        <section className={styles.info_block}>
          <h4 className={styles.info_label}>Team</h4>
          <ul className={styles.people}>
            {people.map((person) => {
              const name = person.label || person.title || "Hebamme";
              const src = portraitSrc(imagesById.get(person.image ?? ""));
              return (
                <li key={person.objectId} className={styles.person}>
                  {src ? (
                    <img className={styles.portrait} src={src} alt="" width={48} height={48} />
                  ) : null}
                  <p>{name}</p>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
      {location && (location.title || location.description) ? (
        <section className={styles.info_block}>
          <h4 className={styles.info_label}>Ort</h4>
          {location.title ? <p className={styles.location_title}>{location.title}</p> : null}
          {location.description ? (
            <p className={styles.location_text}>{location.description}</p>
          ) : null}
        </section>
      ) : null}
      {days.length > 0 ? (
        <section className={styles.info_block}>
          <h4 className={styles.info_label}>Zeiten</h4>
          <ul className={styles.days}>
            {days.map((day) => (
              <li key={day.day}>
                <p className={styles.day_name}>{day.label}</p>
                <ul className={styles.slots}>
                  {day.times.map((time, index) => {
                    const when = timeLabel(time);
                    return (
                      <li key={time.id || `${day.day}-${when}-${index}`} className={styles.slot}>
                        {when ? <span className={styles.slot_time}>{when}</span> : null}
                        {time.text ? <span className={styles.slot_text}>{time.text}</span> : null}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
};

export default CourseInfo;
