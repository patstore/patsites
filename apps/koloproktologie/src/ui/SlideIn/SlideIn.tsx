import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";
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
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isBrowser || !open) {
            return;
        }

        const { body } = document;
        const html = document.documentElement;
        body.style.overflow = "hidden";
        html.style.overflow = "hidden";

        const blockBackgroundScroll = (event: WheelEvent | TouchEvent) => {
            const panel = panelRef.current;
            if (panel && event.target instanceof Node && panel.contains(event.target)) {
                return;
            }
            event.preventDefault();
            event.stopPropagation();
        };

        window.addEventListener("wheel", blockBackgroundScroll, { passive: false, capture: true });
        window.addEventListener("touchmove", blockBackgroundScroll, { passive: false, capture: true });

        return () => {
            body.style.overflow = "";
            html.style.overflow = "";
            window.removeEventListener("wheel", blockBackgroundScroll, { capture: true });
            window.removeEventListener("touchmove", blockBackgroundScroll, { capture: true });
        };
    }, [open, isBrowser]);

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
                            ref={panelRef}
                            data-lenis-prevent
                            variants={slideInAnimation}
                            initial="initial"
                            animate="animate"
                            exit="exit"
                            css={settings.mq([
                                popup,
                                { width: widthHandler() }
                            ])}
                        >
                            <FlexBox
                                direction="column"
                                align="flex-start"
                                justify="space-between"
                                styles={{ height: "100%", minHeight: 0, overflow: "hidden" }}
                            >
                                <div
                                    data-lenis-prevent
                                    css={[
                                        contentContainer,
                                        {
                                            flex: "1 1 auto",
                                            height: "auto",
                                            minHeight: 0,
                                            overflow: hasNoOverflow
                                                ? "hidden"
                                                : "auto"
                                        }
                                    ]}
                                >
                                    {children}
                                </div>
                                <div
                                    css={[
                                        buttonContainer,
                                        {
                                            alignSelf: "flex-end",
                                            display: noButtons ? "none" : "flex"
                                        }
                                    ]}
                                >
                                    {renderButtons ? (
                                        renderButtons
                                    ) : (
                                        <Button
                                            text="Schließen"
                                            onClick={() =>
                                                cancelButtonHandler()
                                            }
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
