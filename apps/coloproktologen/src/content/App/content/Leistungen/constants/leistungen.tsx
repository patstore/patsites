import React from "react";
import { LeistungArray } from "../types";
import DownloadLink from "../components/Downloads";

const leistungen: LeistungArray = [
    {
        title: "coloproctology",
        description: "Kostenloses Abonnement der Zeitschrift Coloproctology",
        content: (
            <div>
                <h3>
                    Information für Mitglieder von BCD
                </h3>
                <p>
                    Liebe Mitglieder des BCD/DGK,
                </p>
                <p>
                    wie Sie bereits wissen, erhalten seit 2026 alle Mitglieder die Zeitschrift Coloproctology kostenfrei als Printausgabe.
                </p>
                <p>
                    Ergänzend dazu möchten wir Sie herzlich einladen, sich auf springermedizin.de für den Online-Zugang zu registrieren. So haben Sie die Möglichkeit, alle Ausgaben von Coloproctology digital zu lesen, CME-Fortbildungen zu absolvieren sowie aktuelle Verbandsinformationen bequem online abzurufen.
                </p>
                <p>
                Zur Registrierung gelangen Sie über folgenden Link: <br />
                <a href="https://www.springermedizin.de/coloproctology/7925988?utm_medium=gesellschaftswebsite&utm_source=bcd&utm_campaign=regmar_society" target="_blank" rel="noreferrer">
                    springermedizin.de
                </a>
                </p>
            </div>
        )
    },
    {
        title: "Berufspolitisches Seminar",
        description:
      "Im Berufspolitischen Seminar werden praxisrelevante Themen behandelt. Die Folien der Seminare des Jahres 2026 können Sie hier einsehen:",
        content: (
            <div css={{"a": {fontSize: "12px !important"}}}>
                <p>
                    <b>Berufspolitisches Seminar Augsburg 2026</b>
                </p>
                <p>
                    <DownloadLink filename="Entwicklung_Hybrid-DRG_Raskop_2026.pdf" label="Hybrid DRG - Anna Maria Raskop (Berlin)" />
                </p>
                <p>
                    <DownloadLink filename="Abrechnung_Hybrid_Sauer_2026.pdf" label="Hybrid DRG - Sandra Sauer (Berlin)" />
                </p>
                <p>
                    <DownloadLink filename="Novellierung_der_GOAE_Bussen_2026.pdf" label="Novellierung GOÄ - Dieter Bussen (Mannheim)" />
                </p>
                <p>
                    <b>Berufspolitisches Seminar Augsburg 2025</b>
                </p>
                <p>
                    <DownloadLink filename="H-DRG_51_Deutscher_Koloproktologen_Kongress.pdf" label="Hybrid DRG - Anna Maria Raskop (Berlin)" />
                </p>
                <p>
                    <DownloadLink filename="51_Deutscher_Koloproktologen_Kongress_Berufspolitisches_Seminar.pdf" label="Ambulante Operationen - Sandra Sauer (Berlin)" />
                </p>
                <p>
                    <b>Berufspolitisches Seminar München 2024</b>
                </p>
                <p>
                    <DownloadLink filename="2024-03-16_Weiterentwicklung_ambulantes_Operieren.pdf" label="Weiterentwicklung Ambulantes Operieren:Aktueller Stand der Verhandlungen - Anna Maria Raskop (Berlin)" />
                </p>
                <p>
                    <DownloadLink filename="Coloproktokongress_2024_Berufspolitisches_Seminar.pptx" label="Neue Vergütungsformen: § 115b, SGB V; Rechtsverordnung § 115 F - Sandra Sauer (Berlin)" />
                </p>
                <p>
                    <DownloadLink filename="20240316_PF_Praxisabgabe-und-erwerb-Kolo_V1.0.pptx" label="Abgabe und Erwerb eines Vertragsarztsitzes: Zulassungsverfahren und Kooperationsformen - Stefan Haniffa (München)" />
                </p>
                <p>
                    <b>Berufspolitisches Seminar München 2023</b>
                </p>
                <p>
                    <DownloadLink filename="Hygienebegehung_Fritz.pdf" label="Vortrag Hygienebegehung - Fritz (Freiburg)" />
                </p>
                <p>
                    <b>Berufspolitisches Seminar München 2019</b>
                    <br />
                    <DownloadLink filename="Vortrag_Abgabe-Erwerb_Kassenzulassung_16.03.2019.pdf" label="Abgabe/Erwerb einer Kassenzulassung – Vorgehensweise und aktuelle Entwicklungen - Bernhard Strittmatter (Freiburg)" />
                </p>

                <p>
                    <b>Berufspolitisches Seminar München 2018</b>
                    <br />
                    <DownloadLink filename="Abgabe-Erwerb_Kassenzulassung_2018.pdf" label="Abgabe/Erwerb einer Kassenzulassung – Möglichkeiten und Restriktionen - Bernhard Strittmatter (Freiburg)" />
                </p>
                <p>
                    <DownloadLink filename="44-Deutscher-Koloproktologen-Kongress-2018.pdf" label="Praxis-Nachfolge/-Erweiterung will geplant sein! - Bernhard Strittmatter (Freiburg)" />
                </p>
                <p>
                    <DownloadLink filename="Berufspol-Seminar-GOA-2018.pdf" label="GOÄ 2018 - Bernhard Strittmatter (Freiburg)" />
                </p>
             
            </div>
        )
    },
    {
        title: "bng-Shop",
        description:
      "Als BCD-Mitglied können Sie über den Berufsverband Niedergelassener Gastroenterologen e.V. (bng) Endoskopie-Bedarf zu vergünstigten Konditionen erwerben.",
        content: (
            <div>
                <p>
                    Zum Shop:{" "}
                    <a
                        href="https://www.bng-shop.de"
                        target="_blank"
                        title="Endoskopie-Bedarf"
                    >
                        https://www.bng-shop.de 
                    </a>
                </p>
                <ol>
                    <li>
                        Bei erstmaliger Nutzung registrieren Sie sich bitte zunächst mit
                        Ihrer E-Mail und einem Passwort im bng-Shop.
                    </li>
                    <li>
                        Im nächsten Schritt erstellen Sie ein Kundenkonto mit Ihrem Namen,
                        Rechnungsadresse, E-Mail und Passwort. Zwischen dem bng und dem BCD
                        werden keine Kontaktdaten ausgetauscht
                    </li>
                </ol>
                <p>
                    Nach <i>Überprüfung Ihrer Mitgliedschaft</i> über die
                    BCD-Geschäftsstelle wird Ihr Konto <i>manuell freigeschaltet</i>. Sie
                    erhalten daraufhin eine Bestätigungs-E-Mail.
                </p>

                <p>
                    Eine Mitgliedschaft im Berufsverband Niedergelassener
                    Gastroenterologen e.V. (bng) ist nicht erforderlich.
                </p>
            </div>
        )
    },
    {
        title: "Stellungnahmen und Argumentationshilfen",
        subtitle:
      "Hilfestellungen für diagnostische und therapeutische Entscheidungsprozesse",
        description:
      "Der Berufsverband gibt in seinen Stellungnahmen offizielle Empfehlungen und Argumentationshilfen zu bestimmten Themengebieten der Proktologie. Diese wurden gemeinsam mit fachlich zuständigen Kommissionen bzw. Sachverständigen erarbeitet. ",
        content: (
            <div>
                <p>
                    Hier können Sie verschiedene Stellungnahmen und Argumentationshilfen
                    herunterladen.
                </p>
                <p>
                    <b>Postoperativen proktologische Wundversorgung</b>
                    <br />
                    <DownloadLink filename="Stellungnahme_postoperative_proktologische_Wundversorgung.pdf" label="Gemeinsame Stellungnahme mit DGK, DGAV und CACP." />
                </p>
                <p>
                    <b>Stationäre oder ambulante Operation bei Hämorrhoiden</b>
                    <br />
                    <DownloadLink filename="Empfehlung_Haemorrhoiden_OP.pdf" label="Gemeinsame Stellungnahme mit der DGK." />
                </p>
                <p>
                    <b>Verschlüsselung der Op-Prozeduren bei Analfisteln</b>
                    <br />
                    <DownloadLink filename="Empfehlung_Verschluss_Analfisteln.pdf" label="Gemeinsame Stellungnahme mit der DGK." />
                </p>
                <p>
                    <b>Stationären oder ambulanten Operation beim Pilonidalsinus</b>
                    <br />
                    <DownloadLink filename="Empfehlung_Pilonidalsinus_OP.pdf" label="Gemeinsame Stellungnahme mit der DGK." />
                </p>
                <p>
                    <b>
                        Indikation und privatärztliche Abrechnung der Proktoskopie
                        (GOÄ-Ziffer 705) in Verbindung mit der Gummiringligatur (GOÄ-Ziffer
                        766) und der Sklerosierung (GOÄ-Ziffer 764)
                    </b>
                    <br />
                    <DownloadLink filename="GOAE_705_766_764.pdf" label="Gemeinsame Stellungnahme mit der DGK." />
                </p>
               
                <p>
                    <b>Behandlungspfad für die Sakralnervenstimulation bei Stuhlinkontinenz</b>
                    <br />
                    {/* "V. Kahlke, A. Fürst, D. Leder, M. Löhnert, O. Schwandner, T. Schwandner, D. Weimann, K.E. Matzel coloproctology 2014 · 36:478–484 DOI 10.1007/s00053-014-0497-y", */}
                    <DownloadLink filename="Behandlungspfad_Sakralnervenstimulation.pdf" label="Behandlungspfad für die Sakralnervenstimulation bei Stuhlinkontinenz" />
                </p>
            </div>
        )
    },
    {
        title: "Kompetenzzentren",
        subtitle: "Zertifizierungsanträge und Kriterien",
        description:
      "Nach 2-jähriger „ordentlicher Mitgliedschaft“ bieten wir qualifizierten Praxen und Klinikabteilungen die Möglichkeit, sich als Kompetenzzentrum zertifizieren zu lassen. Die Zertifizierungsanträge und Kriterien stehen Ihnen hier als Download zur Verfügung.",
        content: (
            <div>
                <p>
                    <DownloadLink filename="KompZent_Kriterien.pdf" label="Kriterien für die Anerkennung als Kompetenzzentrum" />
                </p>
                <p>
                    <DownloadLink filename="KompZent_Neuantrag_Gastroenterologie.pdf" label="Neuantrag Kompetenzzentrum für Koloproktologie Fachbereich: Gastroenterologie" />
                </p>
                <p>
                    <DownloadLink filename="KompZent_Neuantrag_Koloproktologie.pdf" label="Neuantrag Kompetenzzentrum für Koloproktologie Fachbereich: Chirurgie" />
                </p>
                <p>
                    <DownloadLink filename="KompZent_Neuantrag_Proktologie.pdf" label="Neuantrag Kompetenzzentrum für Proktologie Fachbereich: Chirurgie" />
                </p>
            </div>
        )
    },
    {
        title: "Praxishygienische Beratung - kostenlose Basisberatung",
        subtitle: "Mitglieder-Service des BCDs in Zusammenarbeit mit dem BZH",
        description:
      "Die Richtlinien der Hygiene werden immer komplexer und sind in Deutschland in den Medizinhygieneverordnungen der Bundesländer geregelt. Beispielhaft steht in der Medizinhygieneverordnung für Baden-Württemberg Folgendes: ",
        content: (
            <div>
                <p>„Sie gilt für</p>
                <ol>
                    <li>Krankenhäuser, </li>
                    <li>
                        <b>Einrichtungen für ambulantes Operieren, </b>
                    </li>
                    <li>
                        Vorsorge- oder Rehabilitationseinrichtungen, in denen eine den
                        Krankenhäusern vergleichbare medizinische Versorgung erfolgt,
                    </li>
                    <li>Dialyseeinrichtungen, </li>
                    <li>Tageskliniken und </li>
                    <li>
                        <b>Arztpraxen</b>, Zahnarztpraxen und Praxen sonstiger
                        humanmedizinischer Heilberufe,{" "}
                        <b>in denen invasive Eingriffe vorgenommen werden</b>“.
                    </li>
                </ol>
                <p>
                    Dabei wird zwischen Eingriffen und Operationen unterschieden; d.h. die
                    Praxis muss zunächst definieren, unter was sie fällt: unter{" "}
                    <b>„Einrichtungen für ambulantes Operieren“</b> oder „nur“ unter{" "}
                    <b>
                        „Arztpraxen, [...] in denen invasive Eingriffe vorgenommen werden“
                    </b>
                    .{" "}
                </p>
                <p>
                    Dementsprechend fallen die Forderungen unterschiedlich aus. Fällt die
                    Einrichtung unter Punkt 2. (Einrichtungen für ambulantes Operieren)
                    gilt für sie gemäß § 2 Abs. 3 (MedVKH BW):
                </p>
                <ol>
                    <li>
                        Sicherstellung, dass bei Bedarf ein(e) Krankenhaushygieniker/In zur
                        Beratung hinzugezogen werden kann (§ 7).
                    </li>
                    <li>
                        Sicherstellung der Beratung durch eine Hygienefachkraft (§ 6).
                    </li>
                    <li>
                        Bestellung einer hygienebeauftragten Ärztin oder -Arztes (§ 8) [...]
                        <br /> (siehe markierte Stellen in MedHyg BW)
                    </li>
                </ol>
                <p>
                    Bei diesen besonders für operative Einrichtungen komplexen und
                    umfangreichen Anforderungen unterstützt Sie der Berufsverband, der für
                    die Mitglieder einen Vertrag mit dem Deutschen Beratungszentrum für
                    Hygiene in Freiburg (BZH) abgeschlossen hat, damit Sie einen
                    kompetenten und auch geforderten Ansprechpartner (vgl. §7) bei allen
                    Fragen der Infektionsvermeidung und -bekämpfung zu Rate ziehen können.
                </p>
                <p>
                    <b>
                        Als BCD-Mitglied erhalten Sie ab sofort bei allen
                        medizinhygienischen Fragen eine kostenlose Basisberatung zu Fragen
                        der Hygiene und Infektionsprävention durch das{" "}
                        <a
                            href="http://www.bzh-freiburg.de/"
                            target="_blank"
                            rel="noopener"
                        >
                            BZH
                        </a>
                        .
                    </b>
                </p>
                <p>
                    Beratung/Hotline: 0761 / 202 678 0 (Mo bis Do 09.00 bis 16.30 Uhr, Fr
                    09.00 bis 15.00 Uhr)
                </p>
                <p>
                    Außerdem haben die BCD–Mitglieder die Möglichkeit,{" "}
                    <b>optionale Leistungen</b> in einem Untervertrag mit dem BZH zu
                    vereinbaren, wie z.B.:
                </p>
                <ul>
                    <li>
                        <b>Begehungen:</b> Begehung durch eine Hygienefachkraft oder einen
                        Krankenhaushygieniker der hygienerelevanten Bereiche der Praxis nach
                        gemeinsamer Terminabsprache; hiernach Erstellung eines
                        Fachprotokolls mit Empfehlungen sowie innerhalb der jeweiligen
                        Leistungstage auf Wunsch Fortbildungen; s.u.
                    </li>
                    <li>
                        <b>Hygienepläne:</b> Unterstützung bei der Erstellung und
                        regelmäßigen Aktualisierung von praxis- und bereichsspezifischen
                        Hygieneplänen für die einzelnen Funktionsbereiche;
                    </li>
                    <li>
                        <b>Reinigungs-/Desinfektionsmanagement:</b> Mitwirkung bei der
                        Festlegung von Reinigungs- und Desinfektionsmaßnahmen;
                    </li>
                    <li>
                        <b>Beschaffung:</b> Beratung bei der Beschaffung von medizinischen
                        und medizintechnischen Materialien und Geräten, von Sterilisations-
                        und Desinfektionsgeräten sowie Desinfektionsmitteln und Antiseptika;
                    </li>
                    <li>
                        <b>Behörden:</b> Beratung und Betreuung der Praxis im Umgang mit
                        Behörden, zum Beispiel Gesundheitsämtern etc.;
                    </li>
                    <li>
                        <b>Bauhygienische Beratung:</b> Beratung bei Neu-/Um- und
                        Erweiterungsbaumaßnahmen sowie Sanierungen, inkl. investiver
                        Beratung;
                    </li>
                    <li>
                        <b>Merkblattsatz</b> zu allen wichtigen Fragen der Praxishygiene;
                    </li>
                    <li>
                        <b>Fortbildung:</b> Praxishygienische Fortbildungsveranstaltungen
                        nach Wunsch im Rahmen einer Begehung.
                    </li>
                </ul>
                <p>
                    <b>
                        Die Abrechnung der optionalen Leistungen erfolgt direkt mit dem BZH
                    </b>{" "}
                    durch die jeweilige Praxis (siehe{" "}
                    <DownloadLink filename="Optionale Leistungen BZH-1.PDF" label="Kostenaufstellung" />
                    ).
                </p>
                <p>
                    Wir hoffen, dass dieser Beratungsvertrag mit dem BZH Ihren Aufwand in
                    der Praxis erleichtert und bitten Sie, die kostenlose Basisberatung
                    bei Fragen zur Hygiene und Infektionsprävention in Anspruch zu nehmen.
                </p>
                <h4>
                    Hygieneverordnungen zum Herunterladen (Stand 10.2016, ohne Gewähr)
                </h4>
                <div>
                    <div>
                        <ul>
                            <li>
                                <DownloadLink filename="MedHygV BW.pdf" label="Baden-Württemberg" />
                            </li>
                            <li>
                                <DownloadLink filename="MedHygVO Bayern Stand 120809.pdf" label="Bayern" />
                            </li>
                            <li>
                                <DownloadLink filename="120612_HygVO Berlin.pdf" label="Berlin" />
                            </li>
                            <li>
                                <DownloadLink filename="120206_KHHygV_Brandenburg.pdf" label="Brandenburg" />
                            </li>
                            <li>
                                <DownloadLink filename="120430_HygInfVO_Bremen.pdf" label="Bremen" />
                            </li>
                            <li>
                                <DownloadLink filename="120327_HmbMedHygVO.pdf" label="Hamburg" />
                            </li>
                            <li>
                                <DownloadLink filename="111209_Hessische Hygieneverordnung_HHygVO.pdf" label="Hessen" />
                            </li>
                            <li>
                                <DownloadLink filename="120222_MedHygVO M-V.pdf" label="Mecklenburg-Vorpommern" />
                            </li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <DownloadLink filename="120326_NMedHygVO.pdf" label="Niedersachsen" />
                            </li>
                            <li>
                                <DownloadLink filename="120313_HygMedVO _NRW.pdf" label="Nordrhein-Westfalen" />
                            </li>
                            <li>
                                <DownloadLink filename="120217_MedHygVO_RLP.pdf" label="Rheinland-Pfalz" />
                            </li>
                            <li>
                                <DownloadLink filename="120328_MedHygVO Saarland.pdf" label="Saarland" />
                            </li>
                            <li>
                                <DownloadLink filename="MedHygVO_Sachsen_12062012.pdf" label="Sachsen" />
                            </li>
                            <li>
                                <DownloadLink filename="120326_MedHygVO LSA.pdf" label="Sachsen-Anhalt" />
                            </li>
                            <li>
                                <DownloadLink filename="110908_MedInfpSHst.pdf" label="Schleswig-Holstein" />
                            </li>
                            <li>
                                <DownloadLink filename="ThuermedHygVO_Thueringen_2012.pdf" label="Thüringen" />
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
];

export default leistungen;
