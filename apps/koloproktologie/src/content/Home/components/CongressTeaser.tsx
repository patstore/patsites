import { Button, ContentContainer } from "@ui";
import { useState } from "react";
import { congressProgram, programTopic, programTopics } from "../styles";

const CongressTeaser = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	return (
		<ContentContainer>
			<div css={{ width: "100%" }}>
				<h2>
					Neue Perspektiven, neue Therapien:
					<br />
					Was die Dammedizin heute leisten kann
				</h2>
				<h3>Ein Ausblick auf die Kongressthemen 2027</h3>
				<div>
					<p>
						Hämorrhoidalleiden, chronisch-entzündliche
						Darmerkrankungen und Darmkrebs gehören zu den
						Erkrankungen, die viele Menschen unmittelbar betreffen.
						Welche Behandlungsmöglichkeiten bietet die moderne
						Medizin? Was hat sich in der Therapie verändert?
					</p>
					<p>
						Vom 11. bis 13. März 2027 rückt der Kongress in Augsburg
						diese Fragen ins Zentrum der koloproktologischen
						Fachwelt zum interdisziplinären Austausch.
					</p>
					<p>
						Ein besonderer Schwerpunkt liegt auf dem
						Hämorrhoidalleiden und den Empfehlungen der aktuellen
						Leitlinie: Welche Beschwerden lassen sich konservativ
						behandeln? Wann ist ein operativer Eingriff sinnvoll?
						Und welche Verfahren versprechen langfristig gute
						Ergebnisse?
					</p>
					<p>
						Erleben Sie einen praxisnahen Kongress und erweitern Sie
						Ihr Fachwissen zu diesen Themen. Unser Programm bietet
						wertvolle Impulse für das gesamte Behandlungsteam.
					</p>
				</div>
				<Button
					text={isOpen ? "Weniger anzeigen" : "Weiter lesen"}
					size="medium"
					onClick={handleClick}
				/>
				{isOpen === true && (
					<div css={congressProgram}>
						<div>
							<h3>Schwerpunkte des Programms 2027</h3>
							<p>
								In Hauptsitzungen, Vorträgen und
								Poster-Präsentationen dreht sich alles darum,
								aktuelles Wissen direkt in die tägliche
								Patientenversorgung zu übertragen:
							</p>
						</div>
						<div css={programTopics}>
							<div css={programTopic}>
								<h4>Hämorrhoidalleiden & aktuelle Leitlinie</h4>
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
									Operation sowie Möglichkeiten, verschiedene
									Therapien noch gezielter auf die jeweilige
									Erkrankung abzustimmen.
								</p>
							</div>
							<div css={programTopic}>
								<h4>
									Chronisch-entzündliche Darmerkrankungen,
									Acne inversa & Beckenboden
								</h4>
								<p>
									Neue Behandlungswege bei Morbus Crohn und
									Colitis ulcerosa, aktuelle Therapieansätze
									bei der chronisch-entzündlichen
									Hauterkrankung Acne inversa sowie moderne
									Diagnostik und Behandlung bei
									Beckenboden-Beschwerden.
								</p>
							</div>
						</div>
						<div>
							<h3>
								Hybrider Grundkurs, Workshops &
								interdisziplinäre Fortbildung
							</h3>
							<p>
								Neben wissenschaftlichen Hauptsitzungen und
								freien Vorträgen bietet der Kongress
								praxisorientierte Seminare,
								ePoster-Präsentationen sowie den
								koloproktologischen Grundkurs im Hybrid-Format
								(vor Ort und im Live-Stream). Spezielle
								Fortbildungsangebote für Pflegekräfte und das
								gesamte interdisziplinäre Behandlungsteam runden
								das Programm ab.
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
				)}
			</div>
		</ContentContainer>
	);
};

export default CongressTeaser;
