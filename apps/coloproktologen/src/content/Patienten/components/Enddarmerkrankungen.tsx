import staticAsset0 from "../images/enddarmerkrankung.jpg";
import settings from "@settings";
import { contentBox, headlineContainer } from "@styles";
import { AppImage, ContentContainer, FlexBox, SmallContentElement } from "@ui";
import React from "react";
import deseases from "../constants/deseases";

const Enddarmerkrankungen: React.FC = () => {
    return (
        <ContentContainer id="enddarmerkrankungen">
            <FlexBox
                direction="row"
                align="stretch"
                justify="space-between"
                gap="30px"
                hasFullWidth
            >
                <div css={headlineContainer}>
                    <h2>Enddarmerkrankungen</h2>
                    <p>
                        Bei den nachfolgenden Krankheitsbildern können Sie sich über
                        Enddarmerkrankungen informieren. Bitte suchen Sie bei Beschwerden
                        einen Enddarmspezialisten (Koloproktologen) auf. Nur dieser kann
                        über die optimale Behandlung Ihrer Erkrankungen entscheiden.
                    </p>
                </div>
            </FlexBox>
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
                        src={staticAsset0} alt="Enddarmerkrankungen"
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
                hasFullWidth
                changeToColumn
                wrap
            >
                {deseases.map((disease) => (
                    <SmallContentElement
                        key={disease.key}
                        flex="1 1 30%"
                        title={disease.title}
                        text={disease.text}
                        content={disease.content}
                    />
                ))}
            </FlexBox>
        </ContentContainer>
    );
};

export default Enddarmerkrankungen;
