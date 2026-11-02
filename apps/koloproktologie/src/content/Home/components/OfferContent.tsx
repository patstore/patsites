import React from "react";
import { topline } from "@styles";
import { ContentBox, ContentBoxElement, Divider, FlexBox } from "@ui";
import settings from "@settings";
import { IoBookOutline } from "react-icons/io5";
import { PiMagnifyingGlassLight, PiListChecksLight } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";

const content: ContentBoxElement[] = [
    {
        id: "1",
        title: "Aus- und Fortbildung",
        text: "Unter­stützung der Aus- und Fort­bildung von Ärzten durch Stipendien und Hospitationen.",
        link: "/aktivitaeten/hospitationen"
    },
    {
        id: "2",
        title: "Forschungsförderung",
        text: "Förderung der inter­diszi­plinären Forschung von Dickdarm- und Enddarm­erkrankungen.",
        link: "/aktivitaeten/forschungsfoerderung"
    },
    {
        id: "3",
        title: "DGK-Kongress",
        text: "Durchführung der Jahrestagung im Sinne des interdisziplinären Erfahrungsaustausches.",
        link: "/aktivitaeten/kongress"
    },
    {
        id: "4",
        title: "Erstellung von Leitlinien",
        text: "Schwerpunktübergreifend zur Verankerung der koloproktologischen Aspekte.",
        link: "/aktivitaeten/leitlinien"
    }
];

const OfferContent: React.FC = () => {
    const renderIcon = (id: string) => {
        if (id === "1") {
            return (
                <IoBookOutline
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
        if (id === "2") {
            return (
                <PiMagnifyingGlassLight
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
        if (id === "3") {
            return (
                <IoPeopleOutline
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
        if (id === "4") {
            return (
                <PiListChecksLight
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
    };

    return (
        <div>
            <div css={topline}>unsere aktivitäten</div>
            <h2>Werte, die uns leiten</h2>
            <p>
                Seit unseren Anfängen im Jahre 1990 werden wir stets von den
                gleichen Werten angetrieben, auf denen unsere gemeinnützige
                Gesellschaft gegründet wurde.
            </p>
            <Divider />
            <FlexBox
                direction="row"
                gap="30px"
                changeToColumn
            >
                {content.slice(0, 2).map((element) => {
                    return (
                        <ContentBox
                            key={element.title}
                            title={element.title}
                            text={element.text}
                            link={element.link}
                            background={settings.colors.primary}
                            color={settings.colors.white}
                            buttonBackground={settings.colors.secondary}
                            buttonText="Mehr erfahren"
                            icon={renderIcon(element.id as string)}
                            alignCenter
                        />
                    );
                })}
            </FlexBox>
            <Divider />
            <FlexBox
                direction="row"
                gap="30px"
                changeToColumn
            >
                {content.slice(2, 4).map((element) => {
                    return (
                        <ContentBox
                            key={element.title}
                            title={element.title}
                            text={element.text}
                            link={element.link}
                            background={settings.colors.primary}
                            color={settings.colors.white}
                            buttonBackground={settings.colors.secondary}
                            buttonText="Mehr erfahren"
                            icon={renderIcon(element.id as string)}
                            alignCenter
                        />
                    );
                })}
            </FlexBox>
        </div>
    );
};

export default OfferContent;
