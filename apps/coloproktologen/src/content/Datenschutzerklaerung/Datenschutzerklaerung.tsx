import { ContentContainer, HeadContent } from "@ui";
import { Layout } from "@components";
import React from "react";

const Datenschutzerklaerung: React.FC = () => {
    return (
        <Layout>
            <HeadContent title="Datenschutzerklärung" isInline />
            <ContentContainer noPaddingTop>
                <section className="imp_data_section">
                    <h2>1. Verantwortlicher</h2>
                    <div>
                        <strong>
                            Berufsverband Coloproktologie Deutschland e.V. (BCD)
                        </strong>
                        <br />
                        Maienstr. 3<br />
                        79102 Freiburg i. Br.
                        <br />
                        Telefon: 0761 70 438 - 113
                        <br />
                        E-Mail:{" "}
                        <a href="mailto:info@coloproktologen.de">
                            info@coloproktologen.de
                        </a>
                    </div>
                </section>

                <section className="imp_data_section">
                    <h2>2. Allgemeine Hinweise</h2>
                    <p>
                        Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr ernst.
                        Diese Datenschutzerklärung informiert Sie über Art, Umfang und Zweck
                        der Verarbeitung personenbezogener Daten auf unserer Website sowie
                        über Ihre Rechte nach der Datenschutz-Grundverordnung (DSGVO).
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>3. Hosting der Website (Netlify)</h2>
                    <p>
                        Unsere Website wird bei <strong>Netlify, Inc.</strong>, 2325 3rd
                        Street, Suite 215, San Francisco, California 94107, USA, gehostet.
                        Netlify stellt die Infrastruktur und Plattformleistungen zur
                        Verfügung, die für den Betrieb unserer Website erforderlich sind.
                    </p>
                    <p>
                        Beim Aufruf unserer Website erfasst Netlify automatisch bestimmte
                        technische Informationen (Server-Logfiles), darunter:
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
                        <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse
                        an einem störungsfreien und sicheren Betrieb der Website).
                    </p>
                    <p>
                        Netlify hat seinen Sitz in den USA. Eine Übermittlung
                        personenbezogener Daten in ein Drittland außerhalb der EU/EWR kann
                        daher stattfinden. Netlify ist nach dem EU‑U.S. Data Privacy
                        Framework zertifiziert. Weitere Informationen:{" "}
                        <a
                            href="https://www.netlify.com/privacy/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.netlify.com/privacy/
                        </a>
                        .
                    </p>
                    <h3>Verarbeitung personenbezogener Daten über Netlify Functions (Login)</h3>
                    <p>
                        Für die Bereitstellung unserer Login-Funktion verwenden wir serverlose Funktionen („Netlify Functions“) des Dienstanbieters Netlify Inc. (2325 3rd Street, Suite 215, San Francisco, CA 94107, USA). Bei der Nutzung des Logins werden technische Daten wie IP-Adresse, Zeitpunkt der Anfrage sowie Browser-Informationen verarbeitet. Zudem werden die von Ihnen eingegebenen Login-Daten (z. B. E-Mail-Adresse, Passwort oder entsprechende Tokens) an die Funktion übermittelt, um Ihre Anmeldung zu ermöglichen.
                    </p>
                    <p>
                        Netlify verarbeitet diese Daten ausschließlich in unserem Auftrag und nach unseren Weisungen. Hierfür besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO. Eine Übermittlung in die USA erfolgt auf Grundlage der hierfür geltenden datenschutzrechtlichen Garantien (z. B. Standardvertragsklauseln oder Angemessenheitsbeschluss).
                    </p>
                    <p>
                        Die Verarbeitung erfolgt auf Basis von Art. 6 Abs. 1 lit. b DSGVO, da sie für die Durchführung des Logins und damit für die Erfüllung des Nutzungsverhältnisses erforderlich ist.
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>4. Registrierung auf der Website</h2>
                    <p>
                        Auf bestimmten Bereichen unserer Website ist eine Registrierung
                        möglich. Dabei erfassen wir folgende Daten:
                    </p>
                    <ul>
                        <li>Vor- und Nachname</li>
                        <li>E-Mail-Adresse</li>
                        <li>Benutzername</li>
                        <li>Passwort (als Hash gespeichert)</li>
                        <li>ggf. weitere freiwillige Profildaten</li>
                    </ul>
                    <p>
                        Die Datenverarbeitung erfolgt auf Grundlage Ihrer Einwilligung (
                        <strong>Art. 6 Abs. 1 lit. a DSGVO</strong>) bzw. zur Erfüllung
                        vertraglicher Leistungen (
                        <strong>Art. 6 Abs. 1 lit. b DSGVO</strong>).
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>5. Speicherung und Verarbeitung der Nutzerdaten (Sashido)</h2>
                    <p>
                        Die bei Registrierung und Nutzung erhobenen personenbezogenen Daten
                        werden auf Servern unseres Dienstleisters <strong>Sashido</strong>{" "}
                        gespeichert und verarbeitet. Sashido betreibt seine Infrastruktur
                        überwiegend auf Servern von Amazon Web Services (AWS) innerhalb der
                        EU; eine Übermittlung in Drittländer (z.B. USA) kann nicht
                        ausgeschlossen werden. Sashido sorgt durch entsprechende Verträge
                        für ein angemessenes Datenschutzniveau.
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

                <section className="imp_data_section">
                    <h2>6. Newsletter</h2>
                    <p>
                        Wenn Sie unseren Newsletter abonnieren, verwenden wir Ihre
                        E-Mail-Adresse, um Ihnen regelmäßig Informationen zu unseren
                        Veranstaltungen, Neuigkeiten und Angeboten zuzusenden. Die Anmeldung
                        erfolgt im <strong>Double‑Opt‑In‑Verfahren</strong>. Rechtsgrundlage
                        ist Ihre Einwilligung (<strong>Art. 6 Abs. 1 lit. a DSGVO</strong>).
                    </p>
                    <p>
                        Sie können den Newsletter jederzeit abbestellen (Abmeldelink im
                        Newsletter oder E-Mail an{" "}
                        <a href="mailto:info@coloproktologen.de">
                            info@coloproktologen.de
                        </a>
                        ).
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>7. Cookies und Session-Tokens</h2>
                    <p>
                        Unsere Website verwendet keine Tracking-Cookies oder
                        Analyse-Cookies. Wir setzen ausschließlich technisch notwendige
                        Session-Tokens und Cookies für die Einbindung von Google Maps ein.
                    </p>
                    
                    <h3>7.1 Session-Tokens</h3>
                    <p>
                        Wir verwenden Session-Tokens, um angemeldete Benutzer in unserer
                        Datenbank zu identifizieren und die Funktionalität der Website zu
                        gewährleisten.
                    </p>
                    <p>
                        Diese Session-Tokens sind:
                    </p>
                    <ul>
                        <li>
                            <strong>Technisch erforderlich:</strong> Sie ermöglichen die
                            Authentifizierung und sichere Nutzung der Website.
                        </li>
                        <li>
                            <strong>Temporär:</strong> Sie werden nach dem Ende Ihrer Sitzung
                            oder nach Ablauf einer bestimmten Zeit automatisch gelöscht.
                        </li>
                        <li>
                            <strong>Nicht für Tracking:</strong> Sie dienen ausschließlich der
                            Benutzeridentifikation und werden nicht für Analyse- oder
                            Marketingzwecke verwendet.
                        </li>
                    </ul>
                    <p>
                        Die Rechtsgrundlage für das Setzen dieser Session-Tokens ist{" "}
                        <strong>Art. 6 Abs. 1 lit. b DSGVO</strong> (Vertragserfüllung) bzw.{" "}
                        <strong>Art. 6 Abs. 1 lit. f DSGVO</strong> (berechtigtes Interesse
                        an der technischen Funktionsfähigkeit der Website).
                    </p>

                    <h3>7.2 Google Maps</h3>
                    <p>
                        Zur Darstellung von Standorten und Karten nutzen wir Google Maps,
                        einen Kartendienst der Google Ireland Limited, Gordon House, Barrow
                        Street, Dublin 4, Irland.
                    </p>
                    <p>
                        Bei der Nutzung von Google Maps werden Cookies gesetzt und Daten
                        wie Ihre IP-Adresse und Ihr Standort an Google übertragen. Diese
                        Daten können auch in die USA übertragen werden. Google kann diese
                        Informationen nutzen, um Ihre Nutzung der Website auszuwerten und
                        weitere Dienstleistungen zu erbringen.
                    </p>
                    <p>
                        Die Rechtsgrundlage für die Nutzung von Google Maps ist{" "}
                        <strong>Art. 6 Abs. 1 lit. a DSGVO</strong> (Einwilligung). Sie
                        können Ihre Einwilligung jederzeit widerrufen, indem Sie die
                        entsprechende Funktion in den Cookie-Einstellungen deaktivieren.
                    </p>
                    <p>
                        Weitere Informationen finden Sie in den{" "}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Datenschutzbestimmungen von Google
                        </a>
                        .
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>8. Zweckbindung und Speicherfristen</h2>
                    <p>
                        Wir verarbeiten personenbezogene Daten nur soweit dies für die
                        jeweiligen Zwecke erforderlich ist. Personenbezogene Daten werden
                        gelöscht oder gesperrt, sobald der Zweck entfällt, es sei denn,
                        gesetzliche Aufbewahrungsfristen stehen dem entgegen.
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>9. Weitergabe von Daten</h2>
                    <p>
                        Eine Weitergabe an Dritte erfolgt nur, wenn dies zur
                        Vertragserfüllung, auf Basis Ihrer Einwilligung, gesetzlich
                        vorgeschrieben oder zur Wahrung berechtigter Interessen notwendig
                        ist. Dazu zählen technische Dienstleister wie Netlify oder Sashido.
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>10. Ihre Rechte</h2>
                    <ul>
                        <li>Auskunft über gespeicherte Daten (Art. 15 DSGVO)</li>
                        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                        <li>Löschung (Art. 17 DSGVO)</li>
                        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                        <li>Widerspruch gegen Verarbeitung (Art. 21 DSGVO)</li>
                        <li>Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO)</li>
                        <li>Beschwerde bei Aufsichtsbehörde (Art. 77 DSGVO)</li>
                    </ul>
                    <p>Zur Ausübung wenden Sie sich an die Kontaktdaten unter Punkt 1.</p>
                </section>

                <section className="imp_data_section">
                    <h2>11. Sicherheit</h2>
                    <p>
                        Wir setzen technische und organisatorische Maßnahmen ein, um Ihre
                        Daten vor Verlust, Missbrauch oder unberechtigtem Zugriff zu
                        schützen. Die Maßnahmen werden regelmäßig angepasst.
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>12. Google Maps</h2>
                    <p>
                        Diese Website nutzt den Kartendienst <strong>Google Maps</strong>{" "}
                        der{" "}
                        <strong>
                            Google Ireland Limited, Gordon House, Barrow Street, Dublin 4,
                            Irland
                        </strong>{" "}
                        (&#34;Google&#34;). Google Maps wird verwendet, um
                        Standortinformationen von Praxen und Kliniken anzuzeigen und zur
                        Validierung von Adressdaten im Rahmen der Spezialistensuche.
                    </p>
                    <p>
                        Bei der Nutzung von Google Maps werden Daten an Google übermittelt
                        und auf Servern von Google gespeichert. Dies umfasst insbesondere:
                    </p>
                    <ul>
                        <li>IP-Adresse des Nutzers</li>
                        <li>Datum und Uhrzeit des Zugriffs</li>
                        <li>
                            Eingegebene oder angezeigte Standortinformationen (Adressen,
                            Koordinaten)
                        </li>
                        <li>
                            Technische Informationen (Browser, Betriebssystem,
                            Bildschirmauflösung)
                        </li>
                    </ul>
                    <p>
                        Die Verarbeitung erfolgt auf Grundlage unseres berechtigten
                        Interesses (<strong>Art. 6 Abs. 1 lit. f DSGVO</strong>) an einer
                        benutzerfreundlichen Darstellung von Standorten und der Validierung
                        von Adressdaten zur Sicherstellung korrekter Kontaktinformationen.
                        Google verwendet die Daten möglicherweise auch für eigene Zwecke,
                        z.B. zur Verbesserung der Dienste oder für Werbezwecke.
                    </p>
                    <p>
                        <strong>Google Maps Geocoding API:</strong> Zur Validierung und
                        Korrektur von Adressdaten verwenden wir die Google Maps Geocoding
                        API. Dabei werden die von Nutzern eingegebenen Adressdaten (Straße,
                        PLZ, Ort) an Google übermittelt, um die Korrektheit zu überprüfen
                        und Koordinaten zu ermitteln. Diese Verarbeitung erfolgt nur bei der
                        Eingabe oder Bearbeitung von Praxisdaten durch eingeloggte
                        Mitglieder.
                    </p>
                    <p>
                        Weitere Informationen zur Datenverarbeitung durch Google finden Sie
                        in der Datenschutzerklärung von Google:{" "}
                        <a
                            href="https://policies.google.com/privacy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://policies.google.com/privacy
                        </a>
                        . Informationen zu den Nutzungsbedingungen von Google Maps finden
                        Sie hier:{" "}
                        <a
                            href="https://www.google.com/intl/de_de/help/terms_maps/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            https://www.google.com/intl/de_de/help/terms_maps/
                        </a>
                        .
                    </p>
                    <p>
                        <strong>Widerspruchsmöglichkeit:</strong> Sie können die
                        Datenübertragung an Google verhindern, indem Sie die Nutzung von
                        Google Maps auf unserer Website unterlassen. Die Spezialistensuche
                        ist auch ohne die Kartenansicht nutzbar. Bei der Adressvalidierung
                        können Sie die vorgeschlagenen Korrekturen ablehnen und Ihre
                        ursprünglichen Eingaben beibehalten.
                    </p>
                </section>

                <section className="imp_data_section">
                    <h2>13. Änderungen der Datenschutzerklärung</h2>
                    <p>
                        Diese Datenschutzerklärung kann bei Bedarf angepasst werden.
                        Maßgeblich ist jeweils die aktuelle Fassung (Stand: 2. Oktober
                        2025).
                    </p>
                </section>
            </ContentContainer>
        </Layout>
    );
};

export default Datenschutzerklaerung;
