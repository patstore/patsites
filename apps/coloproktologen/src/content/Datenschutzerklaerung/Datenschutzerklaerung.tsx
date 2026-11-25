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
						Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr
						ernst. Diese Datenschutzerklärung informiert Sie über
						Art, Umfang und Zweck der Verarbeitung personenbezogener
						Daten auf unserer Website sowie über Ihre Rechte nach
						der Datenschutz-Grundverordnung (DSGVO).
					</p>
				</section>

				<section className="imp_data_section">
					<h2>3. Hosting der Website</h2>
					<p>
						Unsere Website wird auf einem virtuellen Server (VPS) im
						Rechenzentrum in Nürnberg betrieben. Anbieter der
						Infrastruktur ist die{" "}
						<strong>
							netcup GmbH, Emmy-Noether-Straße 10, 76131 Karlsruhe
						</strong>
						,{" "}
						<a
							href="https://www.netcup.com/de"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://www.netcup.com/de
						</a>
						.
					</p>
					<p>
						Beim Aufruf der Website erfasst der Server automatisch
						technische Informationen (Server-Logfiles), darunter:
					</p>
					<ul>
						<li>IP-Adresse</li>
						<li>Datum und Uhrzeit des Zugriffs</li>
						<li>Browsertyp und Betriebssystem</li>
						<li>Referrer-URL</li>
						<li>Name und URL der abgerufenen Datei</li>
					</ul>
					<p>
						Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
						lit. f DSGVO. Unser berechtigtes Interesse ist der
						störungsfreie und sichere Betrieb der Website. Die
						Logfiles werden nur so lange gespeichert, wie es für
						diesen Zweck erforderlich ist, und danach gelöscht,
						sofern keine längere Aufbewahrung zur Aufklärung eines
						Sicherheitsvorfalls nötig ist.
					</p>
					<p>
						netcup verarbeitet diese Daten in unserem Auftrag auf
						Grundlage eines Vertrags nach Art. 28 DSGVO. Anmeldung,
						Mitgliederbereich und Formulare werden von dieser
						Website auf demselben Server ausgeliefert. Die
						Verarbeitung findet in Deutschland statt. Mit dem
						Hosting ist keine Übermittlung in ein Land außerhalb der
						EU oder des EWR verbunden. Weitere Informationen:{" "}
						<a
							href="https://www.netcup.com/de/kontakt/datenschutzerklaerung"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://www.netcup.com/de/kontakt/datenschutzerklaerung
						</a>
						.
					</p>
				</section>

				<section className="imp_data_section">
					<h2>4. Mitgliedskonto</h2>
					<p>
						Für das Mitgliedskonto verarbeiten wir die Angaben, die
						für die Führung der Mitgliedschaft und des
						geschützten Bereichs erforderlich sind, insbesondere:
					</p>
					<ul>
						<li>Anrede, Titel, Vor- und Nachname</li>
						<li>E-Mail-Adresse</li>
						<li>Mitgliedsnummer und Fachrichtung</li>
						<li>
							Zugangsdaten; das Passwort wird ausschließlich als
							Hash gespeichert
						</li>
						<li>
							Angaben, die Sie freiwillig im Profil hinterlegen,
							etwa Praxis- und Kontaktdaten
						</li>
					</ul>
					<p>
						Die Verarbeitung erfolgt zur Durchführung der
						Mitgliedschaft (Art. 6 Abs. 1 lit. b DSGVO). Gesetzliche
						Aufbewahrungspflichten bleiben unberührt (Art. 6 Abs. 1
						lit. c DSGVO).
					</p>
				</section>

				<section className="imp_data_section">
					<h2>5. Speicherung der Kontodaten (Sashido)</h2>
					<p>
						Kontodaten und zugehörige Einträge werden über unseren
						Dienstleister <strong>Sashido</strong> gespeichert und
						verarbeitet. Sashido betreibt die Infrastruktur
						überwiegend auf Servern von Amazon Web Services
						innerhalb der EU. Eine Übermittlung in Länder außerhalb
						der EU oder des EWR kann nicht ausgeschlossen werden.
						Sashido ist vertraglich auf ein angemessenes
						Datenschutzniveau verpflichtet.
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
						Wenn Sie den Newsletter abonnieren, verwenden wir Ihre
						E-Mail-Adresse, um Ihnen Informationen zu
						Veranstaltungen, Neuigkeiten und Angeboten des Verbands
						zu senden. Die Anmeldung erfolgt im
						Double-Opt-in-Verfahren. Rechtsgrundlage ist Ihre
						Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
					</p>
					<p>
						Sie können den Newsletter jederzeit abbestellen, über
						den Abmeldelink in der E-Mail oder per Nachricht an{" "}
						<a href="mailto:info@coloproktologen.de">
							info@coloproktologen.de
						</a>
						.
					</p>
				</section>

				<section className="imp_data_section">
					<h2>7. Cookies und Sitzung</h2>
					<p>
						Wir setzen keine Analyse- oder Marketing-Cookies. Nach
						der Anmeldung wird ein Sitzungs-Cookie gesetzt, damit
						der Mitgliederbereich Sie als angemeldete Person
						erkennt. Dieses Cookie ist für die Bereitstellung des
						Kontos erforderlich (Art. 6 Abs. 1 lit. b DSGVO) und
						wird mit dem Ende der Sitzung oder der Abmeldung
						gelöscht.
					</p>
					<p>
						Für Google Maps speichern wir Ihre Entscheidung
						(zugestimmt oder abgelehnt) in einem Cookie, damit die
						Abfrage nicht bei jedem Aufruf erneut erscheint.
						Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO. Sie
						können das Cookie in Ihrem Browser löschen; die Karte
						wird danach erst wieder nach einer neuen Zustimmung
						geladen.
					</p>
				</section>

				<section className="imp_data_section">
					<h2>8. Reichweitenmessung mit Simple Analytics</h2>
					<p>
						Wir nutzen Simple Analytics, einen Dienst der{" "}
						<strong>
							Simple Analytics B.V., Jacob van Lennepstraat 78 H,
							1053 HM Amsterdam, Niederlande
						</strong>
						, um zu verstehen, welche Seiten aufgerufen werden. Das
						Skript wird von{" "}
						<code>scripts.simpleanalyticscdn.com</code> geladen.
					</p>
					<p>
						Simple Analytics setzt keine Cookies und speichert nach
						eigenen Angaben keine IP-Adressen. Erfasst werden
						aggregierte Angaben wie aufgerufene Seite, Referrer,
						Browsertyp, Betriebssystem, Gerätetyp und das Land des
						Aufrufs. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
						Weitere Informationen:{" "}
						<a
							href="https://www.simpleanalytics.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://www.simpleanalytics.com/privacy
						</a>
						.
					</p>
				</section>

				<section className="imp_data_section">
					<h2>9. Google Maps</h2>
					<p>
						Zur Darstellung von Praxis- und Klinikstandorten und zur
						Prüfung eingegebener Adressen nutzen wir Google Maps und
						die Geocoding-Schnittstelle der{" "}
						<strong>
							Google Ireland Limited, Gordon House, Barrow Street,
							Dublin 4, Irland
						</strong>
						. Die Karte wird erst geladen, wenn Sie dem Hinweis auf
						der Seite zustimmen.
					</p>
					<p>
						Danach übermittelt Ihr Browser technische Daten,
						insbesondere die IP-Adresse, an Google. Bei der
						Adressprüfung werden die eingegebene Straße, Postleitzahl
						und der Ort an Google übermittelt, um die Adresse zu
						prüfen und Koordinaten zu ermitteln. Google kann diese
						Daten auf Servern außerhalb der EU, auch in den USA,
						verarbeiten.
					</p>
					<p>
						Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1
						lit. a DSGVO). Sie können die Einwilligung verweigern
						oder später widerrufen, indem Sie das Zustimmungs-Cookie
						löschen und die Karte nicht erneut aktivieren. Die
						Spezialistensuche bleibt ohne Kartenansicht nutzbar.
						Vorgeschlagene Adresskorrekturen können Sie ablehnen.
					</p>
					<p>
						Weitere Informationen:{" "}
						<a
							href="https://policies.google.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://policies.google.com/privacy
						</a>{" "}
						und{" "}
						<a
							href="https://www.google.com/intl/de_de/help/terms_maps/"
							target="_blank"
							rel="noopener noreferrer"
						>
							Nutzungsbedingungen von Google Maps
						</a>
						.
					</p>
				</section>

				<section className="imp_data_section">
					<h2>10. Weitergabe von Daten</h2>
					<p>
						Eine Weitergabe an Dritte erfolgt, wenn sie zur
						Durchführung der Mitgliedschaft erforderlich ist, Sie
						eingewilligt haben, wir gesetzlich dazu verpflichtet
						sind oder sie zur Wahrung berechtigter Interessen
						erforderlich ist. Technische Dienstleister in diesem
						Sinn sind insbesondere netcup, Sashido, Simple Analytics
						und, nach Ihrer Zustimmung, Google.
					</p>
				</section>

				<section className="imp_data_section">
					<h2>11. Ihre Rechte</h2>
					<ul>
						<li>
							Auskunft über gespeicherte Daten (Art. 15 DSGVO)
						</li>
						<li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
						<li>Löschung (Art. 17 DSGVO)</li>
						<li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
						<li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
						<li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
						<li>
							Widerruf erteilter Einwilligungen (Art. 7 Abs. 3
							DSGVO)
						</li>
						<li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
					</ul>
					<p>
						Zur Ausübung Ihrer Rechte genügen die Kontaktdaten unter
						Punkt 1. Zuständige Aufsichtsbehörde ist der
						Landesbeauftragte für den Datenschutz und die
						Informationsfreiheit Baden-Württemberg.
					</p>
				</section>

				<section className="imp_data_section">
					<h2>12. Sicherheit</h2>
					<p>
						Die Übertragung zwischen Ihrem Browser und unserem
						Server erfolgt verschlüsselt über HTTPS. Wir setzen
						technische und organisatorische Maßnahmen ein, um Ihre
						Daten vor Verlust, Missbrauch und unberechtigtem Zugriff
						zu schützen, und passen diese Maßnahmen an.
					</p>
				</section>

				<section className="imp_data_section">
					<h2>13. Änderungen</h2>
					<p>
						Diese Datenschutzerklärung kann angepasst werden, wenn
						sich die Verarbeitung oder die Rechtslage ändert.
						Maßgeblich ist die auf dieser Seite veröffentlichte
						Fassung (Stand: 25. November 2026).
					</p>
				</section>
			</ContentContainer>
		</Layout>
	);
};

export default Datenschutzerklaerung;
