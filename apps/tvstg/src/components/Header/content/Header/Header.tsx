import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { IoIosConstruct } from "react-icons/io";
import settings from "@settings";
import "./header.scss";
import MenuSection from "./components/MenuSection";
import { headerVariants } from "./animations";
import { FlexBox, Image } from "@ui";
import logoLettering from "./images/logo_red_lettering.png";
import { headerContainer, menuContainer } from "./styles";
import main_menu from "./constants/main_menu";

const Header: React.FC = () => {
  const [headerAnimate, setHeaderAnimate] = useState("start");

  const handleScroll = () => {
    const compact = window.scrollY > 200;
    if (compact) {
      setHeaderAnimate("site");
    } else {
      setHeaderAnimate("start");
    }
    document.documentElement.style.setProperty(
      "--tvstg-site-header",
      compact ? "70px" : "100px",
    );
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${window.scrollY}px`,
    );
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--tvstg-site-header", "100px");
    window.addEventListener("scroll", handleScroll, false);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll, false);
  }, []);

  return (
    <motion.header
      variants={headerVariants}
      initial="start"
      animate={headerAnimate}
      css={headerContainer}
    >
      {/* <motion.div animate={headerAnimate} variants={topHeaderVariants} css={{width: '100vw', backgroundColor: settings.colors.primary}}>
				<FlexBox align='center' justify='space-between' styles={{ maxWidth: '1200px', margin: 'auto', height: '100%'}}>
					<FlexBox align='center' gap='.45rem'>
						<a
							className='topHeader'
							href="https://www.facebook.com/tvstg"
							target="_blank"
							rel="noreferrer"
						><AiOutlineFacebook /> </a>
						<a
							className='topHeader'
							href="https://www.instagram.com/tvfrstg/"
							target="_blank"
							rel="noreferrer"
						><AiOutlineInstagram /> </a>
					</FlexBox>
					<Link className='topHeader' to="/login">
						<FlexBox align='center' gap='.45rem'>
							Einloggen
							<IoIosLogIn />
						</FlexBox>
					</Link>
				</FlexBox>
			</motion.div> */}
      <FlexBox
        direction="row"
        align="center"
        justify="space-between"
        styles={{
          width: "100%",
          margin: "0 auto",
          maxWidth: "1240px",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <motion.div
          css={{
            width: "auto",
            height: "60px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
          initial="start"
          variants={{
            start: { scale: 1, transition: { duration: 0.4 } },
            site: { scale: 0.8, transition: { duration: 0.4 } },
          }}
          key="main-logo"
        >
          <FlexBox align="center">
            <Link
              to="/"
              style={{
                width: "180px",
                // height: '3.6rem'
              }}
            >
              <Image
                src={logoLettering}
                alt="TV Freiburg St. Georgen von 1897 e.V."
                width={180}
                loading="eager"
              />
            </Link>
          </FlexBox>
        </motion.div>

        <ul css={menuContainer}>
          {main_menu.map((entry) => [
            <MenuSection
              dropdownItem={{
                name: entry.name,
                key: entry.key,
                link: entry.link,
                color: entry.color,
              }}
              menuItems={entry.menuItems}
              key={entry.key}
            />,
          ])}
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
          padding: "0.3rem 1.2rem",
        }}
      >
        <p css={{ textAlign: "center" }}>
          <IoIosConstruct /> Auf der Seite finden gerade größere Überarbeitungen
          statt. Daher kann es hier und da zu Fehlern kommen.
        </p>
      </div>
    </motion.header>
  );
};

export default Header;
