import { navigate } from "@router";
import React from "react";
import { motion } from "framer-motion";
import { listItemVariants } from "../animations";
import { IoMdArrowDropright } from "react-icons/io";
import { MobileMenuSectionProps } from "../types";

const MobileMenuSection: React.FC<MobileMenuSectionProps> = ({
    menuSection,
    setMenuState
}) => {
    if (menuSection.link && menuSection.link.includes("http")) {
        return (
            <a
                href={menuSection.link}
                target="__blank"
                css={{
                    fontSize: "inherit !important",
                    lineHeight: "inherit !important",
                    fontFamily: "inherit !important"
                }}
            >
                {menuSection.name}
            </a>
        );
    }

    if (
        ( menuSection.link && 
        !menuSection.menuItems) || menuSection.hasSubmenu === false
    ) {
        return (
            <motion.h3
                key={menuSection.key}
                variants={listItemVariants}
                className="linkstyleMenu"
                onClick={() => navigate(menuSection.link as string)}
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
            onClick={() => setMenuState(menuSection.key)}
        >
            {menuSection.name}
            {menuSection?.menuItems && <IoMdArrowDropright />}
        </motion.h3>
    );
};

export default MobileMenuSection;
