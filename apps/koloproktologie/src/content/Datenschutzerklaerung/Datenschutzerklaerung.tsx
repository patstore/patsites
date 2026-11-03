import { ContentContainer, HeadContent } from "@ui";
import { Layout } from "@components";
import React from "react";

const Datenschutzerklaerung: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Datenschutzerklärung"
                isInline
            />
            <ContentContainer noPaddingTop>
                <section>
                    <h2>1. Verantwortlicher</h2>
                    <p>
                        <strong>
                            Deutsche Gesellschaft für Koloproktologie e.V.
                        </strong>
                        <br />
                        Maienstr. 3<br />
                        79102 Freiburg i. Br.
                        <br />
                        Telefon: 0761 70 438 - 113
                        <br />
                        E-Mail:
                        <a href="mailto:info@koloproktologie.org">
                            info@koloproktologie.org
                        </a>
                    </p>
                </section>

                <section>
                    <h2>2. Allgemeine Hinweise</h2>
                    <p>
                        Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr
                        ernst. Diese Datenschutzerklärung informiert Sie über
                        Art, Umfang und Zweck der Verarbeitung personenbezogener
                        Daten auf unserer Website sowie über Ihre Rechte nach
                        der Datenschutz-Grundverordnung (DSGVO).
                    </p>
                </section>

                <section>
                    <h2>3. Hosting der Website (Vercel)</h2>
                    <p>
                        Unsere Website wird bei <strong>Vercel Inc.</strong>,
                        440 N Barranca Avenue #4133, Covina, CA 91723, USA,
                        gehostet. Vercel stellt die Infrastruktur und
                        Plattformleistungen zur Verfügung, die für den Betrieb
                        unserer Website erforderlich sind.
                    </p>
                    <p>
                        Beim Aufruf unserer Website erfasst Vercel automatisch
                        bestimmte technische Informationen (Server-Logfiles),
                        darunter:
                    </p>
                    <ul>
                        <li>IP-Adresse</li>
                        <li>Datum und Uhrzeit des Zugriffs</li>
                        <li>Browsertyp und -version</li>
                        <li>Betriebssystem</li>
                        <li>Referrer-URL</li>
                        <li>Name und URL der abgerufenen Datei</li>
                    </ul>
                    <p>
                        Die Verarbeitung dieser Daten erfolgt auf Grundlage von{" "}
                        <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>{" "}
                        (berechtigtes Interesse an einem störungsfreien und
                        sicheren Betrieb der Website).
                    </p>
                    <p>
                        Vercel hat seinen Sitz in den USA. Eine Übermittlung
                        personenbezogener Daten in ein Drittland außerhalb der
                        EU/EWR kann daher stattfinden. Vercel ist nach dem
                        EU‑U.S. Data Privacy Framework zertifiziert. Weitere
                        Informationen:
                        <a
                            href="https://vercel.com/legal/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://vercel.com/legal/privacy-policy
                        </a>
                        .
                    </p>
                </section>

                <section>
                    <h2>4. Registrierung auf der Website</h2>
                    <p>
                        Auf bestimmten Bereichen unserer Website ist eine
                        Registrierung möglich. Dabei erfassen wir folgende
                        Daten:
                    </p>
                    <ul>
                        <li>Vor- und Nachname</li>
                        <li>E-Mail-Adresse</li>
                        <li>Benutzername</li>
                        <li>Passwort (als Hash gespeichert)</li>
                        <li>ggf. weitere freiwillige Profildaten</li>
                    </ul>
                    <p>
                        Die Datenverarbeitung erfolgt auf Grundlage Ihrer
                        Einwilligung (
                        <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>) bzw. zur
                        Erfüllung vertraglicher Leistungen (
                        <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>).
                    </p>
                </section>

                <section>
                    <h2>
                        5. Speicherung und Verarbeitung der Nutzerdaten
                        (Sashido)
                    </h2>
                    <p>
                        Die bei Registrierung und Nutzung erhobenen
                        personenbezogenen Daten werden auf Servern unseres
                        Dienstleisters <strong>Sashido</strong> gespeichert und
                        verarbeitet. Sashido betreibt seine Infrastruktur
                        überwiegend auf Servern von Amazon Web Services (AWS)
                        innerhalb der EU; eine Übermittlung in Drittländer (z.B.
                        USA) kann nicht ausgeschlossen werden. Sashido sorgt
                        durch entsprechende Verträge für ein angemessenes
                        Datenschutzniveau.
                    </p>
                    <p>
                        Datenschutzerklärung von Sashido:{" "}
                        <a
                            href="https://www.sashido.io/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.sashido.io/privacy-policy
                        </a>
                    </p>
                </section>

                <section>
                    <h2>6. Newsletter</h2>
                    <p>
                        Wenn Sie unseren Newsletter abonnieren, verwenden wir
                        Ihre E-Mail-Adresse, um Ihnen regelmäßig Informationen
                        zu unseren Veranstaltungen, Neuigkeiten und Angeboten
                        zuzusenden. Die Anmeldung erfolgt im{" "}
                        <strong>Double‑Opt‑In‑Verfahren</strong>.
                        Rechtsgrundlage ist Ihre Einwilligung (
                        <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>).
                    </p>
                    <p>
                        Sie können den Newsletter jederzeit abbestellen
                        (Abmeldelink im Newsletter oder E-Mail an{" "}
                        <a href="mailto:info@koloproktologie.org">
                            info@koloproktologie.org
                        </a>
                        ).
                    </p>
                </section>

                <section>
                    <h2>7. Cookies und Tracking</h2>
                    <p>
                        Unsere Website verwendet Cookies, um die Nutzung der
                        Website zu analysieren, Funktionen bereitzustellen und
                        Ihre Präferenzen zu speichern. Dabei unterscheiden wir:
                    </p>
                    <ul>
                        <li>
                            <strong>Essenzielle Cookies:</strong> Notwendig für
                            die Funktion der Website.
                        </li>
                        <li>
                            <strong>Statistik-/Analyse-Cookies:</strong> Zur
                            anonymisierten Auswertung der Nutzung (z.B. Google
                            Analytics, sofern aktiviert).
                        </li>
                        <li>
                            <strong>Marketing-Cookies:</strong> Werden nur nach
                            ausdrücklicher Einwilligung gesetzt.
                        </li>
                    </ul>
                    <p>
                        Beim ersten Besuch erscheint ein Consent-Banner, über
                        das Sie Ihre Einwilligungen für Cookies und Tracking
                        geben oder verweigern können. Ihre Entscheidung kann
                        jederzeit über die Cookie-Einstellungen auf der Website
                        geändert werden.
                    </p>
                    <p>
                        Die Rechtsgrundlage für das Setzen von Cookies und
                        Tracking ist <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>{" "}
                        (Einwilligung).
                    </p>
                </section>

                <section>
                    <h2>8. Zweckbindung und Speicherfristen</h2>
                    <p>
                        Wir verarbeiten personenbezogene Daten nur soweit dies
                        für die jeweiligen Zwecke erforderlich ist.
                        Personenbezogene Daten werden gelöscht oder gesperrt,
                        sobald der Zweck entfällt, es sei denn, gesetzliche
                        Aufbewahrungsfristen stehen dem entgegen.
                    </p>
                </section>

                <section>
                    <h2>9. Weitergabe von Daten</h2>
                    <p>
                        Eine Weitergabe an Dritte erfolgt nur, wenn dies zur
                        Vertragserfüllung, auf Basis Ihrer Einwilligung,
                        gesetzlich vorgeschrieben oder zur Wahrung berechtigter
                        Interessen notwendig ist. Dazu zählen technische
                        Dienstleister wie Netlify oder Sashido.
                    </p>
                </section>

                <section>
                    <h2>10. Ihre Rechte</h2>
                    <ul>
                        <li>
                            Auskunft über gespeicherte Daten (Art. 15 DSGVO)
                        </li>
                        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                        <li>Löschung (Art. 17 DSGVO)</li>
                        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                        <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
                        <li>
                            Widerruf erteilter Einwilligungen (Art. 7 Abs. 3
                            DSGVO)
                        </li>
                        <li>Beschwerde bei Aufsichtsbehörde (Art. 77 DSGVO)</li>
                    </ul>
                    <p>
                        Zur Ausübung wenden Sie sich an die Kontaktdaten unter
                        Punkt 1.
                    </p>
                </section>

                <section>
                    <h2>11. Sicherheit</h2>
                    <p>
                        Wir setzen technische und organisatorische Maßnahmen
                        ein, um Ihre Daten vor Verlust, Missbrauch oder
                        unberechtigtem Zugriff zu schützen. Die Maßnahmen werden
                        regelmäßig angepasst.
                    </p>
                </section>

                <section>
                    <h2>12. LinkedIn-Account</h2>
                    <p>
                        Wir betreiben eine Präsenz auf <strong>LinkedIn</strong>
                        , einem sozialen Netzwerk der{" "}
                        <strong>
                            LinkedIn Ireland Unlimited Company, Wilton Place,
                            Dublin 2, Irland
                        </strong>
                        . Wenn Sie Inhalte unseres LinkedIn-Accounts aufrufen
                        oder unserem Account folgen, können Daten an LinkedIn
                        übermittelt werden, z.B.: IP-Adresse, Datum/Uhrzeit des
                        Zugriffs, ggf. Profilinformationen.
                    </p>
                    <p>
                        Die Verarbeitung erfolgt auf Grundlage unseres
                        berechtigten Interesses (
                        <strong>Art. 6 Abs. 1 lit. f DSGVO</strong>), um unsere
                        berufliche Präsenz zu betreiben und mit Mitgliedern,
                        Partnern und Interessenten zu kommunizieren.
                    </p>
                    <p>
                        LinkedIn verarbeitet die Daten selbstständig.
                        Informationen zu Datenerhebung und Nutzung durch
                        LinkedIn finden Sie hier:{" "}
                        <a
                            href="https://www.linkedin.com/legal/privacy-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.linkedin.com/legal/privacy-policy
                        </a>
                        .
                    </p>
                    <p>
                        Wenn Sie nicht möchten, dass LinkedIn Daten über Sie
                        erhebt, müssen Sie vor dem Zugriff aus Ihrem
                        LinkedIn-Konto ausgeloggt sein oder die Inhalte nicht
                        aufrufen.
                    </p>
                </section>

                <section>
                    <h2>13. Änderungen der Datenschutzerklärung</h2>
                    <p>
                        Diese Datenschutzerklärung kann bei Bedarf angepasst
                        werden. Maßgeblich ist jeweils die aktuelle Fassung
                        (Stand: 2. Oktober 2025).
                    </p>
                </section>
            </ContentContainer>
        </Layout>
    );
};

export default Datenschutzerklaerung;
