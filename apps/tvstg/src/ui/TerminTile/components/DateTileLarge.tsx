import React from "react";

import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineHome,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import settings from "@settings";
import { dateContainer, dateHeader, innerContainer } from "../styles";
import { DateTileLargeProps } from "../types";
import { FlexBox } from "../../FlexBox";
import { getDateString, useFindCategories } from "@provider";
import { Label } from "../../Label";

const DateTileLarge: React.FC<DateTileLargeProps> = ({
  title,
  date,
  location,
  description,
  categories,
}) => {
  const { findCategories } = useFindCategories();

  return (
    <div css={dateContainer}>
      <FlexBox direction="column" align="flex-start" justify="space-between">
        <FlexBox
          direction="row"
          align="center"
          justify="space-between"
          hasFullWidth
          styles={dateHeader}
        >
          <h4>
            <AiOutlineCalendar
              css={{
                fontSize: "1em",
                marginRight: "0.3rem",
                color: settings.colors.white,
              }}
            />{" "}
            {getDateString(date).date}
          </h4>
          <h4>
            <AiOutlineClockCircle
              css={{
                fontSize: "1em",
                marginRight: "0.3rem",
                color: settings.colors.white,
              }}
            />
            {getDateString(date).time}
          </h4>
        </FlexBox>
        <div css={innerContainer}>
          <div>
            {categories &&
              findCategories(categories) &&
              findCategories(categories).map((category) => (
                <Label text={category?.title || ""} />
              ))}
            <h3>{title}</h3>
          </div>
          {location && (
            <div>
              <p>
                <AiOutlineHome
                  css={{
                    fontSize: "1em",
                    marginRight: "0.3rem",
                    color: settings.colors.primary,
                  }}
                />
                {location}
              </p>
            </div>
          )}
          {description && (
            <div css={{ maxWidth: "300px" }}>
              <p>
                <AiOutlineInfoCircle
                  css={{
                    fontSize: "1em",
                    marginRight: "0.3rem",
                    color: settings.colors.primary,
                  }}
                />
                {description}
              </p>
            </div>
          )}
        </div>
      </FlexBox>
    </div>
  );
};

export default DateTileLarge;
