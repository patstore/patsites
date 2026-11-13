import React, { useMemo } from "react";
import { getDateString, locationLabel, slugify, useCollection } from "@provider";
import { PatstoreDate } from "@types";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { FlexBox, Label, contentBlockStyles } from "@ui";
import styles from "../Termine.module.css";

const EventElementTable: React.FC<{
  date: PatstoreDate;
  striped?: boolean;
}> = ({ date, striped = false }) => {
  const { find: findCategory } = useCollection("Category");
  const { find: findLocation } = useCollection("Location");

  const renderTime = useMemo(() => {
    if (date.date.start && date.date.end) {
      return `${getDateString(date.date.start).time} - ${getDateString(date.date.end).time}`;
    } else if (date.date.start) {
      return getDateString(date.date.start).time;
    } else if (date.date.end) {
      return `bis ${getDateString(date.date.end).time}`;
    } else {
      return "";
    }
  }, [date]);

  const anchorId = slugify(date.title ?? date.objectId ?? "");
  const place = locationLabel(date.date.place, findLocation);

  return (
    <div id={anchorId} className={styles.anchor}>
      <FlexBox
        className={[styles.row, striped ? contentBlockStyles.striped : ""].filter(Boolean).join(" ")}
        changeToColumn
        direction="row"
        align="center"
        justify="space-between"
        hasFullWidth
      >
        <div className={`${styles.col} ${styles.name}`}>
          <h3>{date.title}</h3>
        </div>
        <div className={`${styles.col} ${styles.category}`}>
          <FlexBox direction="row" gap="6px">
            {date.categories.map((categoryId) => {
              const category = findCategory(categoryId);
              if (!category?.title) {
                return null;
              }
              return <Label key={categoryId} text={category.title} />;
            })}
          </FlexBox>
        </div>
        <div className={`${styles.col} ${styles.date} ${styles.dateValue}`}>
          <p>{getDateString(date.date.start).date}</p>
        </div>
        <div className={`${styles.col} ${styles.time}`}>
          <p>{renderTime}</p>
        </div>
        <div className={`${styles.col} ${styles.place}`}>
          <p>{place}</p>
        </div>
        <div className={`${styles.col} ${styles.info}`}>
          <div className={styles.note}>
            <p>
              <AiOutlineInfoCircle className={styles.noteIcon} />
              <span className={styles.noteText}>{date.description}</span>
            </p>
          </div>
        </div>
      </FlexBox>
    </div>
  );
};

export default EventElementTable;
