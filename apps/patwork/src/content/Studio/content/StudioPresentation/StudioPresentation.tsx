import React from "react";
import { AnimateText } from "@/animations";

const StudioPresentation = () => {
    return (
        <section className="section-container w-100 padding-top-large padding-bottom-large">
            <div className="section-container-element align-start justify-start w-100 padding-bottom-small">
                <div className="w-33">
                    <h2>01 Lösungen</h2>
                </div>
                <div className="w-66 padding-right">
                    <AnimateText viewport={0.1}>
                        <p className="large bold">
                            Patwork bietet ganzheitliche Lösungen für
                            Unternehmen und Organisationen, die Wert auf eine
                            moderne und zuverlässige Web-Präsenz benötigen.
                        </p>
                    </AnimateText>
                    <div className="divider large"></div>
                    <AnimateText viewport={0.1}>
                        <p>
                            Um das zu erreichen verfolgen wir einen
                            ganzheitlichen Ansatz, bei dem wir uns so nahe wir
                            möglich an den Anforderungen unser Kunden bewegen.
                            Ermöglicht wird dies durch eine selbst entwickelte
                            Inhaltsverwaltung, die sich intuitiv bedienen lässt
                            und zu jeder Zeit angepasst und erweitert werden
                            kann.
                        </p>
                    </AnimateText>
                    {/* 
                    <p>
                        Patwork hilft seinen Kunden bei der Umsetzung ihrer
                        Strategien für Webauftritt und Unternehmensprozesse, um
                        den Herausforderungen einer komplexen digitalen Welt mit
                        flexiblen und nachvollziehbaren Lösungen zu begegnen.
                    </p> */}
                </div>
            </div>
        </section>
    );
};

export default StudioPresentation;
