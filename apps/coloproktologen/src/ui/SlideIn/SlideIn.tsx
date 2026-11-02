import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import settings from "@settings";
import { slideInAnimation } from "./animations";
import { buttonContainer, contentContainer, overlay, popup } from "./styles";
import { FlexBox } from "../FlexBox";
import { Button } from "../Button";

type SlideInProps = {
  children?: React.ReactNode;
  open?: boolean;
  cancelButtonHandler: () => void;
  width?: "small" | "medium" | "large";
  hasNoOverflow?: boolean;
  renderButtons?: React.ReactNode;
  noButtons?: boolean;
};

const SlideIn: React.FC<SlideInProps> = ({
  children,
  open = false,
  cancelButtonHandler,
  width = "small",
  hasNoOverflow = false,
  renderButtons,
  noButtons = false,
}) => {
  const isBrowser = typeof window !== "undefined";

  // useEffect(() => {
  //   if (open === false) {
  //     const { body } = document;
  //     const html = document.documentElement;
  //     setTimeout(() => {
  //       body.style.overflowY = "visible";
  //       body.style.paddingRight = "0px";
  //       html.style.overflowY = "visible";
  //     }, 800);
  //   }

  //   if (open === true) {
  //     document.documentElement.style.getPropertyValue("--scroll-y");
  //     const { body } = document;
  //     const html = document.documentElement;
  //     body.style.overflowY = "hidden";
  //     body.style.paddingRight = "10px";
  //     html.style.overflowY = "hidden";
  //   }
  // }, [open]);

  const widthHandler = () => {
    if (width === "small") {
      return ["95vw", "95vw", "95vw", "33vw"];
    }
    if (width === "medium") {
      return ["95vw", "95vw", "95vw", "66vw"];
    }
    if (width === "large") {
      return ["95vw", "95vw", "95vw", "95vw"];
    }
    return null;
  };

  if (isBrowser === true) {
    return (
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
              variants={slideInAnimation as any}
              initial="initial"
              animate="animate"
              exit="exit"
              css={settings.mq([popup, { width: widthHandler() }])}
            >
              <FlexBox
                direction="column"
                align="flex-start"
                justify="space-between"
                styles={{ height: "100%", overflow: "hidden" }}
              >
                <div
                  css={[
                    contentContainer,
                    {
                      overflow: hasNoOverflow ? "hidden" : "auto",
                    },
                  ]}
                >
                  {children}
                </div>
                <div
                  css={[
                    buttonContainer,
                    {
                      alignSelf: "flex-end",
                      display: noButtons ? "none" : "flex",
                    },
                  ]}
                >
                  {renderButtons ? (
                    renderButtons
                  ) : (
                    <Button
                      text="Schließen"
                      onClick={() => cancelButtonHandler()}
                    />
                  )}
                </div>
              </FlexBox>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  }
  return null;
};

export default SlideIn;
