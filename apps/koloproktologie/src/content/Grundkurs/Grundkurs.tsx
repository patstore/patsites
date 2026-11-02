import { Layout } from "@components";
import settings from "@settings";
import { highlightText } from "@styles";
import {
    Button,
    ContentContainer,
    Divider,
    HeadContent,
    TextContentElement
} from "@ui";
import React from "react";

const Grundkurs: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Koloproktologischer Grundkurs"
                subtitle="In Zusammenarbeit mit dem Berufsverband Coloproktologie Deutschland e.V. (BCD)"
                image="/grundkurs_header.jpg"
            />
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    <p css={highlightText}>
                        Der ganztägige Koloproktologische Grundkurs des BCDs
                        vermittelt in thematisch gegliederten Einzelvorträgen
                        einen Überblick über das fundierte Basiswissen dieses
                        interdisziplinären Fachgebiets und richtet sich an
                        Fachärzte zur Vorbereitung auf die Prüfung zur
                        Zusatzbezeichnung Proktologie.
                    </p>

                    <Button
                        text="Teilnehmerregistrierung"
                        externalLink="https://www.viszeralmedizin.com/programm/wissenschaftliches-programm/kursangebot/"
                    />
                </div>
            </ContentContainer>
            <ContentContainer>
                <TextContentElement title="Kursinhalte">
                    <p>
                        In der Thematik stellen praktisch erfahrene Referenten
                        die Grundlagen der:
                    </p>
                    <ul>
                        <li>Anatomie und Physiologie</li>
                        <li>Anamnese und Untersuchung</li>
                        <li>Dermatologische Erkrankungen</li>
                        <li>AIN und Analkarzinom</li>
                        <li>Differentialdiagnose „Hämorrhoiden“</li>
                        <li>Hämorrhoiden - Therapie</li> <li>Analfissur</li>
                        <li>Proktitis</li> <li>Abszess und Fistel</li>
                        <li>Funktionelle Störungen</li>
                        <li>Rektumkarzinom</li>
                    </ul>
                </TextContentElement>
                <TextContentElement title="Kursziel">
                    <p>
                        Der Kurs richtet sich an Fachärzte zur Vorbereitung auf
                        die Prüfung zur Zusatzbezeichnung Proktologie, bietet
                        jedoch durch den kompletten Überblick über das
                        Fachgebiet auch einen optimalen Einstieg in die
                        praktische Betätigung als Koloproktologe.
                    </p>
                </TextContentElement>
            </ContentContainer>
            <ContentContainer>
                <h2>Vorbereitung zur Zusatzweiterbildung Proktologie</h2>
                <Divider />
                <TextContentElement title="Definition">
                    <p>
                        Die Zusatz-Weiterbildung Proktologie umfasst in
                        Ergänzung zu einer Facharztkompetenz die Vorbeugung,
                        Erkennung, Behandlung und Rehabilitation von
                        Erkrankungen, Verletzungen, Formveränderungen und
                        funktionellen Störungen des Mastdarms, des Afters, des
                        Kontinenzorgans, der Beckenbodenmuskulatur, von
                        Analekzemen, anorektalen Geschlechtskrankheiten und
                        analen Dermatosen.
                    </p>
                </TextContentElement>
                <TextContentElement title="Voraussetzungen">
                    <p>
                        Die Zusatz-Weiterbildung Proktologie baut auf einer
                        Facharztausbildung in der Allgemeinmedizin,
                        Allgemeinchirurgie, Frauenheilkunde und Geburtshilfe,
                        Haut- und Geschlechtskrankheiten, Innere Medizin, Innere
                        Medizin und Gastroenterologie, Kinderchirurgie, Urologie
                        oder Viszeralchirurgie auf.
                    </p>
                    <p>Die Voraussetzungen:</p>
                    <ul className="mt-n2">
                        <li>Erfolgreich abgeschlossenes Medizinstudium</li>
                        <li>Approbation als Arzt</li>
                        <li>Spezifische Facharztausbildung</li>
                    </ul>
                </TextContentElement>
                <TextContentElement title="Dauer der Weiterbildungszeit">
                    <p>
                        Die Dauer der Weiterbildungszeit beträgt 12 Monate und
                        ist bei einem Weiterbildungsbefugten an einer
                        Weiterbildungsstätte gemäß § 6, Abs. 1, Satz 1 der
                        Musterweiterbildungsordnung zu absolvieren.
                    </p>
                </TextContentElement>
                <TextContentElement title="Inhalte">
                    <ul className="mt-n2">
                        <li>Proktologische Untersuchung</li> <li>Analfissur</li>
                        <li>Peri- und intraanale Geschwülste</li>
                        <li>Hämorrhoidalleiden</li> <li>Analfisteln</li>
                        <li>
                            Analekzem, anale Dermatosen, anorektale
                            Geschlechtskrankheiten
                        </li>
                        <li>Stoma</li> <li>Maligne Tumoren</li>
                    </ul>
                </TextContentElement>
            </ContentContainer>
        </Layout>
    );
};

export default Grundkurs;
