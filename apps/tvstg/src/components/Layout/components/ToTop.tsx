import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";
import styles from "./ToTop.module.css";

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
          className={styles.button}
        >
          <div className={styles.icon}>
            <IoIosArrowUp />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ToTop;
