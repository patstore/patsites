import React, { useState } from "react";
import { AiOutlineClockCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri";
import settings from "@settings";
import { FlexBox, FullButton, Image, Label } from "@ui";
import { useFindImages, useGetGroup, useGetPerson } from "@provider";
import { PatstoreEntry } from "@types";
import {
  trainingElement,
  trainingElementuttonContainer,
  trainingImage,
} from "../../../ui/SportCalendar/content/WeekDay/styles";
import JobSlideIn from "./JobSlideIn";

const iconStyle = { marginRight: ".3rem", minWidth: "18px" };

const JobElement: React.FC<{ job: PatstoreEntry }> = ({ job }) => {
  const { findGroup } = useGetGroup();
  const { findPerson } = useGetPerson();
  const { findImage, findImageUrl } = useFindImages();
  const [modalState, setModalState] = useState(false);

  const group = findGroup(job.group);
  const contact = findPerson(job.contact);
  const imageId = [group?.team?.image, group?.image].find((id) => findImageUrl(id));
  const image = imageId ? findImage(imageId) : null;

  return (
    <>
      <div css={trainingElement}>
        <FlexBox
          direction="column"
          align="stretch"
          justify="flex-start"
          gap={settings.sizes.medium}
        >
          <div css={trainingImage}>
            {image ? (
              <Image alt={group?.title} image={image} />
            ) : (
              <div
                css={{
                  width: "100%",
                  height: "150px",
                  backgroundColor: settings.colors.grey,
                }}
              />
            )}
          </div>
          <FlexBox
            direction="column"
            align="flex-start"
            justify="center"
            gap={settings.sizes.small}
            styles={{ padding: settings.padding.small }}
          >
            {group?.title && <Label text={group.title} />}
            <h4>{job.title}</h4>
            <div>
              <p css={{ fontWeight: 600, maxWidth: "240px" }}>
                <span css={iconStyle}>
                  <AiOutlineClockCircle />
                </span>
                {job.time || "-"}
              </p>
            </div>
            {group?.title && (
              <div>
                <p css={{ fontWeight: 600, maxWidth: "240px" }}>
                  <span css={iconStyle}>
                    <RiTeamLine />
                  </span>{" "}
                  {group.title}
                </p>
              </div>
            )}
            {job.description && (
              <div>
                <p>
                  <span
                    css={{ color: settings.colors.primary, marginRight: ".3rem" }}
                  >
                    <AiOutlineInfoCircle />
                  </span>{" "}
                  {job.description}
                </p>
              </div>
            )}
          </FlexBox>
        </FlexBox>
        <div css={trainingElementuttonContainer}>
          <FullButton
            text="mehr Infos"
            color="primary"
            onClick={() => setModalState(true)}
          />
        </div>
      </div>
      <JobSlideIn
        job={job}
        group={group}
        contact={contact}
        open={modalState}
        onClose={() => setModalState(false)}
      />
    </>
  );
};

export default React.memo(JobElement);
