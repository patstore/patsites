import staticAsset0 from "../images/expertise.jpg";
import staticAsset1 from "../images/values.jpg";
import staticAsset2 from "../images/motivation.jpg";
import settings from "@settings";
import { AppImage, contentBoxContainer, ContentContainer, FlexBox } from "@ui";
import React from "react";
const distinctionContennt = [
    {
        image: (
            <AppImage
                src={staticAsset0}
                alt="expertise"
                height={180}
                objectFit="cover"
                css={{
                    width: "100%"
                }}
            />
        ),
        title: "Unsere Fachkenntnis",
        text: "Die Proktologie setzt fachliche Kompetenz, Erfahrung und Fingerspitzengefühl voraus. Der BCD engagiert sich für eine hohe Qualität proktologischer Behandlungen durch einheitliche Aus- und Fortbildungsstandards. Klare und anspruchsvolle Anforderungen sind zu erfüllen, um als Mitglied aufgenommen zu werden."
    },
    {
        image: (
            <AppImage
                src={staticAsset1}
                alt="values"
                height={180}
                objectFit="contain"
                css={{
                    width: "100%"
                }}
            />
        ),
        title: "Unsere Werte",
        text: "Die Proktologie wurde 2003 als Zusatzbezeichnung in die Weiterbildungsordnung aufgenommen. Die Mitgliedschaft sichert Patienten, Kollegen und Kostenträgern gegenüber den höchsten Standard koloproktologischer Diagnostik und Therapie."
    },
    {
        image: (
            <AppImage
                src={staticAsset2}
                alt="motivation"
                height={180}
                objectFit="cover"
                css={{
                    width: "100%"
                }}
            />
        ),
        title: "Unsere Motivation",
        text: "Betroffenen Patienten wirksam nach dem neuesten medizinischen Wissensstand zu helfen."
    }
];

const Distinction: React.FC = () => {
    return (
        <ContentContainer id="was-uns-auszeichnet">
            <FlexBox direction="column"
                align="center"
                justify="center"
                hasFullWidth>
                <h2
                    css={{
                        textAlign: "center",
                        maxWidth: "100%",
                        color: settings.colors.primary
                    }}
                >
                    Was uns auszeichnet
                </h2>
            </FlexBox>
            <FlexBox
                direction="row"
                align="flex-start"
                gap={settings.sizes.large}
                hasFullWidth
                changeToColumn
            >
                {distinctionContennt.map((item) => (
                    <div
                        css={[
                            contentBoxContainer({
                                background: settings.colors.light
                            }),
                            { padding: 0 }
                        ]}
                        key={item.title}
                    >
                        {item.image}
                        <div
                            css={{
                                padding: settings.padding.medium
                                // paddingTop: 0
                            }}
                        >
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                        </div>
                    </div>
                ))}
            </FlexBox>
        </ContentContainer>
    );
};

export default Distinction;
