import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineHome, AiOutlineInfoCircle } from "react-icons/ai";
import { getDateString, useCollection } from "@provider";
import { contentBlockStyles } from "../../ContentBlock";
import { FlexBox } from "../../FlexBox";
import { DateTileLargeProps } from "../types";
import styles from "../TerminTile.module.css";

const DateTileLarge = ({ title, date, location, description, categories }: DateTileLargeProps) => {
  const { find: findCategory } = useCollection("Category");
  const when = getDateString(date);

  return (
    <div className={`${contentBlockStyles.block} ${styles.large}`}>
      <FlexBox direction="column" align="flex-start" justify="space-between">
        <FlexBox
          direction="row"
          align="center"
          justify="space-between"
          hasFullWidth
          className={styles.header}
        >
          <h4>
            <AiOutlineCalendar className={`${styles.icon} ${styles.iconOnPrimary}`} /> {when.date}
          </h4>
          <h4>
            <AiOutlineClockCircle className={`${styles.icon} ${styles.iconOnPrimary}`} />
            {when.time}
          </h4>
        </FlexBox>
        <div className={styles.inner}>
          <div>
            {categories && categories.length > 0 ? (
              <div className={contentBlockStyles.tags}>
                {categories.map((id) => {
                  const label = findCategory(id)?.title;
                  if (!label) {
                    return null;
                  }
                  return (
                    <span key={id} className={contentBlockStyles.tag}>
                      {label}
                    </span>
                  );
                })}
              </div>
            ) : null}
            <h3>{title}</h3>
          </div>
          {location && (
            <p>
              <AiOutlineHome className={styles.icon} />
              {location}
            </p>
          )}
          {description && (
            <div className={styles.description}>
              <p>
                <AiOutlineInfoCircle className={styles.icon} />
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
