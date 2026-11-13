import React from "react";
import { TrainingTimesSlideInProps } from "../types";
import { sidebarElement } from "../../Sidebar";

const TrainingTimesSlideIn: React.FC<TrainingTimesSlideInProps> = ({
  weekday,
  start,
  end,
  location,
  text,
}) => (
  <div id="training">
    <div css={sidebarElement}>
      <h6>
        {weekday} {start && end && `${start} - ${end}`}
      </h6>
      {text && <p css={{ fontSize: "0.8rem", fontWeight: 500 }}>{text}</p>}
      {location && <p>{location}</p>}
    </div>
  </div>
);

export default TrainingTimesSlideIn;
