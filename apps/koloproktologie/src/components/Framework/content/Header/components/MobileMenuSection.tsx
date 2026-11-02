import React from "react";
import { motion } from "framer-motion";
import { listItemVariants } from "../animations";
import { useNavigate } from "@tanstack/react-router";
import { IoMdArrowDropright } from "react-icons/io";
import { MobileMenuSectionProps } from "../types";

const MobileMenuSection: React.FC<MobileMenuSectionProps> = ({
    menuSection,
    setMenuState
}) => {
    const navigate = useNavigate();

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

    if (menuSection.link && !menuSection.menuItems) {
        return (
            <motion.h3
                key={menuSection.key}
                variants={listItemVariants}
                className="linkstyleMenu"
                onClick={() => navigate({ to: menuSection.link as string })}
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
            onClick={() => {
                if (menuSection.function) {
                    menuSection.function();
                }
                setMenuState(menuSection.key);
            }}
        >
            {menuSection.name}
            {menuSection?.menuItems && <IoMdArrowDropright />}
        </motion.h3>
    );
};

export default MobileMenuSection;
