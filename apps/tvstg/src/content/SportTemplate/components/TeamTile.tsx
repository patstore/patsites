import { motion } from "motion/react";
import React, { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import settings from "@settings";
import { teamcardNoHover, teamImageContainer } from "../styles";
import { SportSlideIn } from "@components";
import { PatstoreGroup } from "@types";
import { useFindImages } from "@provider";
import { Image } from "@ui";

const TeamTile: React.FC<{
  team: NonNullable<PatstoreGroup["team"]>;
  group: PatstoreGroup;
}> = ({ team, group }) => {
  const [modalState, setModalState] = useState(false);
  const { findImage } = useFindImages();

  const menuHandler = () => {
    setModalState(!modalState);
  };

  return (
    <>
      <motion.div onClick={() => menuHandler()} css={teamcardNoHover}>
        <div
          css={{
            height: "15rem",
            width: "100%",
            flex: "1 0 auto",
            padding: "0",
            position: "relative",
          }}
        >
          <div>
            {team.image ? (
              <Image
                alt={team.name}
                objectFit="cover"
                css={{ ...teamImageContainer }}
                image={findImage(team.image)}
              />
            ) : group.image ? (
              <Image
                alt={team.name}
                objectFit="cover"
                css={{ ...teamImageContainer }}
                image={findImage(group.image)}
              />
            ) : null}
          </div>
        </div>
        <div css={{ padding: "1em", background: settings.colors.white }}>
          <h3 css={{ marginBottom: 0 }}>{team.name}</h3>
        </div>
        <motion.div
          onClick={() => menuHandler()}
          css={{
            transition: "all 0.2s ease-out",
            display: "none",
            borderTop: `1px solid ${settings.colors.grey}`,
            padding: "1em 1em",
            textAlign: "left",
          }}
        >
          <h5 css={{ marginBottom: 0, textTransform: "uppercase" }}>
            mehr erfahren <IoMdArrowDropright />
          </h5>
        </motion.div>
      </motion.div>
      <SportSlideIn
        group={group}
        modalState={modalState}
        setModalState={setModalState}
        location={undefined}
      />
    </>
  );
};

export default TeamTile;
