import { ContactForm, Layout, Mosaic } from "@components";
import { useSectionScroll } from "@scroll";
import { site } from "../site";
import { directors, objects, partners, services } from "./content/data";
import styles from "./Home.module.css";

const Home = () => {
	const scrollToSection = useSectionScroll();

	return (
		<Layout>
			<section className={styles.hero}>
				<div className={`container ${styles.heroCopy}`}>
					<h1>
						Haus- und
						<br /> Grundstückservice
						<br /> GmbH
					</h1>
					<p>{site.description}</p>
					<button
						type="button"
						className="button"
						onClick={() => scrollToSection("kontakt")}
					>
						Schreiben Sie uns
					</button>
				</div>
				<div className={styles.heroMosaic}>
					<Mosaic variant="hero" />
				</div>
			</section>

			<section className={styles.section} id="service">
				<div className="container">
					<p className={styles.eyebrow}>Service</p>
					<h2 className={styles.copy}>
						Wir bieten das komplette Paket rund um ihr Haus
					</h2>
					<p className={styles.copy}>
						Wir bieten unsere Dienstleistung als Komplettangebot mit
						Treppen- und Außenreinigung, Gartenpflege, Winterdienst,
						technische Betreuung und Rufbereitschaft an, erstellen
						Ihnen jedoch auch gerne ein individuelles und auf Ihren
						Bedarf zugeschnittenes Angebot. Nehmen Sie Kontakt mit
						uns auf.
					</p>
					<div className={styles.services}>
						{services.map((service) => (
							<article
								key={service.title}
								className={styles.service}
							>
								<img src={service.icon} alt="" />
								<h3>{service.title}</h3>
								<p>{service.text}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className={styles.band}>
				<div className={`container ${styles.bandInner}`}>
					<img
						className={styles.bandIcon}
						src="/images/icons/icon_notdienst.png"
						alt=""
					/>
					<div>
						<h2>24 Stunden Notdienst</h2>
						<p>Wir betreuen unsere Objekte rund um die Uhr.</p>
					</div>
				</div>
			</section>

			<section className={styles.section} id="objekte">
				<div className={`container ${styles.objects}`}>
					<div>
						<p className={styles.eyebrow}>Objekte</p>
						<h2>Eine Auswahl unserer Objekte</h2>
						<p>
							Der persönliche Kontakt und die örtliche Nähe zu den
							betreuenden Anwesen ist uns ein großes Anliegen,
							weshalb wir unser Dienstleistungsangebot vorwiegend
							auf den Raum Freiburg und die angrenzenden Gemeinden
							konzentrieren.
						</p>
						<p>
							Derzeit betreuen wir 115 Objekte in Freiburg,
							Merzhausen, Umkirch und Hugstetten für private
							Kunden und Eigentümergemeinschaften und sind in der
							Umgebung gut vernetzt. Der gute Kontakt zu
							Hausverwaltungen und Handwerksbetrieben aus der
							Region ist uns sehr wichtig und bietet uns eine
							verlässliche Zusammenarbeit.
						</p>
						<button
							type="button"
							className="button"
							onClick={() => scrollToSection("kontakt")}
						>
							Jetzt kontaktieren
						</button>
					</div>
					<div className={styles.objectGrid}>
						{objects.map((object) => (
							<article
								key={object.title}
								className={styles.objectCard}
							>
								<img src={object.image} alt={object.title} />
								<h4>{object.title}</h4>
							</article>
						))}
					</div>
				</div>
			</section>

			<section className={styles.band}>
				<div className={`container ${styles.bandInner}`}>
					<div>
						<h2>Gehwegreinigung</h2>
						<p>
							Professionell und effiziente Reinigung mit moderner
							Ausstattung.
						</p>
					</div>
					<img
						src="/images/siteelements/Kehrmaschine_front.png"
						alt="Gehwegreinigung"
					/>
				</div>
			</section>

			<section
				className={`${styles.section} ${styles.sectionMuted} ${styles.team}`}
				id="team"
			>
				<div className={styles.teamMosaic}>
					<Mosaic />
				</div>
				<div className="container">
					<p className={styles.eyebrow}>Team</p>
					<h2 className={styles.copy}>
						Unser Team steht für Ihr Haus und Grundstück bereit
					</h2>
					<p className={styles.copy}>
						Unser im April 2011 gegründetes
						Dienstleistungsunternehmen hat seinen Standort in
						Freiburg St. Georgen und bietet Ihnen einen umfassenden
						Service in der Haus- und Grundstückpflege für
						Mehrfamilienwohn- und Geschäftshäuser.
					</p>
					<p className={styles.copy}>
						2024 haben wir aus unserem Team der langjährigen
						Mitarbeiter einen weiteren Geschäftsführer bestellt.
						Sechs Vollzeitmitarbeiter betreuen selbständig und
						zuverlässig unsere Objekte und werden von derzeit sechs
						Teilzeitkräften bei der Treppenhausreinigung
						unterstützt. Weiterhin arbeiten wir mit zwei
						zuverlässigen Reinigungsfirmen im Rahmen der
						Subunternehmertätigkeit zusammen.
					</p>
					<p className={styles.copy}>
						Wir wachsen und suchen Mitarbeiter in Voll- und / oder
						Teilzeit. Schreiben Sie uns oder rufen Sie uns an, wir
						freuen uns über Ihr Interesse an unserem Betrieb.
					</p>
					<div className={styles.teamGrid}>
						{directors.map((person) => (
							<article
								key={person.name}
								className={styles.teamCard}
							>
								<div
									className={styles.teamMark}
									aria-hidden="true"
								>
									{person.name
										.split(" ")
										.map((part) => part[0])
										.join("")}
								</div>
								<h3>{person.name}</h3>
								<p>{person.role}</p>
							</article>
						))}
					</div>
				</div>
			</section>

			<section
				className={`${styles.section} ${styles.sectionMuted}`}
				id="partner"
			>
				<div className="container">
					<p className={styles.eyebrow}>Partner</p>
					<h2>
						Wir arbeiten bereits mit einer Vielzahl an Partnern
						zusammen
					</h2>
					<div className={styles.partners}>
						{partners.map((partner) => (
							<a
								key={partner.name}
								className={styles.partner}
								href={partner.url}
								target="_blank"
								rel="noreferrer"
							>
								<img src={partner.image} alt={partner.name} />
							</a>
						))}
					</div>
				</div>
			</section>

			<section className={styles.section} id="kontakt">
				<div className={`container ${styles.contact}`}>
					<div>
						<p className={styles.eyebrow}>Kontakt</p>
						<h2>Jetzt Kontakt aufnehmen</h2>
						<p>
							Nehmen Sie Kontakt mit uns auf, gerne stehen wir zu
							Ihrer Verfügung.
						</p>
					</div>
					<div className={styles.contactCard}>
						<div className={styles.contactMosaic}>
							<Mosaic />
						</div>
						<ContactForm />
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Home;
