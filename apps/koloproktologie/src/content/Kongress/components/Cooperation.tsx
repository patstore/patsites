import settings from "@settings";
import { ContentContainer, TextContentElement } from "@ui";
import React from "react";

const Cooperation: React.FC = () => {
    return (
        <ContentContainer largeBackground={settings.colors.light}>
            <TextContentElement title="In Zusammenarbeit mit">
                <div>
                    <ul>
                        <li>
                            dem Berufsverband Coloproktologie Deutschlands (BCD)
                        </li>
                        <li>
                            der Chirurgischen Arbeitsgemeinschaft für
                            Coloproktologie (CACP)
                        </li>
                        <li>
                            der Deutschen Gesellschaft für Allgemein- und
                            Viszeralchirurgie (DGAV)
                        </li>
                    </ul>
                </div>
            </TextContentElement>
            <TextContentElement title="In Kooperation mit">
                <div>
                    <ul>
                        <li>
                            der AG Proktologie der Deutschen Dermatologischen
                            Gesellschaft (DDG)
                        </li>
                        <li>
                            der Kommission Proktologie in der Dt. Gesellschaft
                            für Verdauungs- und Stoffwechsel-Krankheiten (DGVS)
                        </li>
                        <li>
                            der Österreichischen Arbeitsgemeinschaft für
                            Coloproktologie (ACP)
                        </li>
                        <li>
                            der Schweizerischen Arbeitsgemeinschaft für
                            Koloproktologie (SAKP)
                        </li>
                        <li>
                            der Gesellschaft für Neurogastroenterologie und
                            Motilität (GNM)
                        </li>
                        <li>
                            dem Berufsverband niedergelassener Gastroenterologen
                            (BNG)
                        </li>
                        <li>der Deutschen ILCO e.V.</li>
                        <li>
                            der Fachgesellschaft Stoma, Kontinenz und Wunde e.V.
                        </li>
                    </ul>
                </div>
            </TextContentElement>
        </ContentContainer>
    );
};

export default Cooperation;
