import { useEffect, useId, useState } from "react";
import { site } from "../../content/site";
import styles from "./JobsDialog.module.css";

type JobsDialogProps = {
	compact?: boolean;
};

const JobsDialog = ({ compact = false }: JobsDialogProps) => {
	const titleId = useId();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (!open) {
			return;
		}
		const onKey = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setOpen(false);
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

	return (
		<>
			<button
				type="button"
				className={compact ? styles.compact : styles.trigger}
				onClick={() => setOpen(true)}
			>
				{compact ? "Mitarbeiter gesucht" : "Wir stellen ein!"}
			</button>
			{open ? (
				<div className={styles.layer}>
					<button
						type="button"
						className={styles.backdrop}
						aria-label="Schließen"
						onClick={() => setOpen(false)}
					/>
					<div
						className={styles.panel}
						role="dialog"
						aria-modal="true"
						aria-labelledby={titleId}
					>
						<button
							type="button"
							className={styles.close}
							onClick={() => setOpen(false)}
						>
							Schließen
						</button>
						<h2 id={titleId}>Wir stellen ein!</h2>
						<div className={styles.body}>
							<h3>Wir suchen Verstärkung</h3>
							<p>
								Die <strong>{site.name}</strong> kümmert sich um
								die Reinigung und Pflege von Wohnanlagen in
								Freiburg und Umgebung. Zur Unterstützung unseres
								Teams suchen wir Sie für:
							</p>
							<h3>Ihre Aufgaben</h3>
							<ul>
								<li>Treppenhausreinigung</li>
								<li>Gehwegreinigung</li>
								<li>Rückschnittarbeiten</li>
								<li>Technische Kontrollen</li>
								<li>Winterdienst</li>
							</ul>
							<h3>Ihr Profil</h3>
							<ul>
								<li>
									Erfahrung in Gebäudereinigung und
									Gartenpflege
								</li>
								<li>
									Technisches Verständnis und Führerschein
									(Klasse B)
								</li>
								<li>
									Zuverlässigkeit, Flexibilität und
									eigenständige Arbeitsweise
								</li>
								<li>
									Bereitschaft zu Winterdiensten (auch am
									Wochenende)
								</li>
							</ul>
							<h3>Wir bieten</h3>
							<ul>
								<li>
									Abwechslungsreiche Aufgaben und ein nettes
									Team
								</li>
								<li>Option auf eine 4-Tage-Woche</li>
								<li>Arbeitskleidung und weitere Benefits</li>
							</ul>
							<h3>Interesse?</h3>
							<p>
								Rufen Sie uns an:{" "}
								<a href={site.mobileHref}>
									<strong>{site.mobileDisplay}</strong>
								</a>{" "}
								(Thomas Hanke).
							</p>
							<p>
								Bewerbungen mit Eintrittswunsch per E-Mail:{" "}
								<a href={`mailto:${site.email}`}>
									{site.email}
								</a>
							</p>
						</div>
						<a className="button" href={`mailto:${site.email}`}>
							Schreiben Sie uns jetzt
						</a>
					</div>
				</div>
			) : null}
		</>
	);
};

export default JobsDialog;
