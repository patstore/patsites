import React, { useMemo } from "react";
import { getDateString, useFindCategories, useFindLocation } from "@provider";
import { PatstoreDate } from "@types";
import { AiOutlineInfoCircle } from "react-icons/ai";
import settings from "@settings";
import { FlexBox, Label } from "@ui";
import {
  eventCategory,
  eventDate,
  eventInfo,
  eventName,
  eventPlace,
  eventTime,
} from "../styles";

const EventElementTable: React.FC<{
  date: PatstoreDate;
  background?: string;
}> = ({ date, background }) => {
  const { findCategories } = useFindCategories();
  const { findLocation } = useFindLocation();

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
  }, []);

  return (
    <FlexBox
      changeToColumn
      direction="row"
      align="center"
      justify="space-between"
      styles={{ backgroundColor: background, padding: "12px" }}
      hasFullWidth
    >
      <div css={eventName}>
        <h3>{date.title}</h3>
      </div>
      <div css={eventCategory}>
        <FlexBox direction="row" gap={settings.sizes.small}>
          {findCategories(date.categories).map((category) => (
            <Label text={category.title || ""} />
          ))}
        </FlexBox>
      </div>
      <div css={[eventDate, { textAlign: "right" }]}>
        <p>{getDateString(date.date.start).date}</p>
      </div>
      <div css={eventTime}>
        <p>{renderTime}</p>
      </div>
      <div css={eventPlace}>
        <p>{findLocation(date.date.place)}</p>
      </div>
      <div css={eventInfo}>
        <div css={{ maxWidth: "300px" }}>
          <p>
            <AiOutlineInfoCircle
              css={{
                fontSize: "1em",
                marginRight: "0.3rem",
                color: settings.colors.primary,
              }}
            />
            <span css={{ fontSize: settings.fontSize.tiny }}>
              {date.description}
            </span>
          </p>
        </div>
      </div>
    </FlexBox>
  );
};

export default EventElementTable;
