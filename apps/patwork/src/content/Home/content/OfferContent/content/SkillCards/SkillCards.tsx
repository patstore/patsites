import skill_cards from "./constants/skill_cards";
import Skillcard from "./components/Skillcard";
import "./skill_cards.scss";

const SkillCards = () => {
    return (
        <div className="skill-cards-container">
            {skill_cards.map((skill, index) => (
                <Skillcard
                    id={`skill-card-${index + 1}`}
                    key={skill.title}
                    title={skill.title}
                    number={skill.number}
                    content={skill.content}
                />
            ))}
        </div>
    );
};

export default SkillCards;
