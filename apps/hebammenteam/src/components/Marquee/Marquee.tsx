import "@data";
import type { EntryClass } from "@data";
import { isDraftMode, loadStaticRecords } from "@repo/server";
import styles from "./Marquee.module.css";

const recordStates = isDraftMode() ? null : (["published"] as const);
const FLOWER = "/logo_coming_home.webp";
const COPIES = 3;

const Marquee = () => {
	const services = loadStaticRecords<EntryClass>("Entry", {
		states: recordStates
	}).filter((service) => service.title);

	if (services.length === 0) {
		return null;
	}

	const loop = Array.from({ length: COPIES }, () => services).flat();

	return (
		<section className={styles.marquee} aria-label="Unsere Leistungen">
			<ul className={styles.srOnly}>
				{services.map((service) => (
					<li key={service.objectId}>{service.title}</li>
				))}
			</ul>
			<div className={styles.viewport}>
				<div
					className={styles.track}
					style={{ ["--marquee-span" as string]: loop.length }}
				>
					{[0, 1].map((copy) => (
						<ul key={copy} className={styles.group} aria-hidden="true">
							{loop.map((service, index) => (
								<li
									key={`${copy}-${service.objectId}-${index}`}
									className={styles.item}
								>
									<span className={styles.label}>{service.title}</span>
									<img
										className={styles.flower}
										src={FLOWER}
										alt=""
										width={28}
										height={28}
									/>
								</li>
							))}
						</ul>
					))}
				</div>
			</div>
		</section>
	);
};

export default Marquee;
