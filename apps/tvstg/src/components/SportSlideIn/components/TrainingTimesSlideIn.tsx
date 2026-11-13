import React from "react";
import { TrainingTimesSlideInProps } from "../types";
import styles from "./TrainingTimesSlideIn.module.css";

const TrainingTimesSlideIn: React.FC<TrainingTimesSlideInProps> = ({
  weekday,
  start,
  end,
  location,
  text,
}) => (
  <div id="training">
    <div className="sidebar-panel">
      <h6>
        {weekday} {start && end && `${start} - ${end}`}
      </h6>
      {text && <p className={styles.note}>{text}</p>}
      {location && <p>{location}</p>}
    </div>
  </div>
);

export default TrainingTimesSlideIn;
