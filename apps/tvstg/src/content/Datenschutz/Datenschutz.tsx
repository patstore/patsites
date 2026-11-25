import React from "react";
import { Layout } from "@components";
import { HeadContent } from "@ui";

const Datenschutzerklaerung: React.FC = () => (
	<Layout>
		<div className="wrapper">
			<HeadContent
				titel="Datenschutzerklärung"
				titeltext="Allgemeine Informationen zum Datenschutz"
			/>
			<div className="site-container">
				<p>
					Verantwortlicher im Sinne der Datenschutz-Grundverordnung
					(DSGVO) ist:
				</p>
				<p>
					TV Freiburg St. Georgen von 1897 e.V.
					<br />
					Blumenstraße 9
					<br />
					79111 Freiburg
				</p>
				<p>
					E-Mail:{" "}
					<a href="mailto:datenschutz@tvstg.de">
						datenschutz@tvstg.de
					</a>
				</p>

				<h2>Hosting</h2>
				<p>
					Diese Website wird auf einem virtuellen Server (VPS) im
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
					Beim Aufruf der Website verarbeitet der Server die technisch
					erforderlichen Verbindungsdaten (Server-Logfiles). Dazu
					gehören insbesondere:
				</p>
				<ul>
					<li>IP-Adresse</li>
					<li>Datum und Uhrzeit des Abrufs</li>
					<li>aufgerufene Adresse und übertragene Datenmenge</li>
					<li>Browsertyp und Betriebssystem</li>
					<li>Referrer-URL</li>
				</ul>
				<p>
					Die Verarbeitung dient der Auslieferung der Website und der
					Sicherheit des Betriebs, insbesondere der Erkennung von
					Störungen und Angriffen. Rechtsgrundlage ist Art. 6 Abs. 1
					lit. f DSGVO. Die Logfiles werden nur so lange gespeichert,
					wie es für diese Zwecke erforderlich ist, und danach
					gelöscht, sofern keine längere Aufbewahrung zur Aufklärung
					eines Sicherheitsvorfalls nötig ist.
				</p>
				<p>
					netcup verarbeitet diese Daten in unserem Auftrag auf
					Grundlage eines Vertrags nach Art. 28 DSGVO. Die
					Verarbeitung findet in Deutschland statt. Mit dem Hosting
					ist keine Übermittlung in ein Land außerhalb der EU oder des
					EWR verbunden. Weitere Informationen:{" "}
					<a
						href="https://www.netcup.com/de/kontakt/datenschutzerklaerung"
						target="_blank"
						rel="noopener noreferrer"
					>
						Datenschutzerklärung von netcup
					</a>
					.
				</p>

				<h2>Kontaktformulare</h2>
				<p>
					Wenn Sie uns über ein Formular schreiben, verarbeiten wir
					die von Ihnen eingegebenen Angaben, um die Anfrage
					zuzuordnen und zu beantworten. Je nach Formular sind das
					insbesondere Name, E-Mail-Adresse, Telefonnummer, Betreff
					und Nachricht. Die Angabe von Name und einer gültigen
					E-Mail-Adresse ist erforderlich, damit wir antworten können.
					Weitere Angaben sind freiwillig.
				</p>
				<p>
					Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die
					Anfrage der Anbahnung oder Durchführung einer Mitgliedschaft
					oder einer anderen Vereinbarung dient, im Übrigen Art. 6
					Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ist die
					Bearbeitung Ihrer Anfrage.
				</p>
				<p>
					Die Angaben werden gelöscht, sobald die Anfrage abschließend
					bearbeitet ist und keine gesetzlichen Aufbewahrungspflichten
					entgegenstehen. Kommt ein Vertragsverhältnis zustande,
					gelten die gesetzlichen Aufbewahrungsfristen.
				</p>

				<h2>Reichweitenmessung mit Simple Analytics</h2>
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
					Aufrufs. Die Daten werden nicht dazu verwendet, einzelne
					Besucher wiederzuerkennen. Rechtsgrundlage ist Art. 6 Abs. 1
					lit. f DSGVO. Weitere Informationen:{" "}
					<a
						href="https://www.simpleanalytics.com/privacy"
						target="_blank"
						rel="noopener noreferrer"
					>
						https://www.simpleanalytics.com/privacy
					</a>
					.
				</p>

				<h2>Cookies und lokale Speicherung</h2>
				<p>
					Die öffentliche Website setzt keine Tracking-Cookies. Ihre
					gewählte Darstellung (hell oder dunkel) wird lokal in Ihrem
					Browser gespeichert (localStorage) und nicht an uns
					übermittelt.
				</p>
				<p>
					Für die redaktionelle Vorschau kann ein technisch
					erforderliches Cookie gesetzt werden. Besucherinnen und
					Besucher der öffentlichen Website erhalten dieses Cookie
					nicht.
				</p>

				<h2>Links zu Facebook und Instagram</h2>
				<p>
					Auf der Website finden Sie Links zu unseren Auftritten bei
					Facebook und Instagram. Erst wenn Sie einen solchen Link
					öffnen, gelten die Datenschutzbestimmungen der jeweiligen
					Plattform. Beim bloßen Besuch unserer Website werden keine
					Daten an Facebook oder Instagram übermittelt.
				</p>

				<h2>SSL-Verschlüsselung</h2>
				<p>
					Die Übertragung zwischen Ihrem Browser und unserem Server
					erfolgt verschlüsselt über HTTPS.
				</p>

				<h2>Ihre Rechte</h2>
				<p>Sie haben gegenüber uns folgende Rechte:</p>
				<ul>
					<li>
						Auskunft über Ihre bei uns gespeicherten Daten und deren
						Verarbeitung (Art. 15 DSGVO)
					</li>
					<li>
						Berichtigung unrichtiger personenbezogener Daten (Art.
						16 DSGVO)
					</li>
					<li>Löschung (Art. 17 DSGVO)</li>
					<li>
						Einschränkung der Verarbeitung (Art. 18 DSGVO)
					</li>
					<li>
						Datenübertragbarkeit, soweit die Verarbeitung auf einer
						Einwilligung oder einem Vertrag beruht (Art. 20 DSGVO)
					</li>
					<li>
						Widerspruch gegen Verarbeitungen auf Grundlage von Art.
						6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)
					</li>
					<li>
						Widerruf einer Einwilligung mit Wirkung für die Zukunft
						(Art. 7 Abs. 3 DSGVO)
					</li>
				</ul>
				<p>
					Sie können sich bei einer Datenschutzaufsichtsbehörde
					beschweren, etwa bei der Aufsichtsbehörde Ihres Wohnsitzes
					oder bei der für uns zuständigen Behörde in
					Baden-Württemberg. Eine Liste der Aufsichtsbehörden finden
					Sie unter{" "}
					<a
						href="https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html"
						target="_blank"
						rel="noopener noreferrer"
					>
						https://www.bfdi.bund.de/DE/Service/Anschriften/Laender/Laender-node.html
					</a>
					.
				</p>
				<p>
					Widerspruch und sonstige Anfragen richten Sie an:
					<br />
					TV Freiburg St. Georgen
					<br />
					Martin Radtke
					<br />
					Blumenstraße 9
					<br />
					79111 Freiburg
					<br />
					<a href="mailto:datenschutz@tvstg.de">
						datenschutz@tvstg.de
					</a>
				</p>

				<h2>Änderung dieser Erklärung</h2>
				<p>
					Wir passen diese Datenschutzerklärung an, wenn sich die
					Verarbeitung oder die Rechtslage ändert. Es gilt die jeweils
					auf dieser Seite veröffentlichte Fassung (Stand: 25.
					November 2026).
				</p>
			</div>
		</div>
	</Layout>
);

export default Datenschutzerklaerung;
