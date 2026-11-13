import React, { useState } from "react";
import { AiOutlineArrowRight, AiOutlineClockCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { RiBuilding3Line } from "react-icons/ri";
import { Image } from "@repo/ui";
import { Label } from "@ui";
import { getWeekday, useCollection, useFindImages } from "@provider";
import type { EventTime, PatstoreEntry, PatstoreGroup } from "@types";
import {
  trainingCardInfo,
  trainingGridArrow,
  trainingGridTags,
  trainingImageGrid,
  trainingTag,
} from "../../../ui/SportCalendar/content/WeekDay/styles";
import { findTrainingGroup } from "./findTrainingGroup";
import JobSlideIn from "./JobSlideIn";
import { jobCard, jobInfoIcon, jobInfoRow } from "./styles";

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
  const { findImageUrl } = useFindImages();
  const [open, setOpen] = useState(false);

  const group = findTrainingGroup(job, groups);
  const contact = findPerson(job.contact);
  const imageId = [group?.team?.image, group?.image].find((id) => findImageUrl(id));
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
        css={jobCard}
        id={job.objectId}
        onClick={() => setOpen(true)}
      >
        {imageId ? (
          <div css={trainingImageGrid}>
            <Image
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt={group?.title || job.title || ""}
              id={imageId}
            />
          </div>
        ) : null}
        <div css={[trainingCardInfo, { flex: "1 1 auto", minWidth: 0, width: "100%" }]}>
          {group?.title ? <Label text={group.title} /> : null}
          <h3 css={{ fontSize: "1.2rem", margin: 0 }}>{job.title}</h3>
          {tags.length > 0 ? (
            <div css={trainingGridTags}>
              {tags.map((tag) => (
                <span key={tag} css={trainingTag}>
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
          {times.map((time) => {
            const place = findLocation(time.place?.location)?.title;
            return (
              <div key={time.id}>
                <p css={jobInfoRow}>
                  <AiOutlineClockCircle css={jobInfoIcon} />
                  <span>
                    {getWeekday(time.weekday)}
                    {time.start && time.end ? ` ${time.start} – ${time.end}` : ""}
                  </span>
                </p>
                {place ? (
                  <p css={jobInfoRow}>
                    <RiBuilding3Line css={jobInfoIcon} />
                    <span>{place}</span>
                  </p>
                ) : null}
              </div>
            );
          })}
          {job.description ? (
            <p css={jobInfoRow}>
              <AiOutlineInfoCircle css={jobInfoIcon} />
              <span>{job.description}</span>
            </p>
          ) : null}
        </div>
        <span css={trainingGridArrow} aria-hidden>
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
