import { AnimateContent } from "@/animations";
import ProcessStep from "./ProcessStep";

const notes = [
    {
        number: "A",
        title: "Tools",
        text: "Welche Systeme nutzt du schon, und wo fehlt etwas? Wir binden Bestehendes ein und ergänzen nur das Nötige."
    },
    {
        number: "B",
        title: "Strategie",
        text: "Konkrete Schritte für die Umsetzung, inklusive der Übernahme bestehender Inhalte und Systeme."
    },
    {
        number: "C",
        title: "Skalierung",
        text: "Wo können später neue Prozesse entstehen? Diese Stellen beziehen wir schon jetzt ein."
    }
] as const;

const SectionThree = () => {
    return (
        <>
            <ProcessStep
                number="03"
                title={
                    <>
                        Entwicklung.
                        <br />
                        Kooperation.
                    </>
                }
            >
                <AnimateContent viewport={0.15}>
                    <p>
                        Die Umsetzung bleibt nah an deinen Abläufen. Wir bauen
                        in enger Abstimmung, damit das Projekt mitwachsen kann,
                        wenn sich Ziele oder Inhalte ändern.
                    </p>
                </AnimateContent>
                <div className="studio-process-notes">
                    {notes.map((note) => (
                        <article key={note.title}>
                            <p className="bold">{note.number}</p>
                            <h4>{note.title}</h4>
                            <p>{note.text}</p>
                        </article>
                    ))}
                </div>
            </ProcessStep>
            <div className="studio-process-close section-container-element justify-end align-start w-100">
                <div className="w-66">
                    <p className="bold">
                        Patwork ist keine bloße Dienstleistung.
                    </p>
                    <h3 className="large">Sondern langfristige Kooperation.</h3>
                    <ul>
                        <li>Ideen entwickeln sich weiter.</li>
                        <li>Neue Möglichkeiten entstehen.</li>
                        <li>Was gestern gepasst hat, ist heute zu klein.</li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SectionThree;
