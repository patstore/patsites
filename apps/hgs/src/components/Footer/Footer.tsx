import { Link } from "@tanstack/react-router";
import { site } from "../../content/site";
import { Logo } from "../Logo";
import styles from "./Footer.module.css";

const Footer = () => (
	<footer className={styles.footer}>
		<div className={`container ${styles.grid}`}>
			<div>
				<Logo size={56} />
				<p>
					Unser, im April 2011 gegründetes Dienstleistungsunternehmen
					hat seinen Standort in Freiburg-St. Georgen und bietet Ihnen
					einen umfassenden Service in der Haus- und Grundstückspflege
					für Mehrfamilienwohn- und Geschäftshäuser.
				</p>
			</div>
			<p>
				{site.name}
				<br />
				{site.street}
				<br />
				{site.postalCode} {site.city}
			</p>
			<p>
				<a href={`mailto:${site.email}`}>{site.email}</a>
				<br />
				Tel.: <a href={site.phoneHref}>{site.phoneDisplay}</a>
				<br />
				Mobil: <a href={site.mobileHref}>{site.mobileDisplay}</a>
			</p>
		</div>
		<div className={`container ${styles.legal}`}>
			<p>
				<Link to="/impressum">Impressum</Link>
				{" | "}
				<Link to="/datenschutz">Datenschutz</Link>
				{" | "}© {new Date().getFullYear()}
			</p>
		</div>
	</footer>
);

export default Footer;
