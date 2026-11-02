import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import {
    videoFilterDock,
    videoFilterDockInner,
    videoFilterLabel,
    videoFilterInput,
    videoFilterInputDock,
    videoFilterInputInvalid,
    videoFilterError
} from "../styles";

const SCROLL_REVEAL_PX = 200;

const dockMotion = {
    initial: { y: "100%", opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: "100%", opacity: 0 },
    transition: { type: "spring", stiffness: 380, damping: 32, mass: 0.85 }
} as const;

export type VideoFilterProps = {
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
    regexError: string | null;
    /** Fires once when the bottom bar has latched on (scroll past threshold). */
    onDockedChange?: () => void;
};

const VideoFilter: React.FC<VideoFilterProps> = ({
    value,
    onChange,
    regexError,
    onDockedChange
}) => {
    const [latched, setLatched] = useState(false);
    const notifiedRef = useRef(false);

    useEffect(() => {
        const maybeLatch = () => {
            if (window.scrollY <= SCROLL_REVEAL_PX) {
                return;
            }
            setLatched(true);
        };

        maybeLatch();
        window.addEventListener("scroll", maybeLatch, { passive: true });
        return () => window.removeEventListener("scroll", maybeLatch);
    }, []);

    useEffect(() => {
        if (!latched || notifiedRef.current || !onDockedChange) {
            return;
        }
        notifiedRef.current = true;
        onDockedChange();
    }, [latched, onDockedChange]);

    return (
        <AnimatePresence>
            {latched && (
                <motion.div
                    key="video-filter-dock"
                    role="search"
                    aria-label="Vorträge filtern"
                    css={videoFilterDock}
                    initial={dockMotion.initial}
                    animate={dockMotion.animate}
                    exit={dockMotion.exit}
                    transition={dockMotion.transition}
                >
                    <div css={videoFilterDockInner}>
                        <label
                            css={videoFilterLabel}
                            htmlFor="video-search-regex"
                        >
                            Vorträge filtern
                        </label>
                        <div>
                            <input
                                id="video-search-regex"
                                type="search"
                                value={value}
                                onChange={(e) => onChange(e.target.value)}
                                placeholder="z. B. Zertifizierung | Robotik"
                                autoComplete="off"
                                aria-invalid={regexError ? true : undefined}
                                aria-describedby={
                                    regexError
                                        ? "video-search-regex-error"
                                        : undefined
                                }
                                css={[
                                    videoFilterInput,
                                    videoFilterInputDock,
                                    regexError && videoFilterInputInvalid
                                ]}
                            />
                            {regexError && (
                                <p
                                    id="video-search-regex-error"
                                    css={videoFilterError}
                                >
                                    {regexError}
                                </p>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VideoFilter;
