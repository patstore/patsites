import React from "react";
import { ContactPerson, FlexBox, SlideIn } from "@ui";
import { sectionHeader } from "@styles";
import { PatstoreEntry, PatstoreGroup, PatstorePerson } from "@types";

type JobSlideInProps = {
  job: PatstoreEntry;
  group?: PatstoreGroup;
  contact?: PatstorePerson;
  open: boolean;
  onClose: () => void;
};

const section = { padding: "0 1em" };

const JobSlideIn: React.FC<JobSlideInProps> = ({
  job,
  group,
  contact,
  open,
  onClose,
}) => (
  <SlideIn open={open} cancelButtonHandler={onClose}>
    <FlexBox direction="column" align="stretch" styles={{ padding: "3em 0 0" }}>
      <h1 css={{ padding: "0.5em", fontSize: "1.8rem" }}>{job.title}</h1>
    </FlexBox>
    {job.description && (
      <div>
        <div css={sectionHeader}>Info</div>
        <div css={section}>
          <p>{job.description}</p>
        </div>
      </div>
    )}
    {job.time && (
      <div>
        <div css={sectionHeader}>Zeit</div>
        <div css={section}>
          <p>{job.time}</p>
        </div>
      </div>
    )}
    {group?.title && (
      <div>
        <div css={sectionHeader}>Gruppe</div>
        <div css={section}>
          <p>{group.title}</p>
        </div>
      </div>
    )}
    {job.text && (
      <div>
        <div css={sectionHeader}>Beschreibung</div>
        <div css={section} dangerouslySetInnerHTML={{ __html: job.text }} />
      </div>
    )}
    {contact && (
      <div>
        <div css={sectionHeader}>Kontakt</div>
        <div css={section}>
          <ContactPerson person={contact} />
        </div>
      </div>
    )}
  </SlideIn>
);

export default JobSlideIn;
