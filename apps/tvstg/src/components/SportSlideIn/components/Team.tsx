import { motion, type Variants } from "motion/react";
import React from "react";
import settings from "@settings";
import { FlexBox } from "@ui";
import { useFindImages } from "@provider";
import { Image } from "@ui";
import { PatstoreGroup } from "@types";

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
  const { findImage } = useFindImages();

  return (
    <motion.div
      key={team.id}
      css={settings.mq({
        cursor: "default",
        width: ["20vw", "50vw", "55vw", "55vw", "55vw"],
        right: [0, 0, "0", "33vw", "33vw"],
        overflowY: "scroll",
        position: "fixed",
        height: "100vh",
        top: "0",
        background: settings.colors.white,
        border: `1px solid ${settings.colors.grey}`,
        zIndex: 11,
      })}
      initial="initial"
      animate="visible"
      exit="hidden"
      variants={menuenterright2}
    >
      <div
        css={{
          position: "absolute",
          zIndex: 2,
          background: settings.colors.light,
          top: 0,
          left: 0,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: `1px solid ${settings.colors.dark}`,
          padding: "1em",
        }}
      >
        <h4 css={{ margin: "0 !important" }}>Team-Info</h4>
      </div>

      <motion.div
        variants={menuContent}
        initial="initial"
        animate="animate"
        exit="exit"
        className="slideInLarge"
      >
        <FlexBox direction="column" styles={{ marginTop: "3em" }}>
          <FlexBox
            direction="column"
            align="flex-start"
            justify="flex-end"
            styles={{ height: "100%", padding: settings.padding.medium }}
          >
            <h2 css={{ color: settings.colors.dark, width: "auto" }}>
              {" "}
              {team.name}
            </h2>
          </FlexBox>

          {team.image && (
            <Image
              alt={team.name}
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
            styles={{ height: "100%", padding: settings.padding.medium }}
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
