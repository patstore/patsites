import { AnimateText } from "@animations";
import { useResolveImage } from "@ui";
import type { EventRecord } from "@types";
import styles from "../HomeHero.module.scss";

export function HeroEvent({ event }: { event: EventRecord }) {
	const resolveImage = useResolveImage();
	const title = event.title ?? "";
	const src = event.image ? resolveImage(event.image) : undefined;

	console.log(event);

	return (
		<div className={styles.hero_event}>
			{src ? (
				<>
					<div
						className={styles.hero_image}
						style={{ backgroundImage: `url("${src}")` }}
						aria-hidden="true"
					/>
					<div className={styles.hero_image_overlay} />
				</>
			) : null}
			<div className={styles.hero_content}>
				<h2>
					{title.split(" ").map((word, index) => (
						<AnimateText
							key={`${word}-${index}`}
							delay={index * 0.1}
							duration={0.5}
							className={styles.hero_event_title_phrase}
						>
							{word}
						</AnimateText>
					))}
				</h2>
			</div>
		</div>
	);
}
