import { FC } from "react";
import {
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineHome,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import { getDateString } from "@provider";
import { FlexBox } from "../../FlexBox";
import { DateTileMediumProps } from "../types";
import styles from "../TerminTile.module.css";

const TerminTileMedium: FC<DateTileMediumProps> = ({ title, date, description, location }) => {
  const when = getDateString(date);

  return (
    <div className="sidebar-panel">
      <FlexBox direction="column" gap="6px">
        <div>
          <h4>{title}</h4>
        </div>
        <p>
          <AiOutlineCalendar className={styles.icon} /> {when.date}
        </p>
        <p>
          <AiOutlineClockCircle className={styles.icon} />
          {when.time}
        </p>
        {description && (
          <p>
            <AiOutlineInfoCircle className={styles.icon} />
            {description}
          </p>
        )}
        {location && (
          <p>
            <AiOutlineHome className={styles.icon} />
            {location}
          </p>
        )}
      </FlexBox>
    </div>
  );
};

export default TerminTileMedium;
