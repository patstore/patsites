import React, { FC, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useCollection } from "@provider";
import { TrainingCalendarElementProps } from "../types";
import { SportSlideIn } from "@components";
import { Image } from "@repo/ui";
import { contentBlockStyles } from "../../../../ContentBlock";
import styles from "../WeekDay.module.css";

const TrainingCalendarElement: FC<TrainingCalendarElementProps> = ({
  training,
  view,
  striped = false,
}) => {
  const { find: findGroup } = useCollection("Group");
  const { find: findLocation } = useCollection("Location");
  const [modalState, setModalState] = useState(false);

  const group = findGroup(training.group_id);
  const groupLocation = findLocation(training.place.location);

  if (!group) {
    return null;
  }

  const isList = view === "list";
  const imageId = group.team?.image ?? group.image;
  const locationLabel = training.location || groupLocation?.title || "";
  const startAge = Number(group.data?.start_age);
  const endAge = group.data?.end_age == null || group.data?.end_age === ""
    ? null
    : Number(group.data.end_age);
  const ageLabel = !startAge
    ? ""
    : startAge >= 18
      ? "Erwachsene"
      : endAge == null
        ? `Ab ${startAge} Jahren`
        : `Von ${startAge} bis ${endAge} Jahre`;
  const tags = [
    locationLabel ? { key: "location", label: locationLabel } : null,
    ...training.categories.filter(Boolean).map((category) => ({
      key: `category-${category}`,
      label: category,
    })),
    ageLabel ? { key: "age", label: ageLabel } : null,
  ].filter((tag) => tag !== null);

  const openDetails = () => setModalState(true);
  const image = imageId ? (
    <Image
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
      alt={group.team?.name || group.title || undefined}
      id={imageId}
    />
  ) : null;

  const tagList = (
    <div className={contentBlockStyles.tags}>
      {tags.map((tag) => (
        <span key={tag.key} className={contentBlockStyles.tag}>
          {tag.label}
        </span>
      ))}
    </div>
  );

  if (!isList) {
    return (
      <>
        <button type="button" className={styles.cell} id={training.id} onClick={openDetails}>
          <div className={styles.gridImage}>{image}</div>
          <div className={styles.gridBody}>
            <div className={styles.timeBlock}>
              <p className={styles.clock}>
                {training.start && training.end ? `${training.start}` : "-"}
              </p>
              <p className={styles.until}>
                bis
                {training.start && training.end ? ` ${training.end}` : "-"}
              </p>
            </div>
            <div className={styles.info}>
              <h3 className={styles.title}>{group.title}</h3>
              {tagList}
            </div>
          </div>
          <span className={styles.gridArrow} aria-hidden>
            <AiOutlineArrowRight size={16} />
          </span>
        </button>
        <SportSlideIn
          group={group}
          setModalState={setModalState}
          modalState={modalState}
          location={groupLocation?.title || ""}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={[styles.listRow, striped ? contentBlockStyles.striped : ""].filter(Boolean).join(" ")}
        id={training.id}
      >
        <div className={styles.listCells}>
          <div className={styles.listTime}>
            <p className={contentBlockStyles.strong}>
              {training.start && training.end ? `${training.start}` : "-"}
            </p>
            <p className={contentBlockStyles.muted}>
              bis
              {training.start && training.end ? ` ${training.end}` : "-"}
            </p>
          </div>
          <div className={styles.listImage}>{image}</div>
          <div className={`${styles.info} ${styles.listTitle}`}>
            <h3 className={styles.title}>{group.title}</h3>
            {tagList}
          </div>
        </div>
        <button type="button" onClick={openDetails} className={styles.listButton}>
          <AiOutlineArrowRight size={16} />
        </button>
      </div>
      <SportSlideIn
        group={group}
        setModalState={setModalState}
        modalState={modalState}
        location={groupLocation?.title || ""}
      />
    </>
  );
};

export default React.memo(TrainingCalendarElement);
