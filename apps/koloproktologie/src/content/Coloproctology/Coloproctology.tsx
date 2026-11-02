import React, { useEffect, useState } from "react";
import { Layout } from "@components";
import { highlightText } from "@styles";
import { Button, ContentContainer, Divider, HeadContent } from "@ui";
import ColoproctologyHeadContent from "./components/ColoproctologyHeadContent";
import settings from "@settings";

const Coloproctology: React.FC = () => {
    const [rssData, setRssData] = useState<any>(null);

    useEffect(() => {
        fetch("/api/rss", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((data) => data.json())
            .then(setRssData);
    }, []);

    return (
        <Layout>
            <HeadContent
                title="Coloproctology"
                subtitle="Das Verbandsorgan der DGK und BCD."
                image={rssData?.items[0]?.enclosure?.url}
                content={<ColoproctologyHeadContent />}
            />
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <div>
                        <h2
                            id="leitthemen-title"
                            css={{ marginTop: 0 }}
                        >
                            Leitthemen
                        </h2>
                        <p>
                            Hier finden Sie die Leitthemen der letzten sechs
                            Ausgaben.
                        </p>
                        <Button
                            text="Leitthemen"
                            background={settings.colors.primary}
                            color={settings.colors.white}
                            size="large"
                            externalLink="https://www.springermedizin.de/coloproctology/7925988?rubric=Leitthema"
                        />
                    </div>
                </div>
            </ContentContainer>
            <ContentContainer>
                <div>
                    <h2>Beiträge und Rubriken</h2>
                    <p>
                        Die Zeitschrift bietet Beiträge zu nachfolgenden
                        Rubriken:
                    </p>
                    <ul>
                        <li>Originalarbeiten</li>
                        <li>
                            <a
                                href="https://www.springermedizin.de/coloproctology/7925988?rubric=Übersichtsartikel"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Übersichten
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.springermedizin.de/coloproctology/7925988?rubric=Kasuistik"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Kasuistiken
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.springermedizin.de/coloproctology/7925988?rubric=ContinuingEducation"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CME-Zertifizierte Fortbildung
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://www.springermedizin.de/coloproctology/7925988?rubric=Handlungsempfehlung"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Handlungsempfehlungen
                            </a>
                        </li>
                        <li>
                            Journal Club
                            <br />
                            Kommentierte Zusammenfassungen aktueller
                            internationaler Studien
                        </li>
                        <li>
                            Upate <br />
                            Die auf der jährlichen Koloproktologie
                            UPDATE-Veranstaltung diskutierten internationalen
                            Publikationen werden jeweils unter einem
                            Themenschwerpunkt zusammengefasst und von Experten
                            kommentiert.
                        </li>
                        <li>Mitteilungen der Fachgesellschaften</li>
                    </ul>
                </div>
                <Divider />
                <div className="ecms-w930">
                    <h2>Organschaften</h2>
                    <ul>
                        <li>
                            Berufsverband Coloproktologie Deutschland e.V. (BCD)
                        </li>
                        <li>
                            Deutsche Gesellschaft für Koloproktologie e.V. (DGK)
                        </li>
                        <li>
                            Arbeitsgemeinschaft der Coloproctologie (ACP) der
                            Österreichischen Gesellschaft für Chirurgie
                        </li>
                        <li>
                            Schweizerische Arbeitsgruppe für Koloproktologie
                            (SAKP)
                        </li>
                        <li>
                            Deutsche Gesellschaft für Neurogastroenterologie und
                            Motilität e.V.
                        </li>
                    </ul>
                </div>
                <Divider />

                <div>
                    <h2>Attraktive Sonderkonditionen für Mitglieder</h2>
                    <p>
                        BCD-Mitglieder erhalten die Zeitschrift kostenfrei im
                        Rahmen ihrer Mitgliedschaft. DGK-Mitglieder erhalten die
                        6 Ausgaben zum Sonderpreis von 69 € (statt 298 €) in
                        2026 inkl. gesetzlicher MwSt. zzgl. Versandkosten
                        (Inland 30 € | Ausland 49 €) für mindestens ein Jahr.
                        Dies entspricht einem Gesamtmonatspreis von 8,25 € im
                        Inland bzw. 9,80 € im Ausland. Das Abonnement ist nach
                        Ablauf der Mindestlaufzeit jederzeit mit einer Frist von
                        einem Monat kündbar. Preisänderungen und Irrtümer
                        vorbehalten. In EU-Ländern gilt die landesübliche MwSt.
                    </p>
                    <p>
                        <a
                            href="/documents/coloproctology_sonderkonditionen_2025.pdf"
                            target="_blank"
                            rel="noopener"
                            className="no-padding-left"
                        >
                            Bestellformular für Mitglieder
                        </a>
                        <a
                            href="https://www.springermedizin.de/53e-coloproctoloy/7484174"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Abonnement für Nichtmitglieder
                        </a>
                    </p>
                    <h4 className="dgk-f-jost dgk-color-b mt-5">
                        Erscheinungsweise
                    </h4>
                    <p>Die Zeitschrift erscheint 6 mal jährlich.</p>
                    <h4 className="dgk-f-jost dgk-color-b mt-5">
                        Das e.Med Kombi-Angebot von Springer
                    </h4>
                    <p>
                        Sie erhalten die coloproctology auch in Rahmen von
                        e.Med, dem Online-Paket von Springer Medizin. D.h. diese
                        Zeitschrift ist in e.Med inklusive. Weitere Vorteile des
                        e.Med Kombi-Abos:
                    </p>
                    <ul>
                        <li>Eine gedruckte Fachzeitschrift Ihrer Wahl</li>
                        <li>
                            Onlinezugriff auf alle Fachzeitschriften von
                            Springer Medizin inklusive Archiven
                        </li>
                        <li>
                            Zugang zu mehr als 600 zertifizierten
                            CME-Fortbildungen
                        </li>
                    </ul>
                    <p>
                        <a
                            className="btn dgk dgk-b-1 dgk-fw-300"
                            href="https://www.springermedizin.de/40019e-emed/7484162"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            e.Med Interdisziplinär
                        </a>
                    </p>
                </div>
                <Divider />
                <div>
                    <h2>Kontakt</h2>
                    <p>
                        Springer Customer Service Center GmbH
                        <br /> Leserservice
                        <br /> Europaplatz 3
                        <br /> 69115 Heidelberg
                        <br /> Email: leserservice@springernature.com
                    </p>
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Coloproctology;
