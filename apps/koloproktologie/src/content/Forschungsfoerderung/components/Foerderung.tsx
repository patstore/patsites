import settings from "@settings";
import { Divider, TextContentElement } from "@ui";
import React from "react";

const Foerderung: React.FC = () => {
    return (
        <div css={{ color: settings.colors.white }}>
            <div>
                <div>
                    <h2 id="voraussetzung-forschungsfoerderung-title">
                        Forschungsförderung der Deutschen Gesellschaft für
                        Koloproktologie (DGK)
                    </h2>
                </div>
                <p>
                    Die Deutsche Gesellschaft für Koloproktologie (DGK) bietet
                    Chirurginnen und Chirurgen mit Ambitionen in der klinischen
                    und experimentellen Forschung auf dem Gebiet der
                    Koloproktologie erstmals eine Forschungsförderung in Höhe
                    von 10.000,- EUR an. Mit den zur Verfügung gestellten
                    Mitteln sollen experimentelle und klinische
                    Forschungsprojekte unterstützt werden. Die eingereichten
                    Projektskizzen werden von einem durch den Vorstand der DGK
                    ausgewählten Gremium begutachtet.
                </p>
                <Divider />
                <TextContentElement
                    title="Voraussetzungen"
                    titleFont="h3"
                >
                    <ul>
                        <li>
                            der/die Bewerber(in) stellt einen Antrag nach
                            untenstehenden formalen Kriterien
                        </li>
                        <li>
                            der/die Bewerber(in) ist entweder Facharzt für
                            Allgemein- oder Viszeralchirurgie oder in Ausbildung
                            zum Facharzt für Allgemein- oder Viszeralchirurgie
                        </li>
                    </ul>
                </TextContentElement>
                <TextContentElement
                    title="Formale Kriterien"
                    titleFont="h3"
                >
                    <ul>
                        <li>
                            der Antrag sollte max. 3 Seiten (DINA4; 1,5
                            Zeilenabstand; Schriftgröße 11pt) umfassen
                            inklusive:
                        </li>
                        <li>
                            Projektzusammenfassung, wissenschaftlicher
                            Hintergrund, verwendete Methoden, statistische
                            Angaben, Personalbedarf, Materialkosten, Zeitrahmen
                        </li>
                        <li>
                            Kurzbeschreibung der bisherigen klinischen Tätigkeit
                            sowie Leistungen auf dem Gebiet der Koloproktologie
                            (inkl. wissenschaftlicher Tätigkeit)
                        </li>
                        <li>Tabellarischer Lebenslauf mit Publikationsliste</li>
                        <li>
                            Stellungnahme zu Beweggründen für die Bewerbung um
                            eine solche Forschungsförderung
                        </li>
                        <li>
                            Empfehlungsschreiben des Vorstandes bzw.
                            Chefarztes/Klinikdirektors
                        </li>
                    </ul>
                </TextContentElement>
                <TextContentElement
                    title="Forschungsbericht"
                    titleFont="h3"
                >
                    <p>
                        Der/die Bewerber(in) sollte einen Forschungsbericht
                        verfassen und die wichtigsten Ergebnisse im Journal
                        Coloproctology publizieren. Darüber hinaus sollten - je
                        nach Forschungsprojekt - die Ergebnisse des
                        Forschungsvorhabens in einem wissenschaftlichen Vortrag
                        beim Deutschen Koloproktologenkongress vorgestellt
                        werden.
                    </p>
                    <p>
                        Die vollständigen Bewerbungsunterlagen sind per E-Mail
                        an die Geschäftsstelle der DGK e.V.,
                        <a
                            href="mailto:info@koloproktologie.org"
                            css={{
                                color: `${settings.colors.white} !important`
                            }}
                        >
                            info@koloproktologie.org
                        </a>
                        zu senden.
                    </p>
                </TextContentElement>
            </div>
        </div>
    );
};

export default Foerderung;
