import settings from "@settings";
import { highlightText } from "@styles";
import { Button, contentBoxContainer, ContentContainer, FlexBox } from "@ui";
import React from "react";

const educationContent = [
    {
        image: "/grundkurs.jpg",
        title: "Koloproktologischer Grundkurs",
        text: "Der Kurs vermittelt die Grundlagen der koloproktologischen Diagnostik und Therapie in einem praxisnahen Format und gilt als idealer Einstieg für Ärztinnen und Ärzte, die ihr Wissen und ihre praktische Fertigkeit in der Proktologie erweitern möchten.",
        buttonText: "Der BCD-Grundkurs",
        link: "https://www.viszeralmedizin.com/programm/wissenschaftliches-programm/kursangebot/"
    },
    {
        image: "aufbaukurs.jpg",
        title: "Aufbaukurs",
        text: "Der Kurs richtet sich an Interessierte, die ihr Fachwissen vertiefen und gleichzeitig Impulse für die tägliche Praxis gewinnen möchten und bietet praxisorientierte Einblicke in fortgeschrittene Diagnostik- und Therapiemöglichkeiten.",
        buttonText: "Der BCD-Aufbaukurs",
        link: "https://www.koloproktologen-kongress.de/content-i.php?flDay=false&fksart=9&topic=Seminare%20BCD"
    },
    {
        image: "berufspolitisches_seminar.jpg",
        title: "Berufspolitisches Seminar",
        text: "Das Berufspolitische Seminar beleuchtet die aktuellen Entwicklungen und Herausforderungen der Hybrid-DRG und ambulanten Operationen und informiert über die Auswirkungen der neuen Regelungen.",
        buttonText: "Das Berufspolitische Seminar",
        link: "https://www.koloproktologen-kongress.de/content-i.php?flDay=false&fksart=9&topic=Seminare%20BCD"
    }
];

const Education: React.FC = () => {
    return (
        <ContentContainer>
            <FlexBox direction="column"
                align="center"
                justify="center"
                hasFullWidth>
                <h2 css={{ textAlign: "center" }}>
                    Fortbildung auf den Punkt gebracht !
                </h2>
                <p css={[highlightText, { textAlign: "center" }]}>
                    Die Kurse des BCD im Rahmen des Deutschen Koloproktologen-Kongress
                    2026
                </p>
            </FlexBox>
            <FlexBox
                direction="row"
                align="stretch"
                gap={settings.sizes.medium}
                hasFullWidth
                changeToColumn
            >
                {educationContent.map((item) => (
                    <div
                        css={[
                            contentBoxContainer({
                                background: settings.colors.light
                            }),
                            {
                                padding: 0,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "stretch",
                                justifyContent: "space-between",
                                h4: {
                                    marginTop: settings.sizes.medium
                                }
                            }
                        ]}
                        key={item.title}
                    >
                        <div>
                            <img
                                src={item.image}
                                alt={item.title}
                                height={220}
                                css={{
                                    objectFit: "cover",
                                    width: "100%"
                                }}
                            />
                            <div
                                css={{
                                    padding: settings.padding.medium,
                                    paddingTop: 0
                                }}
                            >
                                <h4>{item.title}</h4>
                                <p>{item.text}</p>
                            </div>
                        </div>
                        <div css={{ padding: settings.padding.medium, paddingTop: 0 }}>
                            <Button text={item.buttonText} externalLink={item.link} />
                        </div>
                    </div>
                ))}
            </FlexBox>
        </ContentContainer>
    );
};

export default Education;
