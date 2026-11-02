import React from "react";
import { Layout } from "@components";
import { ContentContainer, HeadContent, News, TextContentElement } from "@ui";
import settings from "@settings";
import JensKirsch from "./components/JensKirsch";
import Poster from "./components/Poster";

const Auszeichnungen: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Wissenschaftliche Auszeichnungen"
                subtitle={
                    "Die Auszeichnung besonderer wissenschaftlicher Leistungen ist ein weiterer wichtiger Bestandteil unserer Förderung."
                }
                image="/auszeichnungen_header.jpg"
            />
            <ContentContainer largeBackground={settings.colors.light}>
                <TextContentElement title="Große Anerkennung">
                    <p>
                        Die Auszeichnung besonderer wissenschaftlicher
                        Leistungen ist ein weiterer wichtiger Bestandteil
                        unserer Förderung. Sie stellt eine große Anerkennung der
                        Leistung der Preisträger dar und trägt zum Renommee
                        unserer Gesellschaft bei. Besondere wissenschaftliche
                        Leistungen sollen ideell als auch materiell gefördert
                        werden. Jährlich vergeben wir im Rahmen unseres
                        Deutschen Koloproktologen-Kongresses Auszeichnungen für
                    </p>
                </TextContentElement>
            </ContentContainer>
            <ContentContainer>
                <News
                    title="Jens J. Kirsch-Preis"
                    category="9ERH02751I"
                    content={
                        <div>
                            <p>
                                Mit dem Jens J. Kirsch-Preis wird die beste
                                wissenschaftliche Arbeit auf dem Gebiet der
                                Koloproktologie vorgetragen am Deutschen
                                Koloproktologen-Kongress alljährlich
                                ausgezeichnet und im Rahmen des Kongresses
                                verliehen.
                            </p>
                            <p>
                                Dieser Preis wurde 2003 von unserem
                                Gründungsmitglied Jens J. Kirsch gestiftet.
                            </p>
                            <p>
                                Der Jens J. Kirsch-Preis ist mit 3.000 EUR
                                dotiert.
                            </p>
                        </div>
                    }
                />
                <JensKirsch />
            </ContentContainer>
            <ContentContainer>
                <News
                    title="DGK-Poster-Preis"
                    category="m61cvmtDXq"
                    content={
                        <div>
                            <p>
                                Mit dem DGK-Poster-Preis werden die 3 besten
                                wissenschaftlichen Poster auf dem Gebiet der
                                Koloproktologie präsentiert und am Deutschen
                                Koloproktologen-Kongress alljährlich
                                ausgezeichnet und im Rahmen des Kongresses
                                verliehen. Dieser Preis wird seit 2004 von von
                                der DGK verliehen.
                            </p>

                            <p>
                                Die DGK-Poster-Preise sind mit 1000,-, 500,- und
                                250,- € EUR dotiert.
                            </p>
                        </div>
                    }
                />
                <Poster />
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.primary}>
                <h2 css={{ color: `${settings.colors.white} !important` }}>
                    Verdienste um die Koloproktologie
                </h2>
                <p css={{ color: `${settings.colors.white} !important` }}>
                    Dieser DGK-Preis ist eine Auszeichnung der Deutschen
                    Gesellschaft für Koloproktologie für besondere Verdienste um
                    die Koloproktologie. Der Preis kann jährlich einmal vergeben
                    werden. Die Verleihung des Preises ist mit einer Geldprämie
                    von 5.000 EUR verbunden. Jedes Mitglied der DGK ist
                    berechtigt, Vorschläge für Preisträger an den Vorstand zu
                    richten. Die Entscheidung über die Zuerkennung des Preises
                    erfordert ein einstimmiges positives Votum des Präsidiums.
                </p>
            </ContentContainer>
        </Layout>
    );
};

export default Auszeichnungen;
