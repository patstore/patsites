import { AiOutlineCalendar, AiOutlineClockCircle, AiOutlineHome } from "react-icons/ai";
import { getDateString, useCollection } from "@provider";
import { contentBlockStyles } from "../../ContentBlock";
import { FlexBox } from "../../FlexBox";
import { DateTileSmallProps } from "../types";
import styles from "../TerminTile.module.css";

const TerminTileSmall = ({ title, date, location, categories }: DateTileSmallProps) => {
  const { find: findCategory } = useCollection("Category");
  const when = getDateString(date);

  return (
    <div className="sidebar-panel">
      <FlexBox direction="column" gap="6px">
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
        <div>
          <h4>{title}</h4>
        </div>

        <div className={styles.stack}>
          <p>
            <AiOutlineCalendar className={styles.icon} /> {when.date}
          </p>
          <p>
            <AiOutlineClockCircle className={styles.icon} />
            {when.time}
          </p>
          {location && (
            <p>
              <AiOutlineHome className={styles.icon} />
              {location}
            </p>
          )}
        </div>
      </FlexBox>
    </div>
  );
};

export default TerminTileSmall;
