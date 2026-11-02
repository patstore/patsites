import React from "react";
import { topline } from "@styles";
import { ContentBox, ContentBoxElement, Divider, FlexBox } from "@ui";
import settings from "@settings";
import { BsCalendar4Event } from "react-icons/bs";
import { CiUmbrella } from "react-icons/ci";
import {
    IoPeopleOutline,
    IoNewspaperOutline,
    IoBookOutline
} from "react-icons/io5";
import { VscMail } from "react-icons/vsc";

const content: ContentBoxElement[] = [
    {
        id: "1",
        title: "Koloproktologen Kongress",
        text: "Der Mitgliedsbeitrag dient als anteilige Gebühr für den jährlich stattfindenden Koloproktologen-Kongress (ausgenommen sind Seminar-Gebühren).",
        link: "/aktivitaeten/kongress"
    },
    {
        id: "2",
        title: "Coloproctology",
        text: "Attraktive Sonderkonditionen für coloproctology: die interdisziplinäre deutschsprachige Zeitschrift und Verbandsorgan von DGK, BCD, ACP, SAKP und GNM.",
        link: "/fortbildung/coloproctology"
    },
    {
        id: "3",
        title: "Schirmherrschaft",
        text: "Beantragen Sie für Ihre wissenschaftlichen Veranstaltungen die Schirmherrschaft der DGK, die wir dadurch unterstützen und fördern wollen.",
        link: "/aktivitaeten/schirmherrschaft"
    },
    {
        id: "4",
        title: "Networking",
        text: "Durch eine gute Vernetzung kann Großes entstehen. Networking - mehr als nur ein Trendwort. Wissenschaftlicher Austausch mit Experten Ihres Faches.",
        link: "https://www.linkedin.com/company/deutsche-gesellschaft-koloproktologie/"
    },
    {
        id: "5",
        title: "Manual der Koloproktologie",
        text: "Das Manual der Koloproktologie bietet in zwei Bänden das komplette koloproktologische Spektrum - kostenfrei für jedermann zum Download.",
        link: "/fortbildung/manual"
    },
    {
        id: "6",
        title: "Newsletter",
        text: "Erhalten Sie Rundmails mit aktuellen Informationen, Veranstaltungen, Praxisabgaben oder Stellenangebote und kündigen Sie Ihre Veranstaltung an.",
        link: "/app/login"
    }
];

const Services: React.FC = () => {
    const renderIcon = (id: string) => {
        if (id === "1") {
            return (
                <BsCalendar4Event
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
        if (id === "2") {
            return (
                <IoNewspaperOutline
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
        if (id === "3") {
            return (
                <CiUmbrella
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
        if (id === "4") {
            return (
                <IoPeopleOutline
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
        if (id === "5") {
            return (
                <IoBookOutline
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
        if (id === "6") {
            return (
                <VscMail
                    size={60}
                    color={settings.colors.white}
                />
            );
        }
    };

    return (
        <div>
            <h2>Unsere Leistungen</h2>
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
            <Divider />
            <FlexBox
                direction="row"
                gap="30px"
                changeToColumn
            >
                {content.slice(4, 6).map((element) => {
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

export default Services;
