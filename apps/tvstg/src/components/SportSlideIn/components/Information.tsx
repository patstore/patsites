import React, { useMemo } from "react";
import { InformationProps } from "../types";
import { ContactPerson, FlexBox } from "@ui";
import {
  getWeekday,
  useFindImages,
  useGetLocation,
  useGetPerson,
} from "@provider";
import { PatstorePerson } from "@types";
import { sidebarelement } from "../../Sidebar/styles";
import TrainingTimesSlideIn from "./TrainingTimesSlideIn";
import { sectionHeader } from "@styles";
import { Image } from "@ui";

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
  const { persons } = useGetPerson();
  const { findImage } = useFindImages();
  const { findLocation } = useGetLocation();

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
          styles={{ padding: "3em 0" }}
        >
          <h1 css={{ padding: "0.5em", fontSize: "1.8rem" }}>{titel}</h1>
          {email && (
            <div css={{ width: "100%" }}>
              <div css={sectionHeader}>Kontakt</div>
              <div css={{ padding: "0 1em", width: "100%" }}>
                <div css={sidebarelement}>
                  <h3>Kontakt E-Mail</h3>

                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>
            </div>
          )}
          <div css={sectionHeader}>Übungsleiter*innen</div>
          <div css={{ padding: "0 1em", width: "100%" }}>
            {groupData.trainers.map((person: PatstorePerson) => (
              <ContactPerson person={person} key={person.objectId} />
            ))}
          </div>
        </FlexBox>
      </div>
      {startalter && (
        <div css={{ height: "auto", overflowY: "hidden" }}>
          <div css={sectionHeader}>Alter</div>
          <div css={{ padding: "0 1em" }}>
            <p>{groupData.alter}</p>
          </div>
        </div>
      )}
      {info && (
        <div css={{ height: "auto", overflowY: "hidden" }}>
          <div css={sectionHeader}>Info</div>
          <div css={{ padding: "0 1em" }}>
            <p>{info}</p>
          </div>
        </div>
      )}
      {beschreibung && (
        <div>
          <div css={sectionHeader}>Beschreibung</div>
          <div dangerouslySetInnerHTML={{ __html: beschreibung }} />
        </div>
      )}
      <div css={{ overflowY: "hidden" }}>
        <div css={sectionHeader}>Trainingszeiten</div>
        {trainingszeiten.map((value) => (
          <TrainingTimesSlideIn
            key={value.id}
            weekday={getWeekday(value.weekday)}
            start={value.start}
            end={value.end}
            location={findLocation(value?.place?.location as string)?.title || ""}
            text={value.text ||  ""}
          />
        ))}
      </div>
      <div>
        {type === "mobile" && team && (
          <div>
            <div css={sectionHeader}>Die Mannschaft</div>
            <FlexBox direction="column" styles={{ marginTop: "3em" }}>
              {team.image && (
                <Image
                  alt={titel}
                  css={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    maxHeight: "30em",
                  }}
                  image={findImage(team.image)}
                />
              )}

              <FlexBox
                direction="column"
                align="flex-start"
                justify="flex-end"
                styles={{ height: "100%", padding: "0.5em 2em" }}
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
