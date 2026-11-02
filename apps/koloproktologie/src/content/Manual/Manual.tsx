import { Layout } from "@components";
import { highlightText } from "@styles";
import {
    ContentContainer,
    FlexBox,
    HeadContent,
    TextContentElement
} from "@ui";
import React from "react";
import ManualHeadContent from "./components/ManualHeadContent";
import settings from "@settings";
import ManualBottomContent from "./components/ManualBottomContent";
import ManualContainer from "./components/ManualContainer";
import Print from "./components/Print";

const Manual: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Manual der Kolproktologie"
                subtitle="Das Standardwerk unserer Gesellschaft bietet in zwei Bänden das komplette koloproktologische Spektrum von der Ileozökalklappe bis zum Anus für konservativ und/oder operativ tätige Koloproktologen."
                image="/manual_1_2.webp"
                content={<ManualHeadContent />}
            />
            <ContentContainer largeBackground={settings.colors.light}>
                <div>
                    {/* <h2>Wissen &amp; Weiterbildung</h2> */}
                    <p css={highlightText}>
                        Als eine der ersten medizinischen Fachgesellschaften
                        veröffentlichen wir ein Standardwerk unseres Fachgebiets
                        unter den Bedingungen des Open Access. Open Access (OA)
                        bezeichnet den freien und kostenlosen Zugang zu
                        wissenschaftlichen Publikationen für alle Interessierten
                        <i>weltweit</i>.
                    </p>
                    <p css={highlightText}>
                        Die beiden Bände entstanden aus dem Wunsch heraus, allen
                        Koloproktologie Interessierten aus verschiedenen
                        Fachbereichen eine Grundlage zur Wissensintensivierung
                        zu bieten.
                    </p>
                    <p css={highlightText}>
                        Als Autoren zeichnen eine lange Liste von Experten, die
                        ihr Wissen - aus erster Hand - von der Diagnostik bis
                        zur Therapie einbringen. Herausgeber sind Prof. Dr.
                        Alexander Herold, Deutsches End- und Dickdarmzentrum
                        Mannheim & Prof. Dr. Thomas Schiedeck, Klinikum
                        Ludwigsburg/Klinik f. Allgemein- und Viszeralchirurgie.
                    </p>
                </div>
            </ContentContainer>
            <ContentContainer>
                <TextContentElement
                    topline="2. Auflage"
                    title="Kostenfreier Download"
                >
                    <div className="text">
                        <p>
                            Die zwei Bände stehen unter den Bedingungen des Open
                            Access für jedermann frei nutzbar zur Verfügung:
                        </p>
                        <p>
                            <b>Jetzt in der 2. Auflage</b>
                        </p>
                        <ul>
                            <li>
                                <a
                                    href="https://www.degruyter.com/document/doi/10.1515/9783111331270/html"
                                    target="_blank"
                                    title="Band 1 Manual der Koloproktologie"
                                    rel="noopener noreferrer"
                                >
                                    Kostenfreier Download Band 1
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.degruyter.com/document/doi/10.1515/9783111253237/html"
                                    target="_blank"
                                    title="Band 2 Manual der Koloproktologie"
                                    rel="noopener noreferrer"
                                >
                                    Kostenfreier Download Band 2
                                </a>
                            </li>
                        </ul>
                        <p>
                            Die einzelnen Kapitel zeichnen sich durch hohe
                            didaktische Qualität, gründliche Darstellung der
                            Informationen und Therapiemöglichkeiten sowie
                            relevante Literaturhinweise aus.
                        </p>
                        <p>
                            Buchverkäufe Band 1 und 2 insgesamt: 952
                            <br /> Downloads Band 1 und 2 bzw. einzelne Kapitel
                            insgesamt: 31.000 [sic!]
                        </p>
                        <p>
                            Durch die Förderung der Weiterbildung in der
                            Koloproktologie erfüllen wir eines unserer
                            Satzungsziele und damit die Anforderungen an die
                            Gemeinnützigkeit. Wir sind stolz, dieses Ziel mit
                            der Veröffentlichung unseres Standardwerks erreicht
                            zu haben.
                        </p>
                        <p>
                            Unser erneuter Dank gilt all denen, die durch Ihre
                            Mitarbeit diesen Erfolg der DGK e.V. möglich gemacht
                            haben.
                        </p>
                    </div>
                </TextContentElement>
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.primary}>
                <ManualBottomContent />
            </ContentContainer>
            <ContentContainer>
                {/* <FlexBox
                    direction="column"
                    align="stretch"
                    gap="24px"
                > */}
                <h2>Wissen &amp; Weiterbildung</h2>

                <FlexBox
                    direction="row"
                    align="flex-start"
                    justify="space-between"
                    gap={settings.sizes.large}
                    hasFullWidth
                    changeToColumn
                >
                    <ManualContainer type="one" />
                    <ManualContainer type="two" />
                </FlexBox>
            </ContentContainer>

            <ContentContainer>
                <Print />
            </ContentContainer>
        </Layout>
    );
};

export default Manual;
