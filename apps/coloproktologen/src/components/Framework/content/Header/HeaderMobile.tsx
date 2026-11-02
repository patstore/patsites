import { Link } from "@router";
import { AnimatePresence, motion } from "motion/react";
import React, { useState, useEffect } from "react";
import settings from "@settings";
import { IoMdArrowDropleft } from "react-icons/io";
import {
  listVariants,
  listItemVariants,
  menuenterrightVariants,
} from "./animations";
import "./header.scss";
import { buttonStyle, mobileMenu } from "./styles";
import main_menu from "./constants/main_menu";
import { useSiteContext } from "@provider";
import MobileMenuSection from "./components/MobileMenuSection";
import MobileSubMenuSection from "./components/MobileSubMenuSection";
import BurgerMenu from "./components/BurgerMenu";
import MobileHeader from "./components/MobileHeader";
const HeaderMobile: React.FC = () => {
  const { user } = useSiteContext();
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

    return () => window.removeEventListener("scroll", handleScroll, false);
  }, []);

  const backButtonHandler = () => {
    if (menuState === "Ballsport") {
      return setMenuState("Sportangebot");
    }
    return setMenuState("menu");
  };

  return (
    <>
      <BurgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <MobileHeader headerAnimate={headerAnimate} />

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="subMenu"
            css={mobileMenu}
            initial="initial"
            animate="animate"
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
                    <>
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
                          <div
                            css={{
                              marginTop: settings.sizes.large,
                            }}
                          >
                            <h2
                              key="5454"
                              css={{
                                width: "100%",
                                borderBottom: `1px solid ${settings.colors.grey}`,
                                paddingBottom: "0.5em",
                              }}
                            >
                              Menü
                            </h2>
                            {menuState !== "menu" && (
                              <motion.h6
                                key="3236"
                                variants={listItemVariants}
                                css={{
                                  fontSize: "0.8rem !important",
                                  fontWeight: "600 !important",
                                  color: settings.colors.primary,
                                }}
                                onClick={() => backButtonHandler()}
                              >
                                <IoMdArrowDropleft />
                                zurück
                              </motion.h6>
                            )}
                          </div>
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
                                {[
                                  ...main_menu({
                                    user,
                                  }),
                                ].map((menuSection) => (
                                  <MobileMenuSection
                                    key={menuSection.key}
                                    menuSection={menuSection}
                                    setMenuState={setMenuState}
                                  />
                                ))}
                                <motion.div key="spezialistensuche" variants={listItemVariants}>
                                  <Link to="/spezialistensuche" css={buttonStyle}>
                                      Spezialistensuche
                                  </Link>
                                </motion.div>
                              </motion.div>
                            )}
                            <motion.div>
                              {main_menu({
                                user,
                              }).map((menuSection) => (
                                <MobileSubMenuSection
                                  key={menuSection.key}
                                  menuSection={menuSection}
                                  setMenuState={setMenuState}
                                  menuState={menuState}
                                />
                              ))}
                            </motion.div>
                            
                          </AnimatePresence>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
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
