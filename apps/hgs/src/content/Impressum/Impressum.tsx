import { Layout } from "@components";
import { site } from "../site";
import styles from "./Legal.module.css";

const Impressum = () => (
	<Layout>
		<article className={`container prose ${styles.page}`}>
			<h1>Impressum</h1>
			<h2>Kontakt</h2>
			<p>
				{site.name}
				<br />
				{site.street}
				<br />
				{site.postalCode} {site.city}
			</p>
			<p>
				Telefon: <a href={site.phoneHref}>{site.phoneDisplay}</a>
				<br />
				E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
			</p>
			<p>Vertretungsberechtigte Geschäftsführer: {site.directors}</p>
			<p>
				<strong>Eintragung im Handelsregister:</strong>
				<br />
				Registergericht: {site.registerCourt}
				<br />
				Registernummer: {site.registerNumber}
			</p>
			<p>
				Umsatzsteuer-Identifikationsnummer gemäß § 27 a
				Umsatzsteuergesetz: {site.vatId}
			</p>
			<h2>Urheberrechte</h2>
			<p>
				Inhalt, Zusammenstellung, Struktur und Präsentation der
				Webseiten sind urheberrechtlich geschützt. Die Vervielfältigung
				und Verbreitung von Informationen oder Daten ohne vorherige
				schriftliche Zustimmung des Herausgebers ist untersagt. Dies
				gilt auch für die auszugsweise Vervielfältigung und Verbreitung.
			</p>
			<h2>Gewährleistungsausschluss</h2>
			<p>
				Wir prüfen und aktualisieren die Informationen auf unserer
				Webseite ständig. Trotz aller Sorgfalt können sich die Angaben
				inzwischen verändert haben. Eine Haftung oder Garantie für die
				Aktualität, Richtigkeit und Vollständigkeit der zur Verfügung
				gestellten Informationen kann deshalb nicht übernommen werden.
			</p>
		</article>
	</Layout>
);

export default Impressum;
