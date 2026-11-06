import settings from "@settings";
import { contentBox } from "@styles";
import { Button, ContentContainer, FlexBox, Label } from "@ui";
import React from "react";

const congressUrl = "https://www.koloproktologen-kongress.de/index.php";

const highlights = [
    {
        title: "Wissenschaftliches Programm",
        text: "Aktuelle Themen, Trends und Forschungsergebnisse sowie Leitlinien-Updates und innovative Entwicklungen in der Koloproktologie."
    },
    {
        title: "Fort- und Weiterbildung",
        text: "Zertifizierte CME-Fortbildungen, praxisorientierte Workshops und Seminare auf hohem fachlichen Niveau."
    },
    {
        title: "Netzwerken",
        text: "Möglichkeiten zur fachübergreifenden Vernetzung und zum kollegialen Austausch im Rahmen begleitender Veranstaltungen."
    }
];

const CongressPreview: React.FC = () => {
    return (
        <ContentContainer largeBackground={settings.colors.light}>
            <FlexBox
                direction="column"
                align="flex-start"
                gap={settings.sizes.small}
                hasFullWidth
            >
                <Label text="Kongressvorschau" noMarginBottom />
                <h2 css={{maxWidth: "100%"}}>53. Deutscher Koloproktologen-Kongress</h2>
                <p css={{ marginBlockEnd: 0 }}>
                    11.–13. März 2027 · Kongress am Park, Augsburg – hybrid
                </p>
            </FlexBox>
            <p>
                Die Deutsche Gesellschaft für Koloproktologie, der Berufsverband
                Coloproktologie Deutschland und die Chirurgische Arbeitsgemeinschaft
                Coloproktologie laden zum 53. Deutschen Koloproktologen-Kongress ein.
            </p>
            <FlexBox
                direction="row"
                align="stretch"
                changeToColumn
                gap={settings.sizes.medium}
                hasFullWidth
            >
                {highlights.map((item) => (
                    <div
                        key={item.title}
                        css={[
                            contentBox(["1 1 100%", "1 1 100%", "1 1 30%"]),
                            { backgroundColor: settings.colors.white }
                        ]}
                    >
                        <h3>{item.title}</h3>
                        <p css={{ marginBlockEnd: 0 }}>{item.text}</p>
                    </div>
                ))}
            </FlexBox>
            <FlexBox
                direction="row"
                align="center"
                changeToColumn
                gap={settings.sizes.medium}
                hasFullWidth
            >
                <Button
                    text="Zur Kongressseite"
                    externalLink={congressUrl}
                    background={settings.colors.primary}
                    color={settings.colors.white}
                    size="medium"
                />
                <Button
                    text="Zum Programm"
                    externalLink="https://www.koloproktologen-kongress.de/programm.php"
                    background={settings.colors.secondary}
                    color={settings.colors.white}
                    size="medium"
                />
            </FlexBox>
        </ContentContainer>
    );
};

export default CongressPreview;
