import { Field, RichTextField, Section } from "@repo/core";
import { Footer } from "@components";
import styles from "./About.module.scss";

export function About() {
	return (
		<>
			<Section id="About">
				<section className={styles.about}>
					<div className={styles.about_header}>
						<div className="eyebrow">
							<Field id="eyebrow">
								The people behind this site
							</Field>
						</div>
						<h1>
							<Field id="title">About Us</Field>
						</h1>
					</div>
					<div className={styles.about_content}>
						<RichTextField id="content">
							We are Flawia and Theresa, two female photographers
							who have been working at Nordic Combined
							competitions for many years. Following the
							IOC&apos;s devastating decision against accepting
							female NC athletes for the 2026 Olympics, we are now
							more determined than ever to get them there! Our
							goal is to give them a platform and to promote them
							with a professional online presence to attract
							sponsors and broaden their opportunities. We created
							this website where we are mainly sharing pictures
							and short news from the competitions. We aim to
							convey how undenialably strong, hard working and
							determined the women competing in NC are. If you are
							interested in supporting our project please
							don&apos;t hesitate to contact us.
							nocogirls@nocogirls.comor just visit our instagram
							page @nocogirls.
						</RichTextField>
					</div>
				</section>
			</Section>
			<Footer />
		</>
	);
}
