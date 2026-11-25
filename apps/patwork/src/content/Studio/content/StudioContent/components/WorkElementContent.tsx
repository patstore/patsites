const WorkElementContent = ({ number }: { number: string }) => {
    if (number === "01") {
        return (
            <>
                <div className="flex-33">
                    <h5>
                        Ideen. <br />
                        Struktur. <br />
                        Ziele.
                    </h5>
                </div>
                <div className="flex-33">
                    <p>
                        Wir blicken gemeinsam mit unseren Kunden auf die
                        individuellen Anforderungen eines Projektes und
                        ermitteln die Schnittmenge aus Bestehendem und Neuem:
                    </p>
                    <ul>
                        <li>Projekt-Ziele</li>
                        <li>Kundenvorstellungen</li>
                        <li>Bestehende Inhalte</li>
                        <li>Visuelle Gestaltung</li>
                    </ul>
                    <p></p>
                    <p>
                        Ziel ist nicht nur die Erstellung eines visuellen
                        Designs, sondern auch die Erschaffung eines digitalen
                        Ökosystems, das die Strategie unserer Kunden unterstützt
                        und ergänzt.
                    </p>
                </div>
            </>
        );
    }

    if (number === "02") {
        return (
            <div>
                <h5>
                    Entwicklung.
                    <br />
                    Test.
                    <br />
                    Iteration.
                </h5>
                <p>
                    Um erfolgreich und langlebig zu sein, muss ein digitales
                    Produkt ansprechend, funktional, robust und flexibel sein.{" "}
                    <br />
                    Im Kern eines jeden Entwicklungsprozesses steht dabei nicht
                    nur das Projekt im Verhältnis nach außen, sondern auch die
                    internen Prozesse und Strukturen. Da die Eigenständigkeit
                    unserer Kunden ein wesentliches Ziel unserer Arbeit ist,
                    findet die Entwicklung in enger Zusammenarbeit statt.
                </p>
            </div>
        );
    }

    if (number === "03") {
        return (
            <div>
                <h5>
                    Feedback.
                    <br />
                    Optimierung.
                    <br />
                    Realisierung.
                </h5>
                <p>
                    Während des gesamten Projekts ist die Kommunikation mit dem
                    Kunden essenziell, damit das Projekt mit den sich
                    verändernden Anforderungen des Kunden mitwachsen kann.
                    <br />
                </p>
            </div>
        );
    }
    return null;
};

export default WorkElementContent;
