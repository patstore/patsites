import React from "react";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineHome,
} from "react-icons/ai";
import settings from "@settings";
import { DateTileSmallProps } from "../types";
import { sidebarelement } from "@components";
import { FlexBox, Label } from "@ui";
import { getDateString, useFindCategories } from "@provider";

const TerminTileSmall: React.FC<DateTileSmallProps> = ({
  title,
  date,
  location,
  categories,
}) => {
  const { findCategories } = useFindCategories();

  return (
    <div css={sidebarelement}>
      <FlexBox direction="column" gap={settings.sizes.small}>
        {categories &&
          findCategories(categories).map((category) => (
            <Label text={category?.title || ""} />
          ))}
        <div>
          <h4>{title}</h4>
        </div>

        <FlexBox
          direction="column"
          align="flex-start"
          gap={settings.sizes.small}
          wrap
        >
          <p>
            <AiOutlineCalendar
              css={{
                fontSize: "1em",
                marginRight: "0.3rem",
                color: settings.colors.primary,
              }}
            />{" "}
            {getDateString(date).date}
          </p>
          <p>
            <AiOutlineClockCircle
              css={{
                fontSize: "1em",
                marginRight: "0.3rem",
                color: settings.colors.primary,
              }}
            />
            {getDateString(date).time}
          </p>
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
        </FlexBox>
      </FlexBox>
    </div>
  );
};

export default TerminTileSmall;
