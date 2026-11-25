import approach_cards from "./constants/approach_cards";
import { AnimateText } from "@/animations";
import { SkillCard } from "@/content";

const StudioPhilosophy = () => {
    return (
        <section className="section-container padding-top-medium padding-bottom-medium">
            <div className="section-container-element justify-end align-start w-100">
                <div className="section-container-element w-33 sticky">
                    <AnimateText viewport={0.1}>
                        <h2>02 Ansatz</h2>
                    </AnimateText>
                </div>
                <div className="section-container-element column align-start justify-start w-66">
                    <div className="skill-cards-container">
                        {approach_cards.map((skill, index) => (
                            <SkillCard
                                id={`skill-card-${index + 1}`}
                                key={skill.title}
                                title={skill.title}
                                number={skill.number}
                                content={skill.content}
                            />
                        ))}
                    </div>
                    <div className="section-container-element padding-top-large padding-bottom-medium">
                        <AnimateText viewport={0.1}>
                            <p className="large bold">
                                Patwork hat nich nur die Erstellung eines
                                visuellen und Umsetzung Designs zum Ziels,
                                sondern verfolgt einen ganzheitlichen Ansatz,
                                das deine Strategie unterstützt und ergänzt.
                            </p>
                        </AnimateText>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudioPhilosophy;
