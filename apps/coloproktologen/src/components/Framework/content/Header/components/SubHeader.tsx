import { Link } from "@router";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { Menu } from "../types";
import {
    subHeaderContainer,
    subHeaderContentContainer,
    subHeaderLink
} from "../styles";
import { FlexBox } from "@ui";
import { ColoproktologenUser } from "@types";

const SubHeader: React.FC<{ mainMenu: Menu, user?: ColoproktologenUser }> = ({ mainMenu, user }) => {
    const { pathname: location } = useLocation();
    const [hash, setHash] = useState<string | undefined>(undefined);

    // Set up Intersection Observer to detect which section is in view
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -50% 0px", // Trigger when element reaches center of viewport
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const targetHash = `#${entry.target.id}`;
                    setHash(targetHash);
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions
        );

        // Find all elements that have IDs matching the menu item links
        const currentMenu = mainMenu.find((menu) =>
            location.includes(menu?.link || "")
        );

        if (currentMenu?.menuItems) {
            currentMenu.menuItems.forEach((item) => {
                if (item.link?.includes("#")) {
                    const elementId = item.link.split("#")[1];
                    const element = document.getElementById(elementId);
                    if (element) {
                        observer.observe(element);
                    }
                }
            });
        }

        return () => {
            observer.disconnect();
        };
    }, [location, mainMenu]);

    const currentMenu = useMemo(
        () => mainMenu.find((menu) => location.includes(menu?.link || "")),
        [location, mainMenu]
    );

    if (
        !currentMenu ||
    !currentMenu?.menuItems ||
    currentMenu?.menuItems?.length === 0
    ) {
        return null;
    }
    let showMemberForm = false
    if (user) {
        showMemberForm = user.roles.includes("CfX2FrZlwb") || user.is_superuser
    }

    return (
        <div css={subHeaderContainer}>
            <div css={subHeaderContentContainer}>
                <FlexBox direction="row"
                    align="center"
                    justify="flex-end">
                    {currentMenu?.menuItems?.map((item) => {
                        if (item.function) {
                            return (
                                <button
                                    css={subHeaderLink(false)}
                                    key={item.key}
                                    onClick={item.function}
                                >
                                    {item.name}
                                </button>
                            );
                        }
                       return (
                            <Link
                                to={item.link as string}
                                key={item.key}
                                css={subHeaderLink(Boolean(hash && item.link?.includes(hash)))}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                    {showMemberForm && (
                        <Link
                            to="/app/member-form"
                            css={subHeaderLink(false)}
                        >
                            Mitgliederformular
                        </Link>
                    )}
                </FlexBox>
            </div>
        </div>
    );
};

export default SubHeader;
