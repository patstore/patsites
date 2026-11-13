import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineClockCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { RiBuilding3Line } from "react-icons/ri";
import { Image } from "@repo/ui";
import { Label, contentBlockStyles } from "@ui";
import { getWeekday, locationLabel, useCollection } from "@provider";
import type { EventTime, PatstoreEntry, PatstoreGroup } from "@types";
import { findTrainingGroup } from "./findTrainingGroup";
import JobSlideIn from "./JobSlideIn";
import styles from "./JobElement.module.css";

const WEEKDAY_ORDER: EventTime["weekday"][] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const ageLabel = (group: PatstoreGroup) => {
  const startAge = Number(group.data?.start_age);
  if (!startAge) return "";
  const endAge =
    group.data?.end_age == null || group.data?.end_age === ""
      ? null
      : Number(group.data.end_age);
  if (startAge >= 18) return "Erwachsene";
  if (endAge == null || Number.isNaN(endAge)) return `Ab ${startAge} Jahren`;
  return `Von ${startAge} bis ${endAge} Jahre`;
};

const unique = (labels: Array<string | null | undefined>) => {
  const seen = new Set<string>();
  return labels.filter((label): label is string => {
    const text = label?.trim();
    if (!text || seen.has(text)) return false;
    seen.add(text);
    return true;
  });
};

const JobElement: React.FC<{ job: PatstoreEntry }> = ({ job }) => {
  const { items: groups } = useCollection("Group");
  const { find: findCategory } = useCollection("Category");
  const { find: findLocation } = useCollection("Location");
  const { find: findPerson } = useCollection("Person");
  const { find: findImage } = useCollection("Image");
  const [open, setOpen] = useState(false);

  const group = findTrainingGroup(job, groups);
  const contact = findPerson(job.contact);
  const imageId = [group?.team?.image, group?.image].find((id) => Boolean(id && findImage(id)));
  const categoryIds = group?.categories?.length ? group.categories : (job.categories ?? []);
  const tags = unique([
    ...categoryIds.map((id) => findCategory(id)?.title),
    group ? ageLabel(group) : "",
  ]).filter((label) => label !== "Jobbörse");
  const times = [...(group?.times ?? [])].sort((a, b) => {
    const day = WEEKDAY_ORDER.indexOf(a.weekday) - WEEKDAY_ORDER.indexOf(b.weekday);
    return day || a.start.localeCompare(b.start);
  });

  return (
    <>
      <button
        type="button"
        className={styles.card}
        id={job.objectId}
        onClick={() => setOpen(true)}
      >
        {imageId ? (
          <div className={styles.image}>
            <Image
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt={group?.title || job.title || ""}
              id={imageId}
            />
          </div>
        ) : null}
        <div className={styles.info}>
          {group?.title ? <Label text={group.title} /> : null}
          <h3 className={styles.title}>{job.title}</h3>
          {tags.length > 0 ? (
            <div className={contentBlockStyles.tags}>
              {tags.map((tag) => (
                <span key={tag} className={contentBlockStyles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {times.map((time) => {
            const place = locationLabel(time.place, findLocation);
            return (
              <div key={time.id}>
                <p className={styles.infoRow}>
                  <AiOutlineClockCircle className={styles.infoIcon} />
                  <span>
                    {getWeekday(time.weekday)}
                    {time.start && time.end ? ` ${time.start} – ${time.end}` : ""}
                  </span>
                </p>
                {place ? (
                  <p className={styles.infoRow}>
                    <RiBuilding3Line className={styles.infoIcon} />
                    <span>{place}</span>
                  </p>
                ) : null}
              </div>
            );
          })}
          {job.description ? (
            <p className={styles.infoRow}>
              <AiOutlineInfoCircle className={styles.infoIcon} />
              <span>{job.description}</span>
            </p>
          ) : null}
        </div>
        <span className={styles.arrow} aria-hidden>
          <AiOutlineArrowRight size={16} />
        </span>
      </button>
      <JobSlideIn
        job={job}
        group={group}
        contact={contact}
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

export default React.memo(JobElement);
