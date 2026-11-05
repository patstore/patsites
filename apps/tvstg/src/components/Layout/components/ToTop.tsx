import settings from "@settings";
import { AnimatePresence, motion } from "motion/react";
import React, { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

const ToTop = () => {
  const [scrollTop, setScrollTop] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 600) {
      setScrollTop(true);
    } else {
      setScrollTop(false);
    }
  };

  const handleToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, false);
    return () => {
      window.removeEventListener("scroll", handleScroll, false);
    };
  }, []);

  return (
    <AnimatePresence>
      {scrollTop && (
        <motion.div
          onClick={() => handleToTop()}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          css={{
            backgroundColor: settings.colors.primary,
            borderRadius: "50%",
            position: "fixed",
            right: "2em",
            bottom: "2em",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            zIndex: 8,
          }}
        >
          <div
            css={{
              lineHeight: "100%",
              color: settings.colors.white,
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <IoIosArrowUp />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToTop;
