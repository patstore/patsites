import React from "react";
import { contactIndicatorTwo, contactSlideIn, overlay } from "./styles";
import ContactContent from "./components/ContactContent";
import { AnimatePresence, motion } from "motion/react";
import settings from "@settings";
import { slideInAnimation } from "./animations";
import { MessagesSquare } from "lucide-react";
import { useSiteContext } from "@provider";
import { ContactProps } from "./types";

const Contact: React.FC<ContactProps> = ({ showMenu, setShowMenu }) => {
  const { contactOpen, setContactOpen } = useSiteContext();

  const contactOpenHandler = () => {
    if (!showMenu) {
      setContactOpen(!contactOpen);
    }
    if (showMenu) {
      setShowMenu(false);
      setTimeout(() => {
        setContactOpen(!contactOpen);
      }, 700);
    }
  };

  return (
    <>
      <AnimatePresence>
        {contactOpen && (
          <motion.div
            css={overlay}
            key="slideIn-overlay"
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setContactOpen(false)}
          />
        )}
      </AnimatePresence>
      <motion.div
        key="slidein-animation"
        custom={{ duration: 0.3 }}
        initial={slideInAnimation.initial}
        animate={
          contactOpen ? slideInAnimation.animate : slideInAnimation.initial
        }
        css={settings.mq([
          contactSlideIn,
          { width: ["95vw", "95vw", "50vw", "33vw"] },
        ])}
        transition={{ ease: "easeOut" }}
      >
        <ContactContent />
      </motion.div>
      <div css={contactIndicatorTwo} onClick={() => contactOpenHandler()}>
        <MessagesSquare
          size={16}
          strokeWidth={1.75}
          color={settings.colors.white}
        />
      </div>
    </>
  );
};

export default Contact;
