import { useLocalization } from "@repo/core";
import { useNavigate } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { siteLocalization, toLocalizedHref } from "@provider";
import { getHeaderNavItems } from "../Header";
import styles from "./Footer.module.scss";

export type FooterProps = {
	size?: "small" | "large";
};

export function Footer({ size = "large" }: FooterProps) {
	const navigate = useNavigate();
	const { language } = useLocalization();
	const navItems = getHeaderNavItems(
		language,
		siteLocalization.defaultLanguage
	);

	if (size === "small") {
		return (
			<div className={styles.footer_bottom}>
				<div>
					<p>{new Date().getFullYear()}</p>
				</div>
				<div className={styles.footer_bottom_list}>
					<a>Impressum</a>
					<a href={toLocalizedHref("/datenschutz", language)}>
						{language === "en" ? "Privacy" : "Datenschutz"}
					</a>
					<a>Contact</a>
				</div>
			</div>
		);
	}

	return (
		<footer className={styles.footer}>
			<div className={styles.footer_top}>
				<div className={styles.footer_logo_container}>
					<span className={styles.logo_text}>
						<span>no</span>
						<span>co</span>
						<span>girls</span>
					</span>
				</div>
				<div className={styles.footer_links_container}>
					{navItems.map((item) => (
						<button
							key={item.path}
							type="button"
							onClick={() =>
								void navigate({
									href: toLocalizedHref(item.path, language)
								})
							}
						>
							{item.label}
						</button>
					))}
					<div className="divider" />
					<div className="button dark">
						<span>Follow us on Instagram</span>
						<Instagram size={12} />
					</div>
				</div>
			</div>
			<div className={styles.footer_bottom}>
				<div>
					<p>{new Date().getFullYear()}</p>
				</div>
				<div className="flex row align-center gap-md justify-center">
					<div className="footer_links">
						<a href={toLocalizedHref("/datenschutz", language)}>
							{language === "en" ? "Privacy" : "Datenschutz"}
						</a>
					</div>
					<div className="footer_links">
						<a href="https://www.no-co-girls.com/impressum">
							Impressum
						</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
