import { Button } from "@ui";
import { motion } from "motion/react";
import { headerMartinaVariants } from "../constants/variants";
import type { HeaderMartinaEventContent } from "../constants/content";
import { headerMartinaEvent, headerMartinaEventButton } from "../styles";

const HeaderMartinaEvent = ({ title, meta, link }: HeaderMartinaEventContent) => {
    return (
        <motion.article
            css={headerMartinaEvent}
            variants={headerMartinaVariants}
        >
            <h2>{title}</h2>
            <p>{meta}</p>
            <div css={headerMartinaEventButton}>
                <Button text="Mehr erfahren" externalLink={link} />
            </div>
        </motion.article>
    );
};

export default HeaderMartinaEvent;
