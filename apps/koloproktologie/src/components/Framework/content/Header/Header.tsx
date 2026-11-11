import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import settings from "@settings";
import { AppImage } from "@ui";
import logoWithBg from "./images/Logo_mit_HG.png";
import logo from "./images/logo.webp";
import "./header.scss";
import MenuSection from "./components/MenuSection";
import { headerVariants } from "./animations";
import { FlexBox } from "@ui";
import { headerContainer, menuContainer } from "./styles";
import main_menu from "./constants/main_menu";
import { useOptionalScroll } from "@repo/core";
import { useSiteContext } from "@provider";

const Header: React.FC = () => {
    const { user } = useSiteContext();

    const mainMenu = main_menu({ user });

    const [headerAnimate, setHeaderAnimate] = useState("start");
    const [isHome] = useState(false);
    const scrollApi = useOptionalScroll();

    useEffect(() => {
        const applyScroll = (scrollY: number) => {
            setHeaderAnimate(scrollY > 200 ? "site" : "start");
            document.documentElement.style.setProperty(
                "--scroll-y",
                `${scrollY}px`
            );
        };

        if (!scrollApi) {
            const handleWindowScroll = () => applyScroll(window.scrollY);
            handleWindowScroll();
            window.addEventListener("scroll", handleWindowScroll, {
                passive: true
            });
            return () =>
                window.removeEventListener("scroll", handleWindowScroll);
        }

        const handleLenisScroll = () =>
            applyScroll(scrollApi.getSnapshot().scroll);
        handleLenisScroll();
        return scrollApi.subscribe(handleLenisScroll);
    }, [scrollApi]);

    const colorScheme = React.useMemo(() => {
        let background = "transparent";
        let color = settings.colors.dark;

        if (isHome && headerAnimate === "start") {
            background = "transparent";
            color = settings.colors.white;
        } else if (headerAnimate === "site") {
            background = settings.colors.white;
        }
        return {
            background,
            color
        };
    }, [headerAnimate, isHome]);


    // useEffect(() => {
    //     setIsHome(window.location.pathname === "/");
    // }, []);

    return (
        <motion.header
            variants={headerVariants}
            initial="start"
            animate={headerAnimate}
            css={[
                headerContainer,
                {
                    color: colorScheme.color,
                    backgroundColor: colorScheme.background || "transparent"
                }
            ]}
        >
            <FlexBox
                direction="row"
                align="center"
                justify="space-between"
                styles={{
                    width: "100%",
                    margin: "0 auto",
                    maxWidth: "960px",
                    justifyContent: "space-between",
                    height: "100%"
                }}
            >
                <motion.div
                    css={{
                        width: "auto",
                        height: "100px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        transformOrigin: "left"
                    }}
                    initial="start"
                    variants={{
                        start: { scale: 1, transition: { duration: 0.4 } },
                        site: { scale: 1, transition: { duration: 0.4 } }
                    }}
                    key="main-logo"
                >
                    <Link
                        to="/"
                        css={{ margin: "0 !important" }}
                    >
                        <AnimatePresence mode="wait">
                            {isHome && headerAnimate === "start" ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <FlexBox
                                        direction="row"
                                        align="center"
                                        gap={settings.sizes.medium}
                                        styles={{ height: "100%" }}
                                    >
                                        <div
                                            css={{
                                                backgroundColor:
                                                    settings.colors.white,
                                                width: "108px",
                                                height: "108px",
                                                borderRadius: "50%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center"
                                            }}
                                        >
                                            <AppImage
                                                src={logoWithBg}
                                                alt="Deutsche Gesellschaft für Koloproktologie"
                                                style={{
                                                    width: "66px",
                                                    height: "auto"
                                                }}
                                                objectFit="cover"
                                            />
                                        </div>
                                    </FlexBox>
                                </motion.div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                >
                                    <AppImage
                                        src={logo}
                                        alt="Deutsche Gesellschaft für Koloproktologie"
                                        objectFit="cover"
                                        height={66}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Link>
                </motion.div>

                <ul css={menuContainer}>
                    {mainMenu.map((entry) => [
                        <MenuSection
                            dropdownItem={{
                                name: entry.name,
                                key: entry.key,
                                link: entry.link,
                                color: entry.color
                            }}
                            menuItems={entry.menuItems}
                            key={entry.key}
                        />
                    ])}
                    {/* <LoginMenuSection
                        loginLink="/login"
                        userLink="/app/profile"
                    /> */}
                </ul>
            </FlexBox>
            <div
                css={{
                    display: "none",
                    order: 3,
                    position: "fixed",
                    left: "20px",
                    bottom: "20px",
                    width: "200px",
                    height: "auto",
                    backgroundColor: settings.colors.primary,
                    color: settings.colors.white,
                    marginTop: "2.4rem",
                    padding: "0.3rem 1.2rem"
                }}
            ></div>
        </motion.header>
    );
};

export default Header;
