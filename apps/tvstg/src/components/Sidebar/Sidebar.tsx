import { FC } from "react";
import "./sidebar.scss";
import News from "./components/News";
import Calendar from "./components/Calendar";
import RenderContent from "./components/RenderContent";
import Follow from "./components/Follow";
import { SidebarProps } from "./types";
import TrainingTimes from "./components/TrainingTimes";
import styles from "./Sidebar.module.css";

const Sidebar: FC<SidebarProps> = ({
  category,
  contentArray,
  showNews,
  showCalendar,
  showTraining,
  displayAllNews,
  displayAllEvents,
}) => (
  <div className={styles.content}>
    {showNews && <News category={category} displayAllNews={displayAllNews} />}
    {showCalendar && (
      <Calendar category={category} getAllEvents={displayAllEvents} />
    )}
    {showTraining && category && <TrainingTimes category={category} />}
    {contentArray && contentArray.length > 0 && (
      <RenderContent content={contentArray} />
    )}
    <Follow />
  </div>
);

export default Sidebar;
