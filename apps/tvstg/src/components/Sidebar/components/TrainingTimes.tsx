import React, { useCallback, useMemo, useState } from "react";
import { RiBuilding3Line } from "react-icons/ri";
import { AiOutlineClockCircle } from "react-icons/ai";
import { sidebarelement, sidebarHeader } from "../styles";
import { useCollection } from "@provider";
import { Button, FlexBox } from "@ui";
import { PatstoreGroup, PatstoreLocation } from "@types";
import { SportSlideIn } from "../../SportSlideIn";

const TrainingElement: React.FC<{ training: PatstoreGroup }> = ({
  training,
}) => {
  const [modalState, setModalState] = useState(false);
  const { items: locations } = useCollection("Location");
  const getTrainingLocations: (
    time: PatstoreGroup["times"][number],
  ) => PatstoreLocation | null | undefined = useCallback(
    (time: PatstoreGroup["times"][number]) => {
      if (!locations) {
        return undefined;
      }
      const location = locations.find(
        (location) => location.objectId === time.place.location,
      );
      return location;
    },
    [training, locations],
  );

  return (
    <div key={training.objectId} css={sidebarelement}>
      <div
        css={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "0",
          padding: "0.6rem 0",
        }}
      >
        <h3>{training.title}</h3>
      </div>
      <FlexBox direction="column" gap=".6rem">
        {training.times?.length > 0 &&
          training.times.map((trainingszeit: PatstoreGroup["times"][number]) => (
            <div key={trainingszeit.id}>
              <p
                css={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <span css={{ marginRight: ".3rem", minWidth: "18px" }}>
                  <AiOutlineClockCircle />
                </span>
                {`${trainingszeit.weekday}: `}
                {trainingszeit.start &&
                  trainingszeit.end &&
                  `${trainingszeit.start} - ${trainingszeit.end}`}
              </p>
              {/* <div css={{width: "100%", height: "1px", backgroundColor: grey}} /> */}
              <p>
                <span css={{ marginRight: ".3rem", minWidth: "18px" }}>
                  <RiBuilding3Line />
                </span>
                {getTrainingLocations(trainingszeit)?.title}
              </p>
            </div>
          ))}
      </FlexBox>
      <div css={{ marginTop: ".6rem" }}>
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
      <div css={sidebarHeader}>Trainingsgruppen</div>
      <div css={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
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
