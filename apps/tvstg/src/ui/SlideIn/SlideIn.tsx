import { AnimatePresence, motion } from "motion/react";
import { useEffect, type ReactNode } from "react";
import ReactDOM from "react-dom";
import { useHydrated } from "@tanstack/react-router";
import { slideInAnimation } from "./animations";
import { FlexBox } from "../FlexBox";
import { Button } from "../Button";
import styles from "./SlideIn.module.css";

type SlideInProps = {
  children: ReactNode;
  open?: boolean;
  cancelButtonHandler: () => void;
  width?: "small" | "medium" | "large";
  hasNoOverflow?: boolean;
};

const widthClass = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
};

const SlideIn = ({
  children,
  open = false,
  cancelButtonHandler,
  width = "small",
  hasNoOverflow = false,
}: SlideInProps) => {
  const hydrated = useHydrated();

  useEffect(() => {
    if (open === false) {
      const { body } = document;
      const html = document.documentElement;
      setTimeout(() => {
        body.style.overflowY = "visible";
        body.style.paddingRight = "0px";
        html.style.overflowY = "visible";
      }, 800);
    }

    if (open === true) {
      document.documentElement.style.getPropertyValue("--scroll-y");
      const { body } = document;
      const html = document.documentElement;
      body.style.overflowY = "hidden";
      body.style.paddingRight = "10px";
      html.style.overflowY = "hidden";
    }
  }, [open]);

  if (!hydrated) {
    return null;
  }

  return ReactDOM.createPortal(
    <AnimatePresence initial={false}>
      {open && (
        <>
          <motion.div
            key="slideIn-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlay}
          />
          <motion.div
            key="slidein-animation"
            variants={slideInAnimation}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`${styles.popup} ${widthClass[width]}`}
          >
            <div className={styles.bar}>
              <h4 aria-hidden="true" onClick={() => cancelButtonHandler()} className={styles.close}>
                Schließen
              </h4>
            </div>
            <FlexBox
              direction="column"
              align="flex-start"
              justify="space-between"
              styles={{ height: "100%", overflow: "hidden" }}
            >
              <div className={hasNoOverflow ? `${styles.content} ${styles.locked}` : styles.content}>
                {children}
              </div>
              <div className={styles.actions}>
                <Button text="Schließen" onClick={() => cancelButtonHandler()} />
              </div>
            </FlexBox>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default SlideIn;
