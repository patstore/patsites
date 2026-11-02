import React from "react";
import { cancerLogoContainer } from "../styles";
import { AppImage, ContentElement, Divider, TextContentElement } from "@ui";
import ndkLogo from "../images/NDK_Unterstuetzer_Logo.png";
import bmbfLogo from "../images/BMBF_Initiative_de.png";
import ngdLogo from "../images/Logo_NgD.png";

const CancerContent: React.FC = () => {
    return (
        <div>
            <ContentElement
                elements={[
                    {
                        content: (
                            <TextContentElement
                                title="Unterstützerin der Nationalen Dekade gegen Krebs"
                                topline="Nationalen Dekade gegen Krebs"
                                content={
                                    <div css={cancerLogoContainer}>
                                        <AppImage
                                            src={ndkLogo}
                                            alt="Manual"
                                            style={{ maxWidth: "120px" }}
                                        />
                                        <AppImage
                                            src={bmbfLogo}
                                            alt="Manual"
                                            style={{ maxWidth: "120px" }}
                                        />
                                    </div>
                                }
                            >
                                <div>
                                    <p>
                                        Seit 29.01.2021 ist die Deutsche
                                        Gesellschaft für Koloproktologie e. V.
                                        <a
                                            href="/documents/NDK_Urkunde_DGK.pdf"
                                            target="_blank"
                                            rel="noopener"
                                            title="Urkunde 'Offizieller Unterstützer der Nationalen Dekade gegen Krebs' - PDF-Datei"
                                        >
                                            offizielle Unterstützerin der
                                            Nationalen Dekade gegen Krebs
                                        </a>
                                        .
                                    </p>
                                    <p>
                                        Mit der
                                        <a
                                            href="https://www.dekade-gegen-krebs.de/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            title="Zur Internetseite 'Nationalen Dekade gegen Krebs'"
                                        >
                                            Nationalen Dekade gegen Krebs
                                        </a>
                                        haben sich auf Initiative des
                                        <a
                                            href="https://www.bmbf.de/"
                                            title="Zur Internetseite 'Bundesministerium für Bildung und Forschung - BMBF'"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Bundesministerium für Bildung und
                                            Forschung
                                        </a>
                                        viele Akteure zusammengeschlossen, um
                                        gemeinsam für eine starke Krebsforschung
                                        zu arbeiten, die Patientinnen und
                                        Patienten eng einbindet und ihnen
                                        bessere Perspektiven eröffnet.
                                    </p>
                                    <p>
                                        Mit Ihrem Engagement will die DGK dabei
                                        helfen, die Krebsforschung in
                                        Deutschland zu stärken und die Ziele der
                                        Nationalen Dekade gegen Krebs
                                        langfristig zu erreichen.
                                    </p>
                                    <p>
                                        Die
                                        <a
                                            href="/documents/NDK_Urkunde_DGK.pdf"
                                            target="_blank"
                                            rel="noopener"
                                            title="Urkunde 'Offizieller Unterstützer der Nationalen Dekade gegen Krebs' - PDF-Datei"
                                        >
                                            Urkunde &quot;Offizieller
                                            Unterstützer der Nationalen Dekade
                                            gegen Krebs&quot; können Sie hier
                                            als PDF-Datei anschauen
                                        </a>
                                        .
                                    </p>
                                </div>
                            </TextContentElement>
                        ),
                        width: "3",
                        id: "1"
                    }
                ]}
            />
            <Divider />
            <Divider showLine />
            <Divider />
            <ContentElement
                elements={[
                    {
                        content: (
                            <TextContentElement
                                title="Kooperationspartner im Netzwerk gegen Darmkrebs"
                                topline="Netzwerk gegen Darmkrebs"
                                content={
                                    <div css={cancerLogoContainer}>
                                        <AppImage
                                            src={ngdLogo}
                                            alt="Manual"
                                            style={{ maxWidth: "120px" }}
                                        />
                                    </div>
                                }
                            >
                                <div>
                                    <p>
                                        Die Deutsche Gesellschaft für
                                        Koloproktologie e.V. (DGK) ist
                                        Kooperationspartner im Netzwerk gegen
                                        Darmkrebs. Beide Organisationen
                                        verbindet das Ziel, die Früherkennung
                                        und Prävention von Darmkrebs nachhaltig
                                        zu stärken sowie fachliches Wissen
                                        interdisziplinär zu vermitteln.
                                    </p>
                                    <p>
                                        Das Netzwerk gegen Darmkrebs e.V. ist
                                        eine bundesweite Initiative zur
                                        Förderung der Prävention, Früherkennung
                                        und Aufklärung rund um Darmkrebs. Als
                                        Partner im Bündnis für Prävention des
                                        Bayerischen Staatsministeriums für
                                        Gesundheit, Pflege und Prävention setzt
                                        sich das Netzwerk gemeinsam mit
                                        medizinischen Fachgesellschaften, der
                                        Ärzteschaft, Kliniken, Unternehmen und
                                        weiteren Partnern für eine bessere
                                        Versorgung und mehr Bewusstsein in der
                                        Bevölkerung ein.
                                    </p>
                                    <p>
                                        Weitere Informationen:
                                        <a
                                            href="https://www.netzwerk-gegen-darmkrebs.de/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Netzwerk gegen Darmkrebs
                                        </a>
                                    </p>
                                </div>
                            </TextContentElement>
                        ),
                        width: "3",
                        id: "1"
                    }
                ]}
            />
        </div>
    );
};

export default CancerContent;
