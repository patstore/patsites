import { Layout } from "@components";
import { ContentContainer, HeadContent } from "@ui";
import React from "react";

const Beitragsordnung: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Beitragsordnung"
                subtitle="In der von der Mitgliederversammlung mit Datum vom 16.03.2018 verabschiedeten Fassung."
                isInline
            />
            <ContentContainer noPaddingTop>
                <div>
                    <ol>
                        <li>
                            Ordentliche Mitglieder zahlen einen Jahresbeitrag
                            von 120,00 EUR (i.W. einhundertzwanzig Euro). Der
                            Mitgliedsbeitrag beinhaltet die anteilige
                            Teilnahmegebühr für den einmal jährlich
                            stattfindenden Kongress; ausgeschlossen sind
                            Seminargebühren.
                        </li>
                        <li>
                            Mitglieder im Ruhestand sind von der Beitragspflicht
                            befreit und werden als Zeichen der Verbundenheit zur
                            Gesellschaft gebeten, den Beitrag als Spende zu
                            leisten
                        </li>
                        <li>
                            Medizinische Gesellschaften und medizinische
                            Verbände, die der Gesellschaft als assoziierte
                            Mitglieder beitreten, zahlen einen jährlichen
                            Unkostenbeitrag.
                        </li>
                        <li>
                            Fördernden Mitgliedern ist es freigestellt, durch
                            eine jährliche Spende die Zwecke des Vereines zu
                            fördern.
                        </li>
                        <li>Ehrenmitglieder sind beitragsfrei.</li>
                        <li>
                            Für im Laufe des Kalenderjahres neu aufgenommene
                            Mitglieder wird der Mitgliedsbeitrag monatsanteilig
                            erhoben.
                        </li>
                        <li>
                            Fälligkeit der Beiträge:
                            <ol>
                                <li>
                                    Der erste Beitrag ist zusammen mit dem
                                    Aufnahmegesuch zu entrichten. Die
                                    Mitgliedschaft tritt in Kraft nach Eingang
                                    des ersten Beitrages.
                                </li>
                                <li>
                                    Für den Jahresbeitrag wird Einzugsvollmacht
                                    erteilt. Mitgliedern, die kein
                                    SEPA-Lastschriftmandat erteilen, wird eine
                                    Bearbeitungsgebühr von 10,00 EUR pro Jahr
                                    berechnet.
                                </li>
                                <li>
                                    Der Jahresbeitrag wird am Ende des ersten
                                    Quartales fällig.
                                </li>
                                <li>
                                    Der Vorstand kann in Sonderfällen andere
                                    Zahlungsabsprachen treffen.
                                </li>
                            </ol>
                        </li>
                    </ol>
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Beitragsordnung;
