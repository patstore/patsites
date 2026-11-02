import React from "react";
import { manualContainer, manualLabelContainer } from "../styles";
import { AppImage } from "@ui";
import { motion } from "framer-motion";
import manual1 from "../images/manual_1.webp";
import manual2 from "../images/manual_2.webp";

const ManualLabel = ({ title }: { title: string }) => {
    return <div css={manualLabelContainer}>{title}</div>;
};

const Manual: React.FC<{ type: "1" | "2" }> = ({ type }) => {
    if (type === "1") {
        return (
            <motion.div
                css={manualContainer}
                whileHover={{ scale: 1.05 }}
            >
                <a
                    href="https://www.degruyterbrill.com/document/doi/10.1515/9783111331270/html"
                    target="__blank"
                >
                    <div
                        css={{
                            position: "relative",
                            zIndex: 2,
                            marginBottom: "30px"
                        }}
                    >
                        <AppImage
                            src={manual1}
                            alt="Manual"
                            style={{ maxWidth: "240px", marginBottom: "0" }}
                        />
                        <ManualLabel title="Band 1" />
                    </div>
                </a>
                <p>
                    Aktuelles und praxisiorientiertes Wissen zu den Grundlagen.
                </p>
            </motion.div>
        );
    }
    return (
        <motion.div
            css={manualContainer}
            whileHover={{ scale: 1.05 }}
        >
            <a
                href="https://www.degruyterbrill.com/document/doi/10.1515/9783111253237/html"
                target="__blank"
            >
                <div
                    css={{
                        position: "relative",
                        zIndex: 2,
                        marginBottom: "30px"
                    }}
                >
                    <AppImage
                        src={manual2}
                        alt="Manual"
                        style={{ maxWidth: "240px", margin: 0 }}
                    />
                    <ManualLabel title="Band 2" />
                </div>
            </a>
            <p>
                Fortgeschrittene Diagnose- und Therapiemethoden des Dick- und
                Enddarms.
            </p>
        </motion.div>
    );
};

export default Manual;
