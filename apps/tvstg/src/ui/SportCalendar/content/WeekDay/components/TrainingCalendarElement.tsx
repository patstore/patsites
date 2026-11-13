import React, { FC, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import settings from "@settings";
import {
  listCells,
  trainingCardContent,
  trainingCardInfo,
  trainingElement,
  trainingElementuttonContainer,
  trainingGridArrow,
  trainingGridCardContent,
  trainingGridCell,
  trainingGridTags,
  trainingImageGrid,
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
import { useCollection } from "@provider";
import { TrainingCalendarElementProps } from "../types";
import { SportSlideIn } from "@components";
import { Image } from "@repo/ui";

const TrainingCalendarElement: FC<TrainingCalendarElementProps> = ({
  training,
  view,
  striped = false,
}) => {
  const { find: findGroup } = useCollection("Group");
  const { find: findLocation } = useCollection("Location");
  const [modalState, setModalState] = useState(false);

  const group = findGroup(training.group_id);
  const groupLocation = findLocation(training.place.location);

  if (!group) {
    return null;
  }

  const isList = view === "list";
  const imageId = group.team?.image ?? group.image;
  const cell = isList ? trainingListCell : undefined;
  const locationLabel = training.location || groupLocation?.title || "";
  const startAge = Number(group.data?.start_age);
  const endAge = group.data?.end_age == null || group.data?.end_age === ""
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

  const openDetails = () => setModalState(true);

  if (!isList) {
    return (
      <>
        <button type="button" css={trainingGridCell} id={training.id} onClick={openDetails}>
          <div css={trainingImageGrid}>
            {imageId ? (
              <Image
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={group.team?.name || group.title || undefined}
                id={imageId}
              />
            ) : null}
          </div>
          <div css={trainingGridCardContent}>
            <div css={{ padding: "12px 12px 0", flexShrink: 0 }}>
              <p
                css={{
                  fontWeight: 600,
                  textAlign: "start",
                  lineHeight: "1.2 !important",
                  fontSize: "1.8rem !important",
                  color: settings.colors.dark,
                  margin: 0,
                }}
              >
                {training.start && training.end ? `${training.start}` : "-"}
              </p>
              <p
                css={{
                  textAlign: "start",
                  fontSize: "0.7rem !important",
                  color: settings.colors.grey,
                  margin: 0,
                }}
              >
                bis
                {training.start && training.end ? ` ${training.end}` : "-"}
              </p>
            </div>
            <div css={[trainingCardInfo, { flex: "1 1 auto", minWidth: 0 }]}>
              <div css={[trainingTitleCell, { minWidth: 0, width: "100%" }]}>
                <h3 css={{ fontSize: "1.2rem !important", margin: 0 }}>{group.title}</h3>
                <div css={trainingGridTags}>
                  {tags.map((tag) => (
                    <span key={tag.key} css={trainingTag}>
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <span css={trainingGridArrow} aria-hidden>
            <AiOutlineArrowRight size={16} />
          </span>
        </button>
        <SportSlideIn
          group={group}
          setModalState={setModalState}
          modalState={modalState}
          location={groupLocation?.title || ""}
        />
      </>
    );
  }

  return (
    <>
      <div
        css={[
          trainingElement,
          trainingListElement,
          striped ? { backgroundColor: settings.colors.light } : null,
        ]}
        id={training.id}
      >
        <div css={[trainingCardContent, listCells]}>
          <div css={[trainingListTime, cell]}>
            <p
              css={{
                fontWeight: 600,
                textAlign: "start",
                lineHeight: "1.2 !important",
                fontSize: "1rem !important",
                color: settings.colors.dark,
                margin: 0,
              }}
            >
              {training.start && training.end ? `${training.start}` : "-"}
            </p>
            <p
              css={{
                textAlign: "start",
                fontSize: "0.7rem !important",
                color: settings.colors.grey,
                margin: 0,
              }}
            >
              bis
              {training.start && training.end ? ` ${training.end}` : "-"}
            </p>
          </div>
          <div css={trainingListImage}>
            {imageId ? (
              <Image
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                alt={group.team?.name || group.title || undefined}
                id={imageId}
              />
            ) : null}
          </div>
          <div css={[trainingCardInfo, listCells]}>
            <div css={[trainingTitleCell, trainingListTitle]}>
              <h3 css={{ fontSize: "1.2rem !important", margin: 0 }}>{group.title}</h3>
              <div css={trainingListTags}>
                {tags.map((tag) => (
                  <span key={tag.key} css={trainingTag}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={openDetails}
          css={[trainingElementuttonContainer, trainingListButton]}
        >
          <AiOutlineArrowRight size={16} />
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
