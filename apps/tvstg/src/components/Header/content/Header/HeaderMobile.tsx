import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import {
  listVariants,
  listItemVariants,
  menuenterrightVariants,
} from "./animations";
import "./header.scss";
import { FlexBox, ThemeToggle } from "@ui";
import main_menu from "./constants/main_menu";
import logo from "./images/logo_neu_rot_klein.png";
import styles from "./HeaderMobile.module.css";

const HeaderMobile: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuState, setMenuState] = useState("menu");
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
      compact ? "50px" : "70px",
    );
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${window.scrollY}px`,
    );
  };

  useEffect(() => {
    document.documentElement.style.setProperty("--tvstg-site-header", "70px");
    window.addEventListener("scroll", handleScroll, false);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll, false);
  }, []);

  const backButtonHandler = () => {
    return setMenuState("menu");
  };

  const navigationHandler = (link: string | null) => {
    if (link) {
      navigate({ to: link });
      setMenuOpen(false);
    } else {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <motion.div onClick={() => setMenuOpen(!menuOpen)} className={styles.burger}>
        <motion.div
          animate={menuOpen === true ? { top: 0 } : { top: 0 }}
          className={styles.bar}
        />
        <motion.div
          animate={
            menuOpen === true
              ? { top: "6px", transform: "rotate(-45deg)" }
              : { top: "8px", transform: "rotate(0deg)" }
          }
          className={styles.bar}
        />
        <motion.div
          animate={
            menuOpen === true
              ? { top: "6px", transform: "rotate(45deg)" }
              : { top: "16px", transform: "rotate(0deg)" }
          }
          className={styles.bar}
        />
      </motion.div>
      <header className={styles.header}>
        <FlexBox
          direction="row"
          align="center"
          justify="space-between"
          hasFullWidth
        >
          <motion.div
            className={styles.brandMotion}
            style={{ originX: "0", originY: "50%" }}
            animate={headerAnimate === "start" ? { scale: 1 } : { scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <div className={styles.brand}>
              <Link to="/" className={styles.logoLink}>
                <img
                  src={logo}
                  alt="TV Freiburg St. Georgen von 1897 e.V."
                  width={42}
                  className={styles.logo}
                />
              </Link>

              <h6 className={styles.title}>
                TV Freiburg St. Georgen von 1897 e.V.
              </h6>
            </div>
          </motion.div>
          <div className={styles.toggle}>
            <ThemeToggle />
          </div>
        </FlexBox>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="subMenu"
            className={styles.menu}
            initial="initial"
            animate="visible"
            exit="hidden"
            variants={menuenterrightVariants}
          >
            <div className={styles.column}>
              <div className={styles.fill}>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      key="subMenu"
                      initial="initial"
                      animate="visible"
                      exit="hidden"
                      variants={listVariants}
                    >
                      <div className={styles.column}>
                        <div className={styles.menuTop}>
                          <h2 key="5454" className={styles.heading}>
                            Menü{" "}
                          </h2>
                          {menuState !== "menu" && (
                            <motion.h6
                              key="3236"
                              variants={listItemVariants}
                              className={styles.back}
                              onClick={() => backButtonHandler()}
                            >
                              <IoMdArrowDropleft />
                              zurück
                            </motion.h6>
                          )}
                        </div>

                        <div className={styles.menuBody}>
                          <AnimatePresence>
                            {menuState === "menu" && (
                              <motion.div
                                key="84958"
                                variants={listVariants}
                                initial="initial"
                                animate="visible"
                                exit="hidden"
                              >
                                {main_menu.map((menuSection) => {
                                  if (
                                    menuSection.link &&
                                    menuSection.link.includes("http")
                                  ) {
                                    return (
                                      <motion.h3
                                        key={menuSection.key}
                                        variants={listItemVariants}
                                        className="linkstyleMenu"
                                      >
                                        <a
                                          className={styles.externalLink}
                                          data-linked={
                                            menuSection.link ? "true" : undefined
                                          }
                                          style={
                                            menuSection.color
                                              ? { color: menuSection.color }
                                              : undefined
                                          }
                                          href={menuSection.link}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {menuSection.name}
                                        </a>
                                      </motion.h3>
                                    );
                                  }

                                  if (
                                    menuSection.link &&
                                    menuSection.menuItems.length === 0
                                  ) {
                                    return (
                                      <motion.h3
                                        key={menuSection.key}
                                        variants={listItemVariants}
                                        className="linkstyleMenu"
                                        onClick={() =>
                                          navigationHandler(
                                            menuSection.link as string,
                                          )
                                        }
                                      >
                                        {menuSection.name}
                                      </motion.h3>
                                    );
                                  }

                                  return (
                                    <motion.h3
                                      key={menuSection.key}
                                      variants={listItemVariants}
                                      className="linkstyleMenu"
                                      onClick={() =>
                                        setMenuState(menuSection.key)
                                      }
                                    >
                                      {menuSection.name}
                                      {menuSection?.menuItems &&
                                        menuSection.menuItems.length > 0 && (
                                          <IoMdArrowDropright />
                                        )}
                                    </motion.h3>
                                  );
                                })}
                              </motion.div>
                            )}
                            <motion.div>
                              {main_menu.map(
                                (menuSection) =>
                                  menuState === menuSection.key && (
                                    <motion.div
                                      key="45676"
                                      variants={listVariants}
                                      initial="initial"
                                      animate="visible"
                                      exit="hidden"
                                      className={styles.nested}
                                    >
                                      {menuSection.link && (
                                        <motion.h3
                                          key={menuSection.key}
                                          variants={listItemVariants}
                                          className="linkstyleMenu"
                                          onClick={() =>
                                            navigationHandler(
                                              menuSection.link as string,
                                            )
                                          }
                                        >
                                          {menuSection.name}
                                        </motion.h3>
                                      )}
                                      {menuSection?.menuItems &&
                                        menuSection.menuItems.map(
                                          (menuItem) => (
                                            <>
                                              <motion.h3
                                                key={menuItem.key}
                                                variants={listItemVariants}
                                                className="linkstyleMenu"
                                                onClick={() => {
                                                  if (menuItem.link) {
                                                    return navigationHandler(
                                                      menuItem.link,
                                                    );
                                                  }
                                                  return setMenuState(
                                                    menuItem.key,
                                                  );
                                                }}
                                              >
                                                {menuItem.name}
                                              </motion.h3>

                                              {menuItem.subMenuItems &&
                                                menuItem.subMenuItems?.length >
                                                  0 &&
                                                menuItem.subMenuItems.map(
                                                  (subMenuItem) => (
                                                    <motion.h3
                                                      key={subMenuItem.key}
                                                      variants={
                                                        listItemVariants
                                                      }
                                                      className="subLinkstyleMenu"
                                                      onClick={() =>
                                                        navigationHandler(
                                                          subMenuItem.link,
                                                        )
                                                      }
                                                    >
                                                      {subMenuItem.name}
                                                    </motion.h3>
                                                  ),
                                                )}
                                            </>
                                          ),
                                        )}
                                    </motion.div>
                                  ),
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className={styles.social}>
                <a href="https://www.facebook.com/tvstg" target="__blank">
                  <AiOutlineFacebook />{" "}
                </a>
                <a href="https://www.instagram.com/tvfrstg/" target="__blank">
                  <AiOutlineInstagram />{" "}
                </a>
              </div>
            </div>
          </motion.div>
        )}
        {menuOpen === true && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className={styles.scrim}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobile;
