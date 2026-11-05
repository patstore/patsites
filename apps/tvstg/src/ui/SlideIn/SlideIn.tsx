import { AnimatePresence, motion } from "motion/react";
import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { useHydrated } from "@tanstack/react-router";
import settings from "@settings";
import { slideInAnimation } from "./animations";
import { buttonContainer, contentContainer, overlay, popup } from "./styles";
import { FlexBox } from "../FlexBox";
import { Button } from "../Button";

type SlideInProps = {
  children: React.ReactNode;
  open?: boolean;
  cancelButtonHandler: () => void;
  width?: "small" | "medium" | "large";
  hasNoOverflow?: boolean;
};

const SlideIn: React.FC<SlideInProps> = ({
  children,
  open = false,
  cancelButtonHandler,
  width = "small",
  hasNoOverflow = false,
}) => {
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

  const widthHandler = () => {
    if (width === "small") {
      return ["95vw", "95vw", "95vw", "33vw"];
    }
    if (width === "medium") {
      return ["95vw", "95vw", "95vw", "50vw"];
    }
    if (width === "large") {
      return ["95vw", "95vw", "95vw", "95vw"];
    }
    return null;
  };

  if (hydrated) {
    return ReactDOM.createPortal(
      <AnimatePresence initial={false}>
        {open && (
          <>
            <motion.div
              key="slideIn-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              css={overlay}
            />
            <motion.div
              key="slidein-animation"
              variants={slideInAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              css={settings.mq([popup, { width: widthHandler() }])}
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
                  alignItems: "flex-end",
                  justifyContent: "flex-end",
                  borderBottom: `1px solid ${settings.colors.dark}`,
                  padding: "1em",
                }}
              >
                <h4
                  aria-hidden="true"
                  onClick={() => cancelButtonHandler()}
                  css={{ marginBottom: 0, cursor: "pointer" }}
                >
                  Schließen
                </h4>
              </div>
              <FlexBox
                direction="column"
                align="flex-start"
                justify="space-between"
                styles={{ height: "100%", overflow: "hidden" }}
              >
                <div
                  css={[
                    contentContainer,
                    { overflow: hasNoOverflow ? "hidden" : "auto" },
                  ]}
                >
                  {children}
                </div>
                <div css={buttonContainer}>
                  <Button
                    text="Schließen"
                    onClick={() => cancelButtonHandler()}
                  />
                </div>
              </FlexBox>
            </motion.div>
          </>
        )}
      </AnimatePresence>,
      document.body,
    );
  }
  return null;
};

export default SlideIn;
