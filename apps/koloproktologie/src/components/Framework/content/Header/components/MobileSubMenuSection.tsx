import React from "react";
import { motion } from "framer-motion";
import { listItemVariants, listVariants } from "../animations";
import { useNavigate } from "@tanstack/react-router";
import { MobileSubMenuSectionProps } from "../types";
import { isArray } from "lodash-es";

const MobileSubMenuSection: React.FC<MobileSubMenuSectionProps> = ({
    menuSection,
    setMenuState,
    menuState
}) => {
    const navigate = useNavigate();

    if (menuSection.key === menuState) {
        return (
            <motion.div
                key={menuSection.key}
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
                        onClick={() => navigate({ to: menuSection.link as string })}
                    >
                        {menuSection.name}
                    </motion.h3>
                )}
                {menuSection?.menuItems &&
                    menuSection.menuItems.map((menuItem) => (
                        <>
                            <motion.h3
                                key={menuItem.key}
                                variants={listItemVariants}
                                className="linkstyleMenu"
                                onClick={() => {
                                    if (menuItem.link) {
                                        return navigate({ to: menuItem.link });
                                    }
                                    if (menuItem.function) {
                                        menuItem.function();
                                    }
                                    return setMenuState(menuItem.key);
                                }}
                            >
                                {menuItem.name}
                            </motion.h3>

                            {isArray(menuItem.subMenuItems) &&
                                menuItem.subMenuItems?.length > 0 &&
                                menuItem.subMenuItems.map((subMenuItem) => (
                                    <motion.h3
                                        key={subMenuItem.key}
                                        variants={listItemVariants}
                                        className="subLinkstyleMenu"
                                        onClick={() =>
                                            navigate({ to: subMenuItem.link })
                                        }
                                    >
                                        {subMenuItem.name}
                                    </motion.h3>
                                ))}
                        </>
                    ))}
            </motion.div>
        );
    }

    return null;
};

export default MobileSubMenuSection;
