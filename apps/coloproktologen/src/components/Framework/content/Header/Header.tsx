import staticAsset0 from "./images/logo_bcd.webp";
import { Link } from "@router";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import settings from "@settings";
import "./header.scss";
import MenuSection from "./components/MenuSection";
import { headerVariants } from "./animations";
import { AppImage, FlexBox } from "@ui";
import { buttonStyle, headerContainer, menuContainer } from "./styles";
import main_menu from "./constants/main_menu";
import { useSiteContext } from "@provider";
import SubHeader from "./components/SubHeader";

const Header: React.FC = () => {
    const { user } = useSiteContext();

    const mainMenu = main_menu({ user });

    const [headerAnimate, setHeaderAnimate] = useState("start");
    const [isClient, setIsClient] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Check if user is scrolling up
        if (currentScrollY < lastScrollY) {
            setHeaderAnimate("start");
        } else if (currentScrollY > 200) {
            setHeaderAnimate("site");
        } else {
            setHeaderAnimate("start");
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, false);
    
        if (!isClient) {
            setIsClient(true);
        }
        return () => window.removeEventListener("scroll", handleScroll, false);
    }, [lastScrollY, isClient]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <motion.header
            variants={headerVariants}
            initial="start"
            animate={headerAnimate}
            css={[
                headerContainer,
                {
                    color: settings.colors.dark,
                    backgroundColor: settings.colors.white
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
                        height: "66px",
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
                    <FlexBox align="center">
                        <Link
                            to="/"
                            css={{
                                width: "130px",
                                margin: "0 !important",
                                overflow: "visible"
                            }}
                        >
                            <AppImage
                                src={staticAsset0} alt="Berufsverband Coloproktologie Deutschand e.V."
                                objectFit="contain"
                                height={54}
                            />
                        </Link>
                    </FlexBox>
                </motion.div>

                <ul css={menuContainer}>
                    {mainMenu.map((entry) => [
                        <MenuSection
                            dropdownItem={{
                                name: entry.name,
                                key: entry.key,
                                link: entry.link
                                // type: entry.type as "button" | "link" | undefined
                            }}
                            menuItems={[]}
                            key={entry.key}
                        />
                    ])}
                    {/* <LoginMenuSection
                        loginLink="/login"
                        userLink="/app/profile"
                    /> */}
                </ul>
                <Link to="/spezialistensuche" css={buttonStyle}>
                    Spezialistensuche
                </Link>
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
            >
                {" "}
            </div>
            {isClient && <SubHeader mainMenu={mainMenu} user={user} />}
        </motion.header>
    );
};

export default Header;
