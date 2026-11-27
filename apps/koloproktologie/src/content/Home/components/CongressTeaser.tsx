import { Button, ContentContainer, Divider, FlexBox } from "@ui";
import { useState } from "react";
import {
	congressFact,
	congressFacts,
	congressLead,
	congressProgram,
	programFormats,
	programTopic,
	programTopics
} from "../styles";
import settings from "@settings";
import { topline } from "@styles";

const formats = [
	"Hauptsitzungen",
	"Freie Vorträge",
	"Praxisseminare",
	"ePoster",
	"Grundkurs (Hybrid)",
	"Aufbaukurs",
	"Beckenbodensonographie",
	"Anorektale Endosonographie",
	"Proktologische Dermatologie",
	"Berufspolitik",
	"Fortbildung für Pflegekräfte"
];

const CongressTeaser = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<ContentContainer largeBackground={settings.colors.primaryLight}>
			<div css={{ width: "100%" }}>
				<FlexBox direction="row" gap="30px">
					<div css={{ flex: "1" }}>
						<h2
							css={{
								fontWeight: "600 !important",
								fontSize: "21px !important"
							}}
						>
							Neue Perspektiven, neue Therapien:
							<br />
							Was die Darmmedizin heute leisten kann
						</h2>
					</div>
					<div css={{ flex: "1" }}>
						<h3>Ein Ausblick auf die Kongressthemen 2027</h3>
						<div>
							<p>
								Hämorrhoidalleiden, chronisch-entzündliche
								Darmerkrankungen und Darmkrebs gehören zu den
								Erkrankungen, die viele Menschen unmittelbar
								betreffen. Welche Behandlungsmöglichkeiten
								bietet die moderne Medizin? Was hat sich in der
								Therapie verändert?
							</p>
						</div>
						<Button
							text={isOpen ? "Weniger anzeigen" : "Weiter lesen"}
							size="medium"
							onClick={handleClick}
						/>
					</div>
				</FlexBox>

				{isOpen === true && (
					<>
						<div css={congressProgram}>
							<div css={congressLead}>
								<div>
									<div css={topline}>
										11. - 13. März 2027 / Augsburg
									</div>
									<h3>
										Der Kongress rückt diese Fragen ins
										Zentrum der{" "}
										<strong>
											koloproktologischen Fachwelt
										</strong>{" "}
										und lädt zum interdisziplinären
										Austausch ein.
									</h3>
								</div>
								<div
									css={{
										display: "flex",
										flexDirection: "column",
										gap: settings.sizes.medium
									}}
								>
									<p>
										Ein besonderer Schwerpunkt liegt auf dem{" "}
										<strong>Hämorrhoidalleiden</strong> und
										den Empfehlungen der aktuellen
										Leitlinie: Welche Beschwerden lassen
										sich konservativ behandeln? Wann ist ein
										operativer Eingriff sinnvoll? Und welche
										Verfahren versprechen langfristig gute
										Ergebnisse?
									</p>
									<p>
										Erleben Sie einen praxisnahen Kongress
										und erweitern Sie Ihr Fachwissen: mit
										wertvollen Impulsen für das gesamte
										Behandlungsteam.
									</p>
								</div>
							</div>
							<Divider showLine={true} />
							<div>
								<h3>Schwerpunkte des Programms 2027</h3>
								<p>
									In Hauptsitzungen, Vorträgen und
									Poster-Präsentationen dreht sich alles
									darum, aktuelles Wissen direkt in die
									tägliche Patientenversorgung zu übertragen:
								</p>
							</div>
							<div css={programTopics}>
								<div css={programTopic}>
									<h4>
										Hämorrhoidalleiden & aktuelle Leitlinie
									</h4>
									<p>
										Welche Beschwerden lassen sich ohne
										Operation gut behandeln, wann ist ein
										Eingriff sinnvoll und welche Verfahren
										versprechen langfristig die besten
										Ergebnisse?
									</p>
								</div>
								<div css={programTopic}>
									<h4>Darmkrebs</h4>
									<p>
										Moderne Behandlungskonzepte rund um die
										Operation sowie Möglichkeiten,
										verschiedene Therapien noch gezielter
										auf die jeweilige Erkrankung
										abzustimmen.
									</p>
								</div>
								<div css={programTopic}>
									<h4>
										Chronisch-entzündliche Darmerkrankungen,
										Acne inversa & Beckenboden
									</h4>
									<p>
										Neue Behandlungswege bei Morbus Crohn
										und Colitis ulcerosa, aktuelle
										Therapieansätze bei der
										chronisch-entzündlichen Hauterkrankung
										Acne inversa sowie moderne Diagnostik
										und Behandlung bei
										Beckenboden-Beschwerden.
									</p>
								</div>
							</div>
							<div>
								<h3>
									Gezielte Fortbildung für unterschiedliche
									Bedürfnisse
								</h3>
								<ul css={programFormats}>
									{formats.map((format) => (
										<li key={format}>{format}</li>
									))}
								</ul>
								<Divider showLine={false} />
								<p>
									Neben wissenschaftlichen Hauptsitzungen und
									freien Vorträgen bietet der Kongress
									praxisorientierte Seminare, vom
									koloproktologischen Grundkurs im
									Hybrid-Format (vor Ort und im Live-Stream)
									über Aufbaukurs und interdisziplinäre
									Angebote bis hin zu berufspolitischen
									Themen. Spezielle Fortbildungsangebote für
									Pflegekräfte und das gesamte Behandlungsteam
									runden das Programm ab.
								</p>
								<p>
									Weitere Seminare reichen vom
									Koloproktologischen Grundkurs im
									Hybrid-Format und dem Aufbaukurs über
									interdisziplinäre und spezialisierte
									Angebote zu Beckenboden, anorektaler
									Endosonographie und Beckenbodensonographie
									sowie proktologischer Dermatologie bis hin
									zu berufspolitischen Themen.
									ePoster-Präsentationen und spezielle
									Fortbildungsangebote für Pflegekräfte und
									das gesamte interdisziplinäre
									Behandlungsteam runden das Kongressprogramm
									ab.
								</p>
							</div>
							<div>
								<Button
									text="Zum Kongressprogramm"
									size="large"
									externalLink="https://www.koloproktologen-kongress.de/content.php?flDay=false"
								/>
							</div>
						</div>
					</>
				)}
			</div>
		</ContentContainer>
	);
};

export default CongressTeaser;
