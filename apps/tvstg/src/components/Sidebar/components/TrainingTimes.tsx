import React, { useMemo, useState } from "react";
import { RiBuilding3Line } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { locationLabel, useCollection } from "@provider";
import { Button, FlexBox } from "@ui";
import { PatstoreGroup } from "@types";
import { SportSlideIn } from "../../SportSlideIn";
import styles from "./TrainingTimes.module.css";

const TrainingElement: React.FC<{ training: PatstoreGroup }> = ({
  training,
}) => {
  const [modalState, setModalState] = useState(false);
  const { find: findLocation } = useCollection("Location");

  return (
    <div key={training.objectId} className="sidebar-panel">
      <div className={styles.meta}>
        <h3>{training.title}</h3>
      </div>
      <FlexBox direction="column" gap=".6rem">
        {training.times?.length > 0 &&
          training.times.map((trainingszeit: PatstoreGroup["times"][number]) => (
            <div key={trainingszeit.id}>
              <p className={styles.row}>
                <span className={styles.icon}>
                  <AiOutlineClockCircle />
                </span>
                {`${trainingszeit.weekday}: `}
                {trainingszeit.start &&
                  trainingszeit.end &&
                  `${trainingszeit.start} - ${trainingszeit.end}`}
              </p>
              <p>
                <span className={styles.icon}>
                  <RiBuilding3Line />
                </span>
                {locationLabel(trainingszeit.place, findLocation)}
              </p>
            </div>
          ))}
      </FlexBox>
      <div className={styles.action}>
        <Button
          size="small"
          color="dark"
          text="mehr Infos"
          onClick={() => setModalState(!modalState)}
        />
      </div>
      <SportSlideIn
        group={training}
        modalState={modalState}
        setModalState={setModalState}
        location=""
        key={training.objectId}
      />
    </div>
  );
};

const TrainingTimes = ({ category }: { category: string }) => {
  const { items: groups } = useCollection("Group");

  const traininigsGruppen = useMemo(() => {
    let trainingsgruppenArray: PatstoreGroup[] = [];
    let showButton = false;

    if (groups) {
      groups.forEach((group) => {
        if (group?.categories?.includes(category)) {
          trainingsgruppenArray.push(group);
        }
      });
    }

    return {
      trainingsgruppenArray,
      showButton,
    };
  }, [groups]);

  return (
    <>
      <div className="section-header flush">Trainingsgruppen</div>
      <div className={styles.list}>
        {traininigsGruppen.trainingsgruppenArray.map((trainingsgruppe) => (
          <TrainingElement
            training={trainingsgruppe}
            key={trainingsgruppe.objectId}
          />
        ))}
      </div>
    </>
  );
};

export default TrainingTimes;
