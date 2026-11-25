import { AnimateContent } from "@/animations";
import ProcessStep from "./ProcessStep";

const SectionTwo = () => {
    return (
        <ProcessStep
            number="02"
            title={
                <>
                    Design.
                    <br />
                    Struktur.
                </>
            }
        >
            <AnimateContent viewport={0.15}>
                <p>
                    Gestaltung heißt hier mehr als ein Erscheinungsbild.
                    Navigation, Inhalte und visuelle Sprache werden so angelegt,
                    dass sie zur Strategie passen und sich später pflegen
                    lassen.
                </p>
            </AnimateContent>
            <p className="large">
                Es entsteht ein Auftritt, der deine Prozesse trägt — nicht nur
                eine Oberfläche.
            </p>
        </ProcessStep>
    );
};

export default SectionTwo;
