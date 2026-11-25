import { AnimateContent } from "@/animations";
import ProcessStep from "./ProcessStep";

const SectionOne = () => {
    return (
        <ProcessStep
            number="01"
            title={
                <>
                    Idee.
                    <br />
                    Analyse.
                </>
            }
        >
            <AnimateContent viewport={0.15}>
                <p>
                    Wir schauen gemeinsam auf Ziele, bestehende Inhalte und die
                    Mittel, die du mitbringst: Zeit, Budget und die Menschen im
                    Team. Daraus wird klar, was bleibt, was neu wird und welche
                    Form das Projekt braucht — eine Webseite, ein Relaunch oder
                    eine Anwendung.
                </p>
            </AnimateContent>
            <p className="large">
                Bevor Entwurf oder Code entstehen, liegt fest, woran das
                Ergebnis gemessen wird.
            </p>
        </ProcessStep>
    );
};

export default SectionOne;
