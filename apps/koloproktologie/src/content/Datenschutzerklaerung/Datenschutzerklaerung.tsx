import { ContentContainer, HeadContent } from "@ui";
import { Layout } from "@components";
import React from "react";

const Datenschutzerklaerung: React.FC = () => {
	return (
		<Layout>
			<HeadContent title="Datenschutzerklärung" isInline />
			<ContentContainer noPaddingTop>
				<section>
					<h2>1. Verantwortlicher</h2>
					<p>
						<strong>
							Deutsche Gesellschaft für Koloproktologie e.V.
						</strong>
						<br />
						Maienstr. 3<br />
						79102 Freiburg i. Br.
						<br />
						Telefon: 0761 70 438 - 113
						<br />
						E-Mail:{" "}
						<a href="mailto:info@koloproktologie.org">
							info@koloproktologie.org
						</a>
					</p>
				</section>

				<section>
					<h2>2. Allgemeine Hinweise</h2>
					<p>
						Wir nehmen den Schutz Ihrer personenbezogenen Daten sehr
						ernst. Diese Datenschutzerklärung informiert Sie über
						Art, Umfang und Zweck der Verarbeitung personenbezogener
						Daten auf unserer Website sowie über Ihre Rechte nach
						der Datenschutz-Grundverordnung (DSGVO).
					</p>
				</section>

				<section>
					<h2>3. Hosting der Website</h2>
					<p>
						Unsere Website wird auf einem virtuellen Server (VPS) im
						Rechenzentrum in Nürnberg betrieben. Anbieter der
						Infrastruktur ist die{" "}
						<strong>
							netcup GmbH, Emmy-Noether-Straße 10, 76131 Karlsruhe
						</strong>
						,{" "}
						<a
							href="https://www.netcup.com/de"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://www.netcup.com/de
						</a>
						.
					</p>
					<p>
						Beim Aufruf der Website erfasst der Server automatisch
						technische Informationen (Server-Logfiles), darunter:
					</p>
					<ul>
						<li>IP-Adresse</li>
						<li>Datum und Uhrzeit des Zugriffs</li>
						<li>Browsertyp und Betriebssystem</li>
						<li>Referrer-URL</li>
						<li>Name und URL der abgerufenen Datei</li>
					</ul>
					<p>
						Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1
						lit. f DSGVO. Unser berechtigtes Interesse ist der
						störungsfreie und sichere Betrieb der Website. Die
						Logfiles werden nur so lange gespeichert, wie es für
						diesen Zweck erforderlich ist, und danach gelöscht,
						sofern keine längere Aufbewahrung zur Aufklärung eines
						Sicherheitsvorfalls nötig ist.
					</p>
					<p>
						netcup verarbeitet diese Daten in unserem Auftrag auf
						Grundlage eines Vertrags nach Art. 28 DSGVO. Die
						Verarbeitung findet in Deutschland statt. Mit dem
						Hosting ist keine Übermittlung in ein Land außerhalb der
						EU oder des EWR verbunden. Weitere Informationen:{" "}
						<a
							href="https://www.netcup.com/de/kontakt/datenschutzerklaerung"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://www.netcup.com/de/kontakt/datenschutzerklaerung
						</a>
						.
					</p>
				</section>

				<section>
					<h2>4. Mitgliedschaft, Konto und Anträge</h2>
					<p>
						Für die Mitgliedschaft und den geschützten Bereich
						verarbeiten wir die Angaben, die Sie im Antrag oder in
						Ihrem Profil machen. Dazu können gehören:
					</p>
					<ul>
						<li>Anrede, Titel, Vor- und Nachname</li>
						<li>E-Mail-Adresse und Telefonnummer</li>
						<li>Anschrift</li>
						<li>
							Angaben zur Ausbildung und beruflichen Qualifikation
						</li>
						<li>
							Zugangsdaten; das Passwort wird ausschließlich als
							Hash gespeichert
						</li>
						<li>
							bei Erteilung eines SEPA-Mandats die
							Kontoverbindung (Kontoinhaber, IBAN, BIC)
						</li>
					</ul>
					<p>
						Die Verarbeitung ist erforderlich, um den
						Mitgliedschaftsvertrag durchzuführen und den
						Mitgliederbereich bereitzustellen (Art. 6 Abs. 1 lit. b
						DSGVO). Gesetzliche Aufbewahrungspflichten, insbesondere
						für Beitrags- und Zahlungsunterlagen, bleiben unberührt
						(Art. 6 Abs. 1 lit. c DSGVO).
					</p>
				</section>

				<section>
					<h2>5. Speicherung der Kontodaten (Sashido)</h2>
					<p>
						Kontodaten, Mitgliedsanträge und Formulareinträge werden
						über unseren Dienstleister <strong>Sashido</strong>{" "}
						gespeichert und verarbeitet. Sashido betreibt die
						Infrastruktur überwiegend auf Servern von Amazon Web
						Services innerhalb der EU. Eine Übermittlung in Länder
						außerhalb der EU oder des EWR kann nicht ausgeschlossen
						werden. Sashido ist vertraglich auf ein angemessenes
						Datenschutzniveau verpflichtet.
					</p>
					<p>
						Datenschutzerklärung von Sashido:{" "}
						<a
							href="https://www.sashido.io/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://www.sashido.io/privacy-policy
						</a>
					</p>
				</section>

				<section>
					<h2>6. Newsletter</h2>
					<p>
						Wenn Sie den Newsletter abonnieren, verwenden wir Ihre
						E-Mail-Adresse, um Ihnen Informationen zu
						Veranstaltungen, Neuigkeiten und Angeboten der
						Gesellschaft zu senden. Die Anmeldung erfolgt im
						Double-Opt-in-Verfahren. Rechtsgrundlage ist Ihre
						Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
					</p>
					<p>
						Sie können den Newsletter jederzeit abbestellen, über
						den Abmeldelink in der E-Mail oder per Nachricht an{" "}
						<a href="mailto:info@koloproktologie.org">
							info@koloproktologie.org
						</a>
						.
					</p>
				</section>

				<section>
					<h2>7. Cookies und Sitzung</h2>
					<p>
						Für den öffentlichen Aufruf der Website setzen wir keine
						Analyse- oder Marketing-Cookies. Nach der Anmeldung wird
						ein Sitzungs-Cookie gesetzt, damit der Mitgliederbereich
						Sie als angemeldete Person erkennt. Dieses Cookie ist
						für die Bereitstellung des Kontos erforderlich (Art. 6
						Abs. 1 lit. b DSGVO) und wird mit dem Ende der Sitzung
						oder der Abmeldung gelöscht.
					</p>
					<p>
						Für die redaktionelle Vorschau kann ein weiteres
						technisch erforderliches Cookie gesetzt werden.
						Besucherinnen und Besucher der öffentlichen Website
						erhalten dieses Cookie nicht.
					</p>
				</section>

				<section>
					<h2>8. Videos (Vimeo)</h2>
					<p>
						Auf einzelnen Seiten betten wir Aufzeichnungen über den
						Dienst <strong>Vimeo</strong> ein (Vimeo.com, Inc., 330
						West 34th Street, 10th Floor, New York, NY 10001, USA).
						Beim Aufruf
						einer Seite mit einem Videoplayer stellt Ihr Browser
						eine Verbindung zu Vimeo her. Dabei können IP-Adresse,
						Browserdaten und Informationen zur Wiedergabe an Vimeo
						übermittelt und in die USA weitergegeben werden.
					</p>
					<p>
						Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser
						berechtigtes Interesse ist die Bereitstellung der
						Vortragsaufzeichnungen. Sie können die Übermittlung
						vermeiden, indem Sie diese Seiten nicht aufrufen.
						Weitere Informationen:{" "}
						<a
							href="https://vimeo.com/legal/privacy/policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://vimeo.com/legal/privacy/policy
						</a>
						.
					</p>
				</section>

				<section>
					<h2>9. LinkedIn</h2>
					<p>
						Wir unterhalten eine Seite bei{" "}
						<strong>
							LinkedIn Ireland Unlimited Company, Wilton Place,
							Dublin 2, Irland
						</strong>
						. Ein Link auf unserer Website übermittelt allein noch
						keine Daten an LinkedIn. Wenn Sie die Seite aufrufen
						oder ihr folgen, verarbeitet LinkedIn Daten nach den
						eigenen Bestimmungen, etwa IP-Adresse, Zeitpunkt des
						Zugriffs und, falls Sie angemeldet sind,
						Profildaten.
					</p>
					<p>
						Informationen von LinkedIn:{" "}
						<a
							href="https://www.linkedin.com/legal/privacy-policy"
							target="_blank"
							rel="noopener noreferrer"
						>
							https://www.linkedin.com/legal/privacy-policy
						</a>
						.
					</p>
				</section>

				<section>
					<h2>10. Weitergabe von Daten</h2>
					<p>
						Eine Weitergabe an Dritte erfolgt, wenn sie zur
						Durchführung der Mitgliedschaft erforderlich ist, Sie
						eingewilligt haben, wir gesetzlich dazu verpflichtet
						sind oder sie zur Wahrung berechtigter Interessen
						erforderlich ist. Technische Dienstleister in diesem
						Sinn sind insbesondere netcup, Sashido und, beim Abruf
						eingebetteter Videos, Vimeo.
					</p>
				</section>

				<section>
					<h2>11. Ihre Rechte</h2>
					<ul>
						<li>
							Auskunft über gespeicherte Daten (Art. 15 DSGVO)
						</li>
						<li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
						<li>Löschung (Art. 17 DSGVO)</li>
						<li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
						<li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
						<li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
						<li>
							Widerruf erteilter Einwilligungen (Art. 7 Abs. 3
							DSGVO)
						</li>
						<li>Beschwerde bei einer Aufsichtsbehörde (Art. 77 DSGVO)</li>
					</ul>
					<p>
						Zur Ausübung Ihrer Rechte genügen die Kontaktdaten unter
						Punkt 1. Zuständige Aufsichtsbehörde ist der Landesbeauftragte
						für den Datenschutz und die Informationsfreiheit
						Baden-Württemberg.
					</p>
				</section>

				<section>
					<h2>12. Sicherheit</h2>
					<p>
						Die Übertragung zwischen Ihrem Browser und unserem
						Server erfolgt verschlüsselt über HTTPS. Wir setzen
						technische und organisatorische Maßnahmen ein, um Ihre
						Daten vor Verlust, Missbrauch und unberechtigtem Zugriff
						zu schützen, und passen diese Maßnahmen an.
					</p>
				</section>

				<section>
					<h2>13. Änderungen</h2>
					<p>
						Diese Datenschutzerklärung kann angepasst werden, wenn
						sich die Verarbeitung oder die Rechtslage ändert.
						Maßgeblich ist die auf dieser Seite veröffentlichte
						Fassung (Stand: 25. November 2026).
					</p>
				</section>
			</ContentContainer>
		</Layout>
	);
};

export default Datenschutzerklaerung;
