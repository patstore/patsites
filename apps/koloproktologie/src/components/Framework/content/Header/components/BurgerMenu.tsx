import React from "react";
import { burgerContainer } from "../styles";
import { motion } from "framer-motion";
import { BurgerMenuProps } from "../types";
import settings from "@settings";

const BurgerMenu: React.FC<BurgerMenuProps> = ({ menuOpen, setMenuOpen }) => {
    return (
        <motion.div
            onClick={() => setMenuOpen(!menuOpen)}
            css={burgerContainer}
        >
            <motion.div
                animate={{
                    backgroundColor: settings.colors.primary,
                    opacity: menuOpen === true ? 0 : 1,
                    top: 0
                }}
                css={{
                    backgroundColor: settings.colors.primary,
                    height: "4px",
                    width: "100%",
                    position: "absolute"
                }}
            />
            <motion.div
                animate={{
                    top: menuOpen === true ? "6px" : "8px",
                    transform:
                        menuOpen === true ? "rotate(-45deg)" : "rotate(0deg)"
                }}
                css={{
                    backgroundColor: settings.colors.primary,
                    height: "4px",
                    width: "100%",
                    position: "absolute"
                }}
            />
            <motion.div
                animate={{
                    top: menuOpen === true ? "6px" : "16px",
                    transform:
                        menuOpen === true ? "rotate(45deg)" : "rotate(0deg)"
                }}
                css={{
                    backgroundColor: settings.colors.primary,
                    height: "4px",
                    width: "100%",
                    position: "absolute"
                }}
            />
        </motion.div>
    );
};

export default BurgerMenu;
