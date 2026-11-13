import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { SportSlideInProps } from "./types";
import { useMediaQuery } from "usehooks-ts";
import { SlideIn } from "@ui";
import Team from "./components/Team";
import Information from "./components/Information";
import styles from "./SportSlideIn.module.css";

const SportSlideIn: React.FC<SportSlideInProps> = ({
  group,
  setModalState,
  modalState,
}) => {
  const smallDevice = useMediaQuery("(max-width: 576px)", { initializeWithValue: false });
  const largeDevice = useMediaQuery("(min-width: 577px)", { initializeWithValue: false });

  if (group)
    return (
      <>
        {modalState === true && (
          <motion.div
            key="overlay"
            onClick={() => setModalState(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.5 } }}
            exit={{ opacity: 0, transition: { delay: 0, duration: 0.4 } }}
            className={styles.overlay}
          />
        )}
        {smallDevice && (
          <SlideIn
            open={modalState}
            cancelButtonHandler={() => setModalState(false)}
          >
            <Information
              email=""
              startalter={group.data?.start_age}
              endalter={group.data?.end_age}
              beschreibung={group.text || group.data?.description}
              key={group.objectId}
              titel={group.title || ""}
              team={group.team}
              trainingszeiten={group.times}
              info={group.description || ""}
              trainer={group.persons}
              type="mobile"
            />
          </SlideIn>
        )}

        <AnimatePresence>
          {group.team &&
            group?.team?.id &&
            modalState === true &&
            largeDevice && <Team team={group.team} key={group.team.id} />}
        </AnimatePresence>
        {largeDevice && (
          <SlideIn
            open={modalState}
            cancelButtonHandler={() => setModalState(false)}
          >
            <Information
              email=""
              startalter={group.data?.start_age}
              endalter={group.data?.end_age}
              beschreibung={group.text || group.data?.description}
              key={group.objectId}
              titel={group.title || ""}
              team={group.team}
              trainingszeiten={group.times}
              info={group.description || ""}
              type="regular"
              trainer={group.persons}
            />
          </SlideIn>
        )}
      </>
    );
  return null;
};

export default SportSlideIn;
