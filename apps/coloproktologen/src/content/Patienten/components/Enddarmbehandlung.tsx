import staticAsset0 from "../images/enddarmbehandlung.jpg";
import settings from "@settings";
import { contentBox, headlineContainer } from "@styles";
import { AppImage, ContentContainer, FlexBox, SmallContentElement, Wundpflege } from "@ui";
import React from "react";
import therapies from "../constants/therapies";

const Enddarmbehandlung: React.FC = () => {
    return (
        <>
            <ContentContainer id="untersuchungen-und-behandlungen">
                <div css={headlineContainer}>
                    <h2>Enddarmbehandlung</h2>
                    <p>
                        Hier können Sie sich über Therapien informieren. Relativ einfache,
                        meist weitgehend schmerzfreie Untersuchungen ermöglichen heutzutage
                        sehr gute Ergebnisse.
                        <br />
                        <br />
                        Stellen Sie Fragen, auch wenn Ihnen das Thema peinlich ist. Der
                        Koloproktologe hat Verständnis für Ihre Probleme.
                    </p>
                </div>
                <FlexBox
                    direction="row"
                    align="stretch"
                    justify="space-between"
                    gap={settings.sizes.medium}
                    changeToColumn
                    hasFullWidth
                >
                    <div css={contentBox()}>
                        <h3>Krankheitsbilder</h3>
                        <h4>Enddarmerkrankungen</h4>
                        <p>
                            Hier finden Sie Informationen über häufige Erkrankungen im Bereich
                            des Enddarms. Diese sollen Betroffenen ein besseres Verständnis
                            ermöglichen, sind aber nicht als Grundlage einer Selbsttherapie
                            gedacht.
                        </p>
                        <p>
                            Vor einer Therapie sollte immer eine ausreichende Diagnostik
                            erfolgen, um durch die sachgerechte Behandlung eine
                            unbeeinträchtigte Lebensqualität zu erhalten.
                        </p>
                    </div>
                    <div css={[contentBox(), { padding: 0 }]}>
                        <AppImage
                            src={staticAsset0} alt="Enddarmbehandlung"
                            objectFit="cover"
                            css={{ width: "100%", height: "100%" }}
                        />
                    </div>
                </FlexBox>
                <FlexBox
                    direction="row"
                    align="stretch"
                    justify="space-between"
                    gap={settings.sizes.medium}
                    changeToColumn
                    hasFullWidth
                    wrap
                >
                    {therapies.map((therapy) => (
                        <SmallContentElement
                            key={therapy.key}
                            flex="1 1 30%"
                            title={therapy.title}
                            text={therapy.text}
                            content={therapy.content}
                        />
                    ))}
                </FlexBox>
                
            </ContentContainer>
            <ContentContainer id="wundpflege" largeBackground={settings.colors.light}>
                <h2>Anleitung zur Wundpflege</h2>
                <Wundpflege inline />
            </ContentContainer>
        </>
    );
};

export default Enddarmbehandlung;
