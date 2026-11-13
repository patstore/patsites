import { motion } from "motion/react";
import React, { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { SportSlideIn } from "@components";
import { PatstoreGroup } from "@types";
import { Image } from "@repo/ui";
import styles from "./TeamTile.module.css";

const TeamTile: React.FC<{
  team: NonNullable<PatstoreGroup["team"]>;
  group: PatstoreGroup;
}> = ({ team, group }) => {
  const [modalState, setModalState] = useState(false);
  const imageId = team.image || group.image || "";

  const menuHandler = () => {
    setModalState(!modalState);
  };

  return (
    <>
      <motion.div onClick={() => menuHandler()} className={styles.card}>
        <div className={styles.media}>
          {imageId ? (
            <div className={styles.photo}>
              <Image
                id={imageId}
                alt={team.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          ) : null}
        </div>
        <div className={styles.body}>
          <h3>{team.name}</h3>
        </div>
        <motion.div onClick={() => menuHandler()} className={styles.more}>
          <h5>
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
