import { Button } from "@ui";
import { motion } from "motion/react";
import HeaderMartinaEvent from "./components/HeaderMartinaEvent";
import { CONGRESS_PROGRAM_URL, headerMartinaEvents } from "./constants/content";
import {
    headerMartinaStaggerVariants,
    headerMartinaVariants
} from "./constants/variants";
import impulsePerspektiven from "../HomeHeader/images/impulse_perspektiven.png";
import kongressCenter from "../HomeHeader/images/kongress_center.png";
import {
    headerMartinaContainer,
    headerMartinaEvents as headerMartinaEventsStyle,
    headerMartinaIntro,
    headerMartinaIntroImage,
    headerMartinaProgram,
    headerMartinaStage,
    headerMartinaStageImage
} from "./styles";

const HeaderMartina = () => {
    return (
        <div css={headerMartinaContainer}>
            <div css={headerMartinaIntro}>
                <img
                    css={headerMartinaIntroImage}
                    src={impulsePerspektiven}
                    alt="Impulse. Perspektiven. Ein gemeinsames Programm. Call for Abstracts abgeschlossen. 53. Deutscher Koloproktologen-Kongress, Augsburg 2027"
                />
                <motion.div
                    css={headerMartinaProgram}
                    variants={headerMartinaVariants}
                    initial="initial"
                    animate="animate"
                >
                    <Button
                        text="Zum Kongressprogramm"
                        externalLink={CONGRESS_PROGRAM_URL}
                    />
                </motion.div>
            </div>
            <section css={headerMartinaStage}>
                <img
                    css={headerMartinaStageImage}
                    src={kongressCenter}
                    alt="Kongress am Park in Augsburg am Abend, Veranstaltungsort des Koloproktologen-Kongresses 2027"
                />
                <motion.div
                    css={headerMartinaEventsStyle}
                    variants={headerMartinaStaggerVariants}
                    initial="initial"
                    animate="animate"
                >
                    {headerMartinaEvents.map((event) => (
                        <HeaderMartinaEvent
                            key={event.title}
                            title={event.title}
                            meta={event.meta}
                        />
                    ))}
                </motion.div>
            </section>
        </div>
    );
};

export default HeaderMartina;
