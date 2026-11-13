import React from "react";
import { ContactPerson, FlexBox, SlideIn } from "@ui";
import { sectionHeader } from "@styles";
import type { PatstoreEntry, PatstoreGroup, PatstorePerson } from "@types";
import Information from "../../../components/SportSlideIn/components/Information";

type JobSlideInProps = {
  job: PatstoreEntry;
  group?: PatstoreGroup;
  contact?: PatstorePerson;
  open: boolean;
  onClose: () => void;
};

const section = { padding: "0 1em" };

const numberOrNull = (value: unknown) => {
  if (value == null || value === "") return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const groupTeam = (group: PatstoreGroup) => {
  const team = group.team;
  if (!team?.image && !team?.description && !team?.name) return undefined;
  return team;
};

const JobSlideIn: React.FC<JobSlideInProps> = ({ job, group, contact, open, onClose }) => {
  const startAge = numberOrNull(group?.data?.start_age);
  const description =
    group?.text ||
    (typeof group?.data?.description === "string" ? group.data.description : "") ||
    "";
  const email = typeof group?.data?.contact === "string" ? group.data.contact : "";

  return (
    <SlideIn open={open} cancelButtonHandler={onClose}>
      <FlexBox direction="column" align="stretch" styles={{ padding: "3em 0 0" }}>
        <h1 css={{ padding: "0.5em", fontSize: "1.8rem" }}>{job.title}</h1>
      </FlexBox>
      {job.description ? (
        <div>
          <div css={sectionHeader}>Info</div>
          <div css={section}>
            <p>{job.description}</p>
          </div>
        </div>
      ) : null}
      {job.time ? (
        <div>
          <div css={sectionHeader}>Zeit</div>
          <div css={section}>
            <p>{job.time}</p>
          </div>
        </div>
      ) : null}
      {job.text ? (
        <div>
          <div css={sectionHeader}>Beschreibung</div>
          <div css={section} dangerouslySetInnerHTML={{ __html: job.text }} />
        </div>
      ) : null}
      {contact ? (
        <div>
          <div css={sectionHeader}>Kontakt</div>
          <div css={section}>
            <ContactPerson person={contact} />
          </div>
        </div>
      ) : null}
      {group ? (
        <Information
          email={email}
          startalter={startAge ?? 0}
          endalter={numberOrNull(group.data?.end_age)}
          beschreibung={description}
          titel={group.title || ""}
          team={groupTeam(group)}
          trainingszeiten={group.times ?? []}
          info={group.description || ""}
          trainer={group.persons ?? []}
          type="mobile"
        />
      ) : null}
    </SlideIn>
  );
};

export default JobSlideIn;
