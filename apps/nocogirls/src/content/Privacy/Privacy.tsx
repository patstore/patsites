import { useLocalization } from "@repo/core";
import { Footer } from "@components";
import styles from "./Privacy.module.scss";

export function Privacy() {
	const { language } = useLocalization();
	const english = language === "en";

	return (
		<>
			<article className={styles.privacy}>
				<p className="eyebrow">{english ? "Legal" : "Rechtliches"}</p>
				<h1>{english ? "Privacy" : "Datenschutz"}</h1>
				{english ? <English /> : <German />}
			</article>
			<Footer />
		</>
	);
}

function German() {
	return (
		<>
			<p>
				Verantwortlich für diese Website sind Flawia und Theresa. Sie
				erreichen uns unter{" "}
				<a href="mailto:nocogirls@nocogirls.com">
					nocogirls@nocogirls.com
				</a>
				. Die postalische Anschrift teilen wir auf Anfrage mit.
			</p>

			<h2>Hosting</h2>
			<p>
				Die Website wird auf einem virtuellen Server (VPS) im
				Rechenzentrum in Nürnberg betrieben. Anbieter der Infrastruktur
				ist die netcup GmbH, Emmy-Noether-Straße 10, 76131 Karlsruhe (
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
				Beim Aufruf verarbeitet der Server die technisch erforderlichen
				Verbindungsdaten: IP-Adresse, Datum und Uhrzeit, aufgerufene
				Adresse, Browsertyp, Betriebssystem und Referrer. Das ist
				erforderlich, um die Seite auszuliefern und den Betrieb
				abzusichern. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
				Die Logfiles werden nur so lange gespeichert, wie es für diesen
				Zweck erforderlich ist.
			</p>
			<p>
				netcup verarbeitet diese Daten in unserem Auftrag auf Grundlage
				eines Vertrags nach Art. 28 DSGVO. Die Verarbeitung findet in
				Deutschland statt. Mit dem Hosting ist keine Übermittlung in
				ein Land außerhalb der EU oder des EWR verbunden. Weitere
				Informationen stehen in der{" "}
				<a
					href="https://www.netcup.com/de/kontakt/datenschutzerklaerung"
					target="_blank"
					rel="noopener noreferrer"
				>
					Datenschutzerklärung von netcup
				</a>
				.
			</p>

			<h2>Darstellung</h2>
			<p>
				Die gewählte Darstellung (hell oder dunkel) bleibt lokal in
				Ihrem Browser (localStorage) und wird nicht an uns übermittelt.
				Die öffentliche Website setzt keine Tracking-Cookies. Für eine
				redaktionelle Vorschau kann ein technisch erforderliches Cookie
				gesetzt werden. Besucherinnen und Besucher der öffentlichen
				Website erhalten dieses Cookie nicht.
			</p>

			<h2>Instagram</h2>
			<p>
				Ein Link zu Instagram übermittelt allein noch keine Daten an
				Meta. Erst wenn Sie den Link öffnen, gelten die
				Datenschutzbestimmungen von Instagram.
			</p>

			<h2>Verschlüsselung</h2>
			<p>
				Die Übertragung zwischen Ihrem Browser und unserem Server
				erfolgt verschlüsselt über HTTPS.
			</p>

			<h2>Ihre Rechte</h2>
			<p>
				Sie haben das Recht auf Auskunft, Berichtigung, Löschung,
				Einschränkung der Verarbeitung, Datenübertragbarkeit und
				Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs.
				1 lit. f DSGVO. Sie können sich bei einer
				Datenschutzaufsichtsbehörde beschweren. Anfragen richten Sie an{" "}
				<a href="mailto:nocogirls@nocogirls.com">
					nocogirls@nocogirls.com
				</a>
				.
			</p>
			<p>Stand: 25. November 2026.</p>
		</>
	);
}

function English() {
	return (
		<>
			<p>
				Flawia and Theresa are responsible for this website. You can
				reach us at{" "}
				<a href="mailto:nocogirls@nocogirls.com">
					nocogirls@nocogirls.com
				</a>
				. We will provide the postal address on request.
			</p>

			<h2>Hosting</h2>
			<p>
				This website runs on a virtual private server in a data center
				in Nuremberg, Germany. The infrastructure is provided by netcup
				GmbH, Emmy-Noether-Straße 10, 76131 Karlsruhe, Germany (
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
				When you open the site, the server processes the connection
				data required to deliver it: IP address, date and time,
				requested address, browser, operating system, and referrer.
				The legal basis is Article 6(1)(f) GDPR. Log files are kept
				only for as long as this purpose requires.
			</p>
			<p>
				netcup processes this data on our behalf under a contract
				pursuant to Article 28 GDPR. Processing takes place in Germany.
				Hosting does not involve a transfer to a country outside the EU
				or the EEA. Further information is in{" "}
				<a
					href="https://www.netcup.com/de/kontakt/datenschutzerklaerung"
					target="_blank"
					rel="noopener noreferrer"
				>
					netcup’s privacy notice
				</a>
				.
			</p>

			<h2>Display settings</h2>
			<p>
				Your chosen appearance (light or dark) stays in your browser
				(localStorage) and is not sent to us. The public site does not
				set tracking cookies. A technical cookie may be set for an
				editorial preview. Visitors of the public site do not receive
				that cookie.
			</p>

			<h2>Instagram</h2>
			<p>
				A link to Instagram does not by itself send data to Meta. Data
				is processed under Instagram’s own policy only after you open
				the link.
			</p>

			<h2>Encryption</h2>
			<p>
				Traffic between your browser and our server is encrypted with
				HTTPS.
			</p>

			<h2>Your rights</h2>
			<p>
				You may request access, rectification, erasure, restriction,
				and portability, and you may object to processing based on
				Article 6(1)(f) GDPR. You may lodge a complaint with a
				supervisory authority. Please write to{" "}
				<a href="mailto:nocogirls@nocogirls.com">
					nocogirls@nocogirls.com
				</a>
				.
			</p>
			<p>Last updated: 25 November 2026.</p>
		</>
	);
}
