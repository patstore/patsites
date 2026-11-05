import { AnimatePresence, motion } from "motion/react";
import { Link, useNavigate } from "@tanstack/react-router";
import React, { useState, useEffect } from "react";
import settings from "@settings";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import {
  listVariants,
  listItemVariants,
  menuenterrightVariants,
} from "./animations";
import "./header.scss";
import { FlexBox, Image } from "@ui";
import { burgerContainer, headerMobileContainer, mobileMenu } from "./styles";
import main_menu from "./constants/main_menu";
import logo from "./images/logo_neu_rot_klein.png";

const HeaderMobile: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuState, setMenuState] = useState("menu");
  const [headerAnimate, setHeaderAnimate] = useState("start");

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setHeaderAnimate("site");
    } else {
      setHeaderAnimate("start");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, false);
    document.documentElement.style.setProperty(
      "--scroll-y",
      `${window.scrollY}px`,
    );
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
      <motion.div onClick={() => setMenuOpen(!menuOpen)} css={burgerContainer}>
        <motion.div
          style={{ backgroundColor: settings.colors.dark }}
          animate={menuOpen === true ? { top: 0 } : { top: 0 }}
          css={{ height: "4px", width: "100%", position: "absolute" }}
        />
        <motion.div
          style={{ backgroundColor: settings.colors.dark }}
          animate={
            menuOpen === true
              ? { top: "6px", transform: "rotate(-45deg)" }
              : { top: "8px", transform: "rotate(0deg)" }
          }
          css={{ height: "4px", width: "100%", position: "absolute" }}
        />
        <motion.div
          style={{ backgroundColor: settings.colors.dark }}
          animate={
            menuOpen === true
              ? { top: "6px", transform: "rotate(45deg)" }
              : { top: "16px", transform: "rotate(0deg)" }
          }
          css={{ height: "4px", width: "100%", position: "absolute" }}
        />
      </motion.div>
      <header css={headerMobileContainer}>
        <FlexBox
          direction="row"
          align="center"
          justify="space-between"
          hasFullWidth
        >
          <motion.div
            css={{
              width: "auto",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
            style={{ originX: "0", originY: "50%" }}
            animate={headerAnimate === "start" ? { scale: 1 } : { scale: 0.8 }}
            transition={{ duration: 0.4 }}
          >
            <div
              css={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                marginTop: "auto",
                marginBottom: "auto",
              }}
            >
              <Link
                to="/"
                css={{
                  overflow: "visible",
                  width: "2em",
                  height: "2em",
                }}
              >
                <Image
                  src={logo}
                  alt="TV Freiburg St. Georgen von 1897 e.V."
                  width={42}
                  loading="eager"
                />
              </Link>

              <h6
                css={{ marginLeft: "1em", fontSize: ".7rem", marginBottom: 0 }}
              >
                TV Freiburg St. Georgen von 1897 e.V.
              </h6>
            </div>
          </motion.div>
        </FlexBox>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="subMenu"
            css={mobileMenu}
            initial="initial"
            animate="visible"
            exit="hidden"
            variants={menuenterrightVariants}
          >
            <div
              css={{
                width: "auto",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1em",
                height: "100%",
              }}
            >
              <div css={{ position: "relative", flex: "80%" }}>
                <AnimatePresence>
                  {menuOpen && (
                    <motion.div
                      key="subMenu"
                      initial="initial"
                      animate="visible"
                      exit="hidden"
                      variants={listVariants}
                    >
                      <div
                        css={{
                          width: "auto",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          gap: "1em",
                          height: "100%",
                        }}
                      >
                        <div css={{ marginTop: settings.sizes.large }}>
                          <h2
                            key="5454"
                            css={{
                              width: "100%",
                              borderBottom: `1px solid ${settings.colors.grey}`,
                              paddingBottom: "0.5em",
                            }}
                          >
                            Menü{" "}
                          </h2>
                          {menuState !== "menu" && (
                            <motion.h6
                              key="3236"
                              variants={listItemVariants}
                              css={{
                                fontSize: "0.8em",
                                fontWeight: 600,
                                color: settings.colors.primary,
                              }}
                              onClick={() => backButtonHandler()}
                            >
                              <IoMdArrowDropleft />
                              zurück
                            </motion.h6>
                          )}
                        </div>

                        <div
                          css={{
                            position: "relative",
                            flex: "80%",
                            marginTop: settings.sizes.medium,
                          }}
                        >
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
                                          css={{
                                            color: menuSection.color
                                              ? `${menuSection.color} !important`
                                              : "inherit",
                                            textDecoration: menuSection.link
                                              ? "underline !important"
                                              : "none",
                                            fontSize: "inherit !important",
                                            lineHeight: "inherit !important",
                                            fontFamily: "inherit !important",
                                          }}
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
                                      css={{ paddingLeft: ".6rem" }}
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

              <div
                css={{
                  width: "auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "1em",
                  backgroundColor: settings.colors.dark,
                  color: settings.colors.white,
                  padding: "1em",
                }}
              >
                <a
                  href="https://www.facebook.com/tvstg"
                  target="__blank"
                  css={{ fontSize: "1.2em" }}
                >
                  <AiOutlineFacebook color={settings.colors.white} />{" "}
                </a>
                <a
                  href="https://www.instagram.com/tvfrstg/"
                  target="__blank"
                  css={{ fontSize: "1.2em" }}
                >
                  <AiOutlineInstagram color={settings.colors.white} />{" "}
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
            css={{
              position: "fixed",
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 11,
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMobile;
