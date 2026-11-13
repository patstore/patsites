import React, { useMemo } from "react";
import { InformationProps } from "../types";
import { ContactPerson, FlexBox } from "@ui";
import { getWeekday, locationLabel, useCollection } from "@provider";
import { PatstorePerson } from "@types";
import { Image } from "@repo/ui";
import TrainingTimesSlideIn from "./TrainingTimesSlideIn";
import styles from "./Information.module.css";

export const Information: React.FC<InformationProps> = ({
  titel,
  trainingszeiten,
  team,
  beschreibung,
  startalter,
  endalter,
  email,
  info,
  trainer,
  type,
}) => {
  const { items: persons } = useCollection("Person");
  const { find: findLocation } = useCollection("Location");

  const groupData = useMemo(() => {
    let alterText = "";
    if (startalter >= 18) {
      alterText = "Erwachsene";
    } else if (startalter > 1 && endalter === null)
      alterText = `Ab ${startalter} Jahren`;
    else {
      alterText = `Von ${startalter} bis ${endalter} Jahre`;
    }
    const trainerArray: PatstorePerson[] = trainer
      ? persons.filter((person) => trainer.some((ul) => ul === person.objectId))
      : [];

    return {
      trainers: trainerArray || [],
      alter: alterText,
    };
  }, []);

  return (
    <>
      <div>
        <FlexBox
          direction="column"
          align="stretch"
          style={{ padding: "3em 0" }}
        >
          <h1 className={styles.title}>{titel}</h1>
          {email && (
            <div className={styles.full}>
              <div className="section-header">Kontakt</div>
              <div className={styles.inset}>
                <div className="sidebar-panel">
                  <h3>Kontakt E-Mail</h3>

                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
            </div>
          )}
          <div className="section-header">Übungsleiter*innen</div>
          <div className={styles.inset}>
            {groupData.trainers.map((person: PatstorePerson) => (
              <ContactPerson person={person} key={person.objectId} />
            ))}
          </div>
        </FlexBox>
      </div>
      {startalter && (
        <div className={styles.clip}>
          <div className="section-header">Alter</div>
          <div className={styles.insetNarrow}>
            <p>{groupData.alter}</p>
          </div>
        </div>
      )}
      {info && (
        <div className={styles.clip}>
          <div className="section-header">Info</div>
          <div className={styles.insetNarrow}>
            <p>{info}</p>
          </div>
        </div>
      )}
      {beschreibung && (
        <div>
          <div className="section-header">Beschreibung</div>
          <div dangerouslySetInnerHTML={{ __html: beschreibung }} />
        </div>
      )}
      <div className={styles.clipAuto}>
        <div className="section-header">Trainingszeiten</div>
        {trainingszeiten.map((value) => (
          <TrainingTimesSlideIn
            key={value.id}
            weekday={getWeekday(value.weekday)}
            start={value.start}
            end={value.end}
            location={locationLabel(value.place, findLocation) || ""}
            text={value.text || ""}
          />
        ))}
      </div>
      <div>
        {type === "mobile" && team && (
          <div>
            <div className="section-header">Die Mannschaft</div>
            <FlexBox direction="column" style={{ marginTop: "3em" }}>
              {team.image && (
                <Image
                  alt={titel}
                  id={team.image}
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    maxHeight: "30em",
                  }}
                />
              )}

              <FlexBox
                direction="column"
                align="flex-start"
                justify="flex-end"
                style={{ height: "100%", padding: "0.5em 2em" }}
              >
                <div>
                  {team.description && (
                    <div
                      dangerouslySetInnerHTML={{ __html: team.description }}
                    />
                  )}
                </div>
              </FlexBox>
            </FlexBox>
          </div>
        )}
      </div>
    </>
  );
};

export default Information;
