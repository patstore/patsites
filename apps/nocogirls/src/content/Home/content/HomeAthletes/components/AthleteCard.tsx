import { useLocalization } from "@repo/core";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AnimateText } from "@animations";
import { toLocalizedHref } from "@provider";
import { useResolveImage } from "@ui";
import type { PersonRecord } from "@types";
import styles from "../HomeAthletes.module.scss";

export function AthleteCard({ athlete }: { athlete: PersonRecord }) {
	const navigate = useNavigate();
	const { language } = useLocalization();
	const resolveImage = useResolveImage();
	const src = athlete.image ? resolveImage(athlete.image) : undefined;
	const href = toLocalizedHref(
		`/athletes/${athlete.slug ?? athlete.objectId}`,
		language
	);
	const words = (athlete.title ?? "").split(" ").filter(Boolean);

	return (
		<div className={styles.athlete_card}>
			<div className={styles.athlete_card_image}>
				{src ? <img src={src} alt={athlete.title ?? ""} /> : null}
				<div className={styles.athlete_card_content}>
					<div className={styles.athlete_card_title}>
						{words.map((word, index) => (
							<AnimateText
								key={`${word}-${index}`}
								delay={index * 0.1}
								duration={0.5}
								className={styles.athlete_card_title_phrase}
							>
								<h3>{word}</h3>
							</AnimateText>
						))}
					</div>
					<div className={styles.athlete_card_button}>
						<a
							href={href}
							onClick={(event) => {
								event.preventDefault();
								void navigate({ href });
							}}
						>
							<button className="round_button" type="button">
								<ArrowRight />
							</button>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
}
