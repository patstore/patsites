import staticAsset0 from "../images/course.jpg";
import settings from "@settings";
import { contentBox } from "@styles";
import { AppImage, ContentContainer, Divider, FlexBox } from "@ui";
import React from "react";

const BasicCourse: React.FC = () => {
    return (
        <ContentContainer
            largeBackground={settings.colors.light}
            id="koloproktologischer-grundkurs"
        >
            <div>
                <div>
                    <div>
                        <h2>Kolo­prokto­lo­gischer Grundkurs</h2>
                        <h3>Vorbereitung auf die Zusatzbezeichnung Proktologie</h3>
                        <h3>
                            <a
                                href="https://www.viszeralmedizin.com/programm/wissenschaftliches-programm/kursangebot/"
                                title="Viszeralmedizin 2026"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                11. März 2027, Deutscher Koloproktologen-Kongress 2027
                            </a>
                        </h3>
                    </div>
                    <FlexBox
                        direction="row"
                        align="stretch"
                        justify="space-between"
                        gap={settings.sizes.large}
                        hasFullWidth
                        changeToColumn
                    >
                        <div
                            css={[
                                contentBox(),
                                {
                                    flex: "1 1 30%",
                                    backgroundColor: settings.colors.white
                                }
                            ]}
                        >
                            <p>
                                Fundiertes Basiswissen des interdisziplinären Fachgebietes in
                                thematisch gegliederten Einzelvorträge.
                            </p>
                            <p>
                                Der ganztägige Koloproktologische Grundkurs des BCDs vermittelt
                                in thematisch gegliederten Einzelvorträgen einen Überblick über
                                das fundierte Basiswissen dieses interdisziplinären Fachgebiets.
                            </p>
                        </div>
                        <div css={[contentBox(), { padding: 0, flex: "1 1 60%" }]}>
                            <AppImage
                                src={staticAsset0} alt="Kolo­prokto­lo­gischer Grundkurs"
                                width={1000}
                                css={{ width: "100%", height: "auto" }}
                            />
                        </div>
                    </FlexBox>
                    <Divider />
                    <FlexBox
                        direction="row"
                        align="stretch"
                        justify="space-between"
                        gap={settings.sizes.large}
                        hasFullWidth
                        changeToColumn
                    >
                        <div css={[contentBox(), { backgroundColor: settings.colors.white }]}>
                            <h3>
                                Praktisch erfahrene Referenten stellen die Grundlagen der:
                            </h3>
                            <ul>
                                <li>Anatomie und Physiologie,</li>
                                <li>der Anamnese und Diagnostik sowie</li>
                                <li>
                                    alle in der täglichen Praxis relevanten Krankheitsbilder von
                                </li>
                                <li>den dermatologischen Erkrankungen über die</li>
                                <li>
                                    typisch proktologischen Entitäten Hämorrhoiden, Fissuren,
                                    Fisteln und Abszesse bis
                                </li>
                                <li>zu den funktionellen Störungen sowie</li>
                                <li>den entzündlichen und tumorösen Veränderungen vor.</li>
                            </ul>
                        </div>
                        <div css={[contentBox(), { backgroundColor: settings.colors.white }]}>
                            <h3>Kursziel:</h3>
                            <p>
                                Der Kurs richtet sich an Fachärzte zur Vorbereitung auf die
                                Prüfung zur{" "}
                                <a href="#zusatzbezeichnung">Zusatzbezeichnung Proktologie</a>,
                                bietet jedoch durch den kompletten Überblick über das Fachgebiet
                                auch einen optimalen Einstieg in die praktische Betätigung als
                                Koloproktologe. Nachfolgend sehen Sie die aktuellen Kurstermine.
                            </p>
                            <p>
                                Aktuelle Kurstermine:
                            </p>
                            <ul>
                                <li>
                                    <a target="_blank" href="https://www.koloproktologen-kongress.de/programm.php">
                                        11.03.2027, Deutscher Koloproktologen-Kongress 2027
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </FlexBox>
                </div>
            </div>
        </ContentContainer>
    );
};

export default BasicCourse;
