import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { IoIosConstruct } from "react-icons/io";
import "./header.scss";
import MenuSection from "./components/MenuSection";
import { headerVariants } from "./animations";
import { FlexBox, ThemeToggle } from "@ui";
import logoLettering from "./images/logo_red_lettering.png";
import main_menu from "./constants/main_menu";
import styles from "./Header.module.css";

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
      className={styles.header}
    >
      <FlexBox
        direction="row"
        align="center"
        justify="space-between"
        style={{
          width: "100%",
          margin: "0 auto",
          maxWidth: "var(--page-width)",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <motion.div
          className={styles.logoWrap}
          initial="start"
          variants={{
            start: { scale: 1, transition: { duration: 0.4 } },
            site: { scale: 0.8, transition: { duration: 0.4 } },
          }}
          key="main-logo"
        >
          <FlexBox align="center">
            <Link to="/" className={styles.logoLink}>
              <img
                src={logoLettering}
                alt="TV Freiburg St. Georgen von 1897 e.V."
                width={180}
                className={styles.logo}
              />
            </Link>
          </FlexBox>
        </motion.div>

        <ThemeToggle />
        <ul className={styles.menu}>
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
      <div className={styles.notice}>
        <p className={styles.noticeText}>
          <IoIosConstruct /> Auf der Seite finden gerade größere Überarbeitungen
          statt. Daher kann es hier und da zu Fehlern kommen.
        </p>
      </div>
    </motion.header>
  );
};

export default Header;
