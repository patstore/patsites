import { Layout, PageHeader } from "@components";
import { Link } from "@tanstack/react-router";
import styles from "./Privacy.module.css";

const Privacy = () => {
	return (
		<Layout>
			<PageHeader
				eyebrow="Rechtliches"
				title="Datenschutz"
				lead="Wie wir mit Ihren Daten umgehen."
			/>
			<div className="page-body">
				<div className={styles.prose}>
					<p>
						Verantwortlich für die Verarbeitung personenbezogener
						Daten auf dieser Website ist das Hebammenteam Coming
						Home in Freiburg. Die postalische Anschrift und die
						weiteren Pflichtangaben stehen im{" "}
						<Link to="/impressum">Impressum</Link>.
					</p>

					<h2>Hosting</h2>
					<p>
						Diese Website wird auf einem virtuellen Server (VPS) im
						Rechenzentrum in Nürnberg betrieben. Anbieter der
						Infrastruktur ist die netcup GmbH, Emmy-Noether-Straße
						10, 76131 Karlsruhe (
						<a
							href="https://www.netcup.com/de"
							target="_blank"
							rel="noopener noreferrer"
						>
							netcup.com
						</a>
						).
					</p>
					<p>
						Beim Aufruf verarbeitet der Server die technisch
						erforderlichen Verbindungsdaten: IP-Adresse, Datum und
						Uhrzeit, aufgerufene Adresse, Browsertyp, Betriebssystem
						und Referrer. Das ist erforderlich, um die Seite
						auszuliefern und den Betrieb abzusichern.
						Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Die
						Logfiles werden nur so lange gespeichert, wie es für
						diesen Zweck erforderlich ist.
					</p>
					<p>
						netcup verarbeitet diese Daten in unserem Auftrag auf
						Grundlage eines Vertrags nach Art. 28 DSGVO. Die
						Verarbeitung findet in Deutschland statt. Mit dem
						Hosting ist keine Übermittlung in ein Land außerhalb der
						EU oder des EWR verbunden. Weitere Informationen stehen
						in der{" "}
						<a
							href="https://www.netcup.com/de/kontakt/datenschutzerklaerung"
							target="_blank"
							rel="noopener noreferrer"
						>
							Datenschutzerklärung von netcup
						</a>
						.
					</p>

					<h2>Kontakt</h2>
					<p>
						Wenn Sie einer Hebamme schreiben, verarbeiten wir Name,
						E-Mail-Adresse und Nachricht, um die Anfrage an die
						angesprochene Hebamme weiterzugeben und zu beantworten.
						Rechtsgrundlage ist die Anbahnung der Betreuung (Art. 6
						Abs. 1 lit. b DSGVO) oder unser berechtigtes Interesse an
						der Kommunikation (Art. 6 Abs. 1 lit. f DSGVO).
					</p>
					<p>
						Die Angaben werden gelöscht, sobald die Anfrage
						abschließend bearbeitet ist, sofern keine gesetzlichen
						Aufbewahrungspflichten entgegenstehen.
					</p>

					<h2>Kursanmeldung</h2>
					<p>
						Für die Anmeldung zu einem Kurs verarbeiten wir die
						Angaben aus dem Formular: Name, Geburtsdatum, Anschrift,
						Telefonnummern, E-Mail-Adresse, gewählter Kurs und
						Termin, Krankenversicherung, Kassen- und
						Versichertennummer, Name der Begleitperson, Angaben zum
						Kind und den voraussichtlichen Geburtstermin.
					</p>
					<p>
						Geburtstermin, Versicherungsangaben und damit
						zusammenhängende Angaben können Gesundheitsdaten sein.
						Wir verarbeiten sie nur, um die Anmeldung
						durchzuführen und die Kursbegleitung vorzubereiten.
						Rechtsgrundlage ist der Kursvertrag (Art. 6 Abs. 1 lit.
						b DSGVO) und, soweit Gesundheitsdaten betroffen sind,
						Ihre Einwilligung im Formular (Art. 9 Abs. 2 lit. a
						DSGVO). Die Einwilligung können Sie mit Wirkung für die
						Zukunft widerrufen. Eine bereits durchgeführte
						Anmeldung bleibt davon unberührt, soweit wir die Daten
						für den Vertrag oder gesetzliche Pflichten noch
						benötigen.
					</p>

					<h2>Cookies</h2>
					<p>
						Die öffentliche Website setzt keine Tracking-Cookies.
						Für die redaktionelle Vorschau kann ein technisch
						erforderliches Cookie gesetzt werden. Besucherinnen und
						Besucher der öffentlichen Website erhalten dieses Cookie
						nicht.
					</p>

					<h2>Verschlüsselung</h2>
					<p>
						Die Übertragung zwischen Ihrem Browser und unserem
						Server erfolgt verschlüsselt über HTTPS.
					</p>

					<h2>Ihre Rechte</h2>
					<ul>
						<li>
							Auskunft, Berichtigung und Löschung (Art. 15 bis 17
							DSGVO)
						</li>
						<li>
							Einschränkung der Verarbeitung und
							Datenübertragbarkeit (Art. 18 und 20 DSGVO)
						</li>
						<li>
							Widerspruch gegen Verarbeitungen auf Grundlage von
							Art. 6 Abs. 1 lit. f DSGVO (Art. 21 DSGVO)
						</li>
						<li>
							Widerruf einer Einwilligung mit Wirkung für die
							Zukunft (Art. 7 Abs. 3 DSGVO)
						</li>
						<li>
							Beschwerde bei einer Datenschutzaufsichtsbehörde,
							zuständig ist der Landesbeauftragte für den
							Datenschutz und die Informationsfreiheit
							Baden-Württemberg (Art. 77 DSGVO)
						</li>
					</ul>
					<p>
						Anfragen richten Sie an die im Impressum genannte
						Stelle. Stand: 25. November 2026.
					</p>
				</div>
			</div>
		</Layout>
	);
};

export default Privacy;
