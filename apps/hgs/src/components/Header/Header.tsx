import { Link, useRouterState } from "@tanstack/react-router";
import { site } from "../../content/site";
import { useActiveSection, useSectionScroll } from "@scroll";
import { Logo } from "../Logo";
import JobsDialog from "../JobsDialog/JobsDialog";
import styles from "./Header.module.css";

const sections = [
	{ id: "service", label: "Service" },
	{ id: "objekte", label: "Objekte" },
	{ id: "team", label: "Team" },
	{ id: "partner", label: "Partner" },
	{ id: "kontakt", label: "Kontakt" }
] as const;

const MailIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="M4 7l8 6 8-6" />
	</svg>
);

const PhoneIcon = () => (
	<svg viewBox="0 0 24 24" aria-hidden="true">
		<path d="M8 4h3l1.5 4-2 1.2a12 12 0 0 0 5.3 5.3L17 12.5 21 14v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 6 4h2z" />
	</svg>
);

const Header = () => {
	const pathname = useRouterState({
		select: (state) => state.location.pathname
	});
	const isHome = pathname === "/";
	const active = useActiveSection();
	const scrollToSection = useSectionScroll();

	return (
		<>
			<div className={styles.top}>
				<div className={styles.bar}>
					<Link
						to="/"
						className={styles.logo}
						aria-label="Zur Startseite"
					>
						<Logo size={36} />
					</Link>
					<div className={styles.actions}>
						<a
							className={styles.iconButton}
							href={`mailto:${site.email}`}
							aria-label="E-Mail schreiben"
						>
							<MailIcon />
						</a>
						<a
							className={styles.iconButton}
							href={site.mobileHref}
							aria-label="Anrufen"
						>
							<PhoneIcon />
						</a>
					</div>
				</div>
			</div>
			<div className={styles.bottom}>
				<div className={styles.bar}>
					{isHome ? (
						<nav
							className={styles.navLinks}
							aria-label="Abschnitte"
						>
							{sections.map((section) => (
								<button
									key={section.id}
									type="button"
									className={styles.link}
									data-active={active === section.id}
									onClick={() => scrollToSection(section.id)}
								>
									{section.label}
								</button>
							))}
							<span className={styles.hireMobile}>
								<JobsDialog compact />
							</span>
						</nav>
					) : (
						<Link to="/" className={styles.back}>
							Zurück zur Startseite
						</Link>
					)}
					{isHome ? (
						<span className={styles.hire}>
							<JobsDialog />
						</span>
					) : null}
				</div>
			</div>
		</>
	);
};

export default Header;
