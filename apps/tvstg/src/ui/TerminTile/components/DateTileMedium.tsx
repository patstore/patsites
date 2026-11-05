import { FC } from "react";

import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineHome,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import settings from "@settings";
import { FlexBox } from "../../FlexBox";
import { sidebarelement } from "@components";
import { DateTileMediumProps } from "../types";
import { getDateString } from "@provider";

const TerminTileMedium: FC<DateTileMediumProps> = ({
  title,
  date,
  description,
  location,
}) => (
  <div css={sidebarelement}>
    <FlexBox direction="column" gap={settings.sizes.small}>
      <div>
        <h4>{title}</h4>
      </div>
      <div>
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
      </div>
      <div>
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
      </div>
      {description && (
        <div>
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
  </div>
);

export default TerminTileMedium;
