import React, { FC, useState } from "react";
import { AiOutlineArrowRight, AiOutlineClockCircle, AiOutlineInfoCircle } from "react-icons/ai";
import { RiBuilding3Line } from "react-icons/ri";
import settings from "@settings";
import {
  listCells,
  trainingCardContent,
  trainingCardInfo,
  trainingElement,
  trainingElementuttonContainer,
  trainingImage,
  trainingListButton,
  trainingListCell,
  trainingListElement,
  trainingListImage,
  trainingTitleCell,
} from "../styles";
import { FullButton, Label } from "@ui";
import { useFindImages, useGetGroup, useGetLocation } from "@provider";
import { TrainingCalendarElementProps } from "../types";
import { SportSlideIn } from "@components";
import { Image } from "@ui";
import { HiArrowUpRight } from "react-icons/hi2";

const iconStyle = { marginRight: ".3rem", minWidth: "18px" };

const TrainingCalendarElement: FC<TrainingCalendarElementProps> = ({
  training,
  view,
}) => {
  const { findGroup } = useGetGroup();
  const { findLocation } = useGetLocation();
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

  return (
    <>
      <div
        css={[trainingElement, isList && trainingListElement]}
        id={training.id}
      >
        <div css={[trainingCardContent, isList && listCells]}>
          <div css={[cell, {borderRight: `1px solid ${settings.colors.dark}`}]}>
              <p css={{ fontWeight: 600, textAlign: "start", lineHeight: "1.2 !important", fontSize: "1.8rem !important", color: settings.colors.dark, maxWidth: "240px" }}>

                {training.start && training.end
                  ? `${training.start}`
                  : "-"}
                  <br/>
              

              </p>
              <p css={{ textAlign: "start", fontSize: "0.7rem !important", color: settings.colors.grey, maxWidth: "240px" }}>
                bis
                {training.start && training.end
                  ? ` ${training.end}`
                  : "-"} 
              </p>
              
            </div>
          <div css={[trainingListImage]}>
            {imageId && (
              <Image style={{ width: "100%", height: "100%" }} alt={group.team?.name ?? group.title} image={findImage(imageId)} />
            ) }
          </div>
          <div css={[trainingCardInfo, isList && listCells]}>
            <div css={trainingTitleCell}>
              {/* {training.categories.length > 0 && (
                <div
                  css={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: settings.sizes.small,
                  }}
                >
                  {training.categories.map((category) => (
                    <Label text={category} key={category} />
                  ))}
                </div>
              )} */}
              <h3>{group.title}</h3>
            </div>
         
            <div css={cell}>
              <p
                css={{ fontWeight: 600, maxWidth: "240px" }}
                title={isList ? (training.location ?? undefined) : undefined}
              >
                <span css={iconStyle}>
                  <RiBuilding3Line />
                </span>{" "}
                {training.location || groupLocation?.title}
              </p>
            </div>
            {(group.description || isList) && (
              <div css={cell}>
                {group.description && (
                  <p title={isList ? group.description : undefined}>
                    <span
                      css={{
                        color: settings.colors.primary,
                        marginRight: ".3rem",
                      }}
                    >
                      <AiOutlineInfoCircle />
                    </span>{" "}
                    {group.description}
                  </p>
                )}
              </div>
            )}
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
