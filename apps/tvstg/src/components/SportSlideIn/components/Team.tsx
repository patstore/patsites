import { motion, type Variants } from "motion/react";
import React from "react";
import { FlexBox } from "@ui";
import { Image } from "@repo/ui";
import { PatstoreGroup } from "@types";
import styles from "./Team.module.css";

const menuenterright2: Variants = {
  initial: {
    opacity: 1,
    x: "100vw",
    transition: {
      x: { duration: 0.5, delay: 0 },
      opacity: { duration: 0.1, delay: 0 },
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: { duration: 0.4, delay: 0.3, ease: "easeOut" },
      opacity: { duration: 0.1, delay: 0 },
    },
  },
  hidden: {
    opacity: 0,
    x: "100vw",
    transition: {
      x: { duration: 0.5, delay: 0 },
      opacity: { duration: 0.5, delay: 1.3 },
    },
  },
};

const menuContent: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      opacity: { delay: 0.9 },
    },
  },
  exit: {
    opacity: 0,
  },
};

const Team: React.FC<{ team: NonNullable<PatstoreGroup["team"]> }> = ({ team }) => {
  return (
    <motion.div
      key={team.id}
      className={styles.panel}
      initial="initial"
      animate="visible"
      exit="hidden"
      variants={menuenterright2}
    >
      <div className={styles.bar}>
        <h4>Team-Info</h4>
      </div>

      <motion.div
        variants={menuContent}
        initial="initial"
        animate="animate"
        exit="exit"
        className="slideInLarge"
      >
        <FlexBox direction="column" style={{ marginTop: "3em" }}>
          <FlexBox
            direction="column"
            align="flex-start"
            justify="flex-end"
            style={{ height: "100%", padding: "var(--pad-medium)" }}
          >
            <h2 className={styles.name}>{team.name}</h2>
          </FlexBox>

          {team.image && (
            <Image
              alt={team.name}
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
            style={{ height: "100%", padding: "var(--pad-medium)" }}
          >
            <div>
              {team.description && (
                <div dangerouslySetInnerHTML={{ __html: team.description }} />
              )}
            </div>
          </FlexBox>
        </FlexBox>
      </motion.div>
    </motion.div>
  );
};

export default Team;
