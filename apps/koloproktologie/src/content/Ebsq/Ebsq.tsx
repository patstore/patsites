import React from "react";
import { Layout } from "@components";
import settings from "@settings";
import { highlightText } from "@styles";
import { ContentContainer, Divider, HeadContent } from "@ui";

const Ebsq: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="EBSQ-Coloproctology"
                subtitle="In Zusammenarbeit mit der section of surgery (UEMS)"
                image="/ebsq_header.jpg"
            />
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <p css={highlightText}>
                        Bedingt durch ihre interdisziplinären Strukturen
                        betrifft die Koloproktologie weitaus mehr als nur die
                        „kolorektale Chirurgie&quot;. Die Inhalte zur Aus-,
                        Weiter- und Fortbildung sind daher äußerst vielfältig
                        und variieren im Vergleich mit anderen europäischen
                        Ländern und deren Fachgesellschaften, bedingt durch
                        deren unterschiedliche Versorgungsstrukturen.
                    </p>
                    <p css={highlightText}>
                        Die Sektion der
                        <a
                            href="https://uemssurg.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            title="uemssurg.org - UEMS Surgery Section"
                        >
                            U.E.M.S. (Union Européenne des Médicins Spécialistes
                            = Europäische Vereinigung der Fachärzte)
                        </a>
                        hat daher ein Anforderungsprogramm für einen
                        europäischen Koloproktologen erarbeitet. Ziel dieses
                        Programms ist die Anerkennung der Koloproktologie als
                        ein europaweit eigenständiges Fachgebiet mit einem
                        europaweit standardisierten Ausbildungsprogramm.
                    </p>
                </div>
            </ContentContainer>
            <ContentContainer>
                <div>
                    <h2>Postgraduierten-Kurs</h2>
                    <p>
                        Der Kurs empfiehlt sich neben der Vorbereitung auf die
                        EBSQ-Prüfung auch zur Auffrischung des eigenen aktuellen
                        Wissens. Es richtet sich insbesondere an Fachärzte mit
                        Berufserfahrung sowie fortgeschrittene Assistenten auf
                        dem Weg zum Facharzt mit Interesse an der
                        Koloproktologie. Eine Pflicht zur Prüfung besteht nicht.
                    </p>
                </div>
                <Divider />

                <div>
                    <h2>EBSQ-Prüfung</h2>
                    <p>
                        Die EBSQ-Prüfung (European Board of Surgical
                        Qualification Coloproctology) besteht aus einem
                        allgemeinen schriftlichen Teil, sowie 2 weiteren
                        mündlichen Teilen. Prüfungssprache: Englisch.
                    </p>
                    <p>
                        Die Anmeldung zur Prüfung sowie die dafür erforderlichen
                        Unterlagen finden Sie unter
                        <a
                            href="https://uemssurg.org/surgicalspecialties/coloproctology/ebsq-examinations/"
                            target="_blank"
                            title="Coloproctology EBSQ Examinations"
                            rel="noopener noreferrer"
                        >
                            www.uemssurg.org
                        </a>
                        .
                    </p>
                </div>
                <Divider />
                <div>
                    <h2>UEMSSURG</h2>
                    <h3>Hinweis und Kontaktdaten</h3>
                    <p>
                        Bitte wenden Sie sich bei allen Fragen zum EBSQ-Seminar
                        und zur EBSQ-Prüfung an:
                    </p>
                    <p>
                        European Board of Surgery Qualification (EBSQ)
                        <br /> EBSQ Coloproctology
                        <br /> Rue de l&apos;Industrie, 24
                        <br /> 1040 Brussels / BELGIUM
                        <br /> Tel: +32 (0)2 486 06 42
                    </p>
                    <p>
                        E-mail:
                        <a href="mailto:office@uemssurg.org">
                            office@uemssurg.org
                        </a>
                    </p>
                </div>
                <Divider />
                <div>
                    <h2>Kurstermine</h2>
                    <p>
                        Bitte wenden Sie sich bei allen Fragen zum EBSQ-Seminar
                        (Termine, Anmeldung, Prüfung) an:
                    </p>
                    <p>
                        <a
                            href="https://uemssurg.org/surgicalspecialties/coloproctology/ebsq-examinations/"
                            target="_blank"
                            title="Deutscher Koloproktologenkongress"
                            rel="noopener noreferrer"
                        >
                            Fragen
                        </a>
                    </p>
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Ebsq;
