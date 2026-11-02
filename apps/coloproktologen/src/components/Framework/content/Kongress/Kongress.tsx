import React, { useEffect, useState } from "react";
import { FlexBox, SlideIn } from "@ui";
import settings from "@settings";
import { BsCalendar4Event } from "react-icons/bs";
import { motion } from "motion/react";
import { useGetEvent, getCurrentEvents } from "@provider";
import { iconContainer, slide } from "./styles";
import CongressContent from "./components/CongressContent";
import { IoMdVideocam } from "react-icons/io";
import type { EventClass } from "@types";

const slideVariants = {
    animate: {
        left: "100%",
        x: "-100%",
        transition: { delay: 0.1, duration: 0.5 }
    },
    initial: {
        left: "100.2%",
        x: 0,
        transition: { delay: 0.1, duration: 0.5 }
    }
};

const SHOW_VIDEO_PAGE = false;

const Kongress = () => {
    const [slideIn, setSlideIn] = React.useState(false);
    const [show, setShow] = useState(true);
    const { events } = useGetEvent();
    const [showContent, setShowContent] = useState(true);

    const currentEvents = getCurrentEvents(events as EventClass[]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, false);
        return () => window.removeEventListener("scroll", handleScroll, false);
    }, []);

    const handleScroll = () =>
        window.scrollY > 200 ? setShow(false) : setShow(true);

    useEffect(() => {
        const currentPath = window.location.pathname;
        if (currentPath.includes("/videos/")) {
            setShowContent(false);
        }
    }, []);

    const renderedEvent = currentEvents?.upcoming ?? currentEvents?.current;

    if (showContent === false) {
        return null;
    }

    return (
            <>
                <motion.div
                initial="initial"
                css={slide}
                className="shadow"
                variants={slideVariants}
                animate={show ? "animate" : "initial"}
            >
                {renderedEvent && (
                    <CongressContent
                        title={renderedEvent?.title ?? ""}
                        image={renderedEvent?.image ?? ""}
                        link={renderedEvent?.link ?? ""}
                        showVideoPage={SHOW_VIDEO_PAGE}
                    />
                )}
                <div
                    onClick={() => setShow(!show)}
                    className="shadow"
                    css={iconContainer}
                >
                    {SHOW_VIDEO_PAGE ? (
                        <IoMdVideocam
                            size={24}
                            color={settings.colors.white}
                        />
                    ) : (
                        <BsCalendar4Event
                            size={24}
                            color={settings.colors.white}
                        />
                    )}
                </div>
            </motion.div>
            <SlideIn
                width="large"
                open={slideIn}
                cancelButtonHandler={() => setSlideIn(false)}
            >
                <FlexBox
                    direction="row"
                    align="stretch"
                >
                    <div
                        css={{
                            flex: 1,
                            backgroundColor: settings.colors.primary,
                            padding: settings.padding.medium,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "center",
                            p: {
                                color: `${settings.colors.white} !important`
                            },
                            li: {
                                color: `${settings.colors.white} !important`
                            }
                        }}
                    >
                        <p>
                            Abstracts können für folg ende Themenschwerpunkte
                            eingereicht werden:
                        </p>
                        <ul>
                            <li>Stuhlinkontinenz</li>
                            <li>CED</li>
                            <li>Kolorektales Karzinom</li>
                            <li>Anale Dyspalsien sowie</li>
                            <li>
                                <span css={{ fontWeight: 600 }}>
                                    zu allen Themen der Koloproktologie
                                </span>
                            </li>
                        </ul>
                        <p>Infos zur Abfassung erhalten Sie hier!</p>
                        <p>
                            Die Präsentationen erfolgen in den Sitzungen der
                            &quot;freien Vorträge&quot; bzw. werden in
                            thematisch passende Sitzungen integriert.
                        </p>
                    </div>
                           
                    </FlexBox>
            </SlideIn>
            </>
    );
};

export default Kongress;
