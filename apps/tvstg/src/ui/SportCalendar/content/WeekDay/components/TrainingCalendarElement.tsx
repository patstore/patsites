import React, { FC, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import settings from "@settings";
import {
  listCells,
  trainingCardContent,
  trainingCardInfo,
  trainingElement,
  trainingElementuttonContainer,
  trainingGridTags,
  trainingImage,
  trainingListButton,
  trainingListCell,
  trainingListElement,
  trainingListImage,
  trainingListTags,
  trainingListTime,
  trainingListTitle,
  trainingTag,
  trainingTitleCell,
} from "../styles";
import { useFindImages, useCollection } from "@provider";
import { TrainingCalendarElementProps } from "../types";
import { SportSlideIn } from "@components";
import { Image } from "@ui";

const TrainingCalendarElement: FC<TrainingCalendarElementProps> = ({
  training,
  view,
  striped = false,
}) => {
  const { find: findGroup } = useCollection("Group");
  const { find: findLocation } = useCollection("Location");
  const { findImage, findImageUrl } = useFindImages();
  const [modalState, setModalState] = useState(false);

  const group = findGroup(training.group_id);
  const groupLocation = findLocation(training.place.location);

  if (!group) {
    return null;
  }

  const isList = view === "list";
  const imageId = [group.team?.image, group.image].find((id) => findImageUrl(id));
  const cell = isList ? trainingListCell : undefined;
  const locationLabel = training.location || groupLocation?.title || "";
  const startAge = Number(group.data?.start_age);
  const endAge = group.data?.end_age == null || group.data.end_age === ""
    ? null
    : Number(group.data.end_age);
  const ageLabel = !startAge
    ? ""
    : startAge >= 18
      ? "Erwachsene"
      : endAge == null
        ? `Ab ${startAge} Jahren`
        : `Von ${startAge} bis ${endAge} Jahre`;
  const tags = [
    locationLabel ? { key: "location", label: locationLabel } : null,
    ...training.categories.filter(Boolean).map((category) => ({
      key: `category-${category}`,
      label: category,
    })),
    ageLabel ? { key: "age", label: ageLabel } : null,
  ].filter((tag) => tag !== null);

  return (
    <>
      <div
        css={[
          trainingElement,
          isList && trainingListElement,
          striped && { backgroundColor: settings.colors.light },
        ]}
        id={training.id}
      >
        <div css={[trainingCardContent, isList && listCells]}>
          <div css={[isList ? trainingListTime : cell]}>
              <p css={{ fontWeight: 600, textAlign: "start", lineHeight: "1.2 !important", fontSize: isList ? "1rem !important" : "1.8rem !important", color: settings.colors.dark, maxWidth: isList ? "none" : "240px" }}>
                {training.start && training.end
                  ? `${training.start}`
                  : "-"}
              </p>
              <p css={{ textAlign: "start", fontSize: "0.7rem !important", color: settings.colors.grey, maxWidth: isList ? "none" : "240px", margin: 0 }}>
                bis
                {training.start && training.end
                  ? ` ${training.end}`
                  : "-"}
              </p>
            </div>
          <div css={[isList ? trainingListImage : trainingImage]}>
            {imageId && (
              <Image style={{ width: "100%", height: "100%" }} alt={group.team?.name ?? group.title} image={findImage(imageId)} />
            )}
          </div>
          <div css={[trainingCardInfo, isList && listCells]}>
            <div css={[trainingTitleCell, isList && trainingListTitle]}>
              <h3 css={{fontSize: "1.5rem !important"}}>{group.title}</h3>
              <div css={isList ? trainingListTags : trainingGridTags}>
                {tags.map((tag) => (
                  <span key={tag.key} css={trainingTag}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button  onClick={() => setModalState(!modalState)} css={[trainingElementuttonContainer, isList && trainingListButton]}>
        <AiOutlineArrowRight  size={16} />
          
        </button>
      </div>
      <SportSlideIn
        group={group}
        setModalState={setModalState}
        modalState={modalState}
        location={groupLocation?.title || ""}
      />
    </>
  );
};

export default React.memo(TrainingCalendarElement);
