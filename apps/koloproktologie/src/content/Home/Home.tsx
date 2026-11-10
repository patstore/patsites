import React from "react";
import { env } from "@env";
import { Banner, Layout } from "@components";
import {
    ContentContainer,
    ContentElement,
    Divider,
    FlexBox,
    HeadContent,
    News,
    TextContentElement
} from "@ui";
import settings from "@settings";
import { topline } from "@styles";
import Manual from "./components/Manual";
import OfferContent from "./components/OfferContent";
import CancerContent from "./components/CancerContent";
import OpenAccess from "./components/OpenAccess";
import HeadBanner from "./components/HeadBanner";
import { homeHeaderTextContent } from "./styles";
import {HomeHeader} from "./content";


const Home: React.FC = () => {
    return (
        <Layout>
            {/* <PreviewWrapper preview={env.VITE_PREVIEW_MODE === "true"}>
                <HomeHeader />
            </PreviewWrapper> */}
             {/* {env.previewMode === "true" ? <HomeHeader /> : ( */}
             <HeadContent
                title="Deutsche Gesellschaft für Koloproktologie"
                content={
                    <p css={homeHeaderTextContent}>
                        Expertise bündeln, Wissen teilen – gemeinsam für eine
                        starke und zukunftsorientierte Koloproktologie
                    </p>
                }
                backgroundImage={"/main_header_2026.jpg"}
            />
            {/* )} */}
            <HeadBanner borderBottom />
            <Banner isFixed={false} />
            <ContentContainer>
                <ContentElement
                    elements={[
                        {
                            content: (
                                <TextContentElement
                                    title="Von der Diagnostik bis zur Therapie"
                                    topline="Gemeinsam noch heute etwas bewegen"
                                >
                                    <div>
                                        <p>
                                            Die Deutsche Gesellschaft für
                                            Koloproktologie e.V. (DGK)
                                            beschäftigt sich interdisziplinär
                                            mit allen auf dem Gebiet der
                                            Koloproktologie auftretenden
                                            Erkrankungen, insbesondere deren
                                            Diagnostik und Therapie.
                                        </p>
                                        <p>
                                            Hierbei handelt es sich um
                                            Erkrankungen des Dickdarms, des
                                            Enddarms - dem letzten Abschnitt des
                                            Darms - aber auch um Erkrankungen
                                            wie Hämorrhoiden, Analfisteln,
                                            analer Inkontinenz,
                                            Beckenbodenerkrankungen sowie alle
                                            Erkrankungen des Kolorektums.
                                        </p>
                                        <p>
                                            Die DGK gibt der Koloproktologie
                                            eine Stimme und setzt sich mit ihren
                                            wissenschaftlichen Erkenntnissen,
                                            ihrem Engagement und ihren
                                            Initiativen für eine verbesserte
                                            Behandlung und mögliche Prävention
                                            für Menschen mit Enddarmerkrankungen
                                            ein.
                                        </p>
                                    </div>
                                </TextContentElement>
                            ),
                            width: "3",
                            id: "1"
                        }
                    ]}
                />
            </ContentContainer>
            <ContentContainer largeBackground={settings.colors.light}>
                <OfferContent />
            </ContentContainer>
            <OpenAccess />
            <ContentContainer>
                <ContentElement
                    largeBackground={settings.colors.light}
                    elements={[
                        {
                            content: (
                                <div>
                                    <div css={topline}>2. Auflage</div>
                                    <h2>Manual der Koloproktologie</h2>
                                    <p>
                                        Das Manual der Koloproktologie steht in
                                        der 2. Auflage (Band 1 & 2) ab sofort
                                        für jedermann &quot;open access&quot;
                                        also kostenfrei zur Verfügung.
                                    </p>
                                </div>
                            ),
                            width: "1",
                            id: "1"
                        },
                        {
                            content: (
                                <FlexBox
                                    direction="row"
                                    gap="30px"
                                    changeToColumn
                                >
                                    <Manual type="1" />
                                    <Manual type="2" />
                                </FlexBox>
                            ),
                            width: "2",
                            id: "2"
                        }
                    ]}
                />
            </ContentContainer>

            <ContentContainer largeBackground={settings.colors.light}>
                <News
                    title="Aktuelle Neuigkeiten"
                    category={"dTmCePMOsW"}
                    background={settings.colors.white}
                />
            </ContentContainer>
            <ContentContainer>
                <CancerContent />
            </ContentContainer>
        </Layout>
    );
};

export default Home;
