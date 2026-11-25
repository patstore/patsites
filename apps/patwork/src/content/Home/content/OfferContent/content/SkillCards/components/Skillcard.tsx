import { forwardRef } from "react";
import type { SkillcardProps } from "../types";
import { AnimateContent } from "@/animations";

const Skillcard = forwardRef<HTMLDivElement, SkillcardProps>(
    ({ id, title, number, content }, ref) => {
        return (
            <AnimateContent
                viewport={0.1}
                duration={0.4}
                delay={0.1}
                key={id}
                className="skill-card"
            >
                <div className="skill-card-content">
                    <h3>{title}</h3>
                    <div className="skill-card-content-text">{content}</div>
                </div>
            </AnimateContent>
        );
    }
);

Skillcard.displayName = "Skillcard";

export default Skillcard;
