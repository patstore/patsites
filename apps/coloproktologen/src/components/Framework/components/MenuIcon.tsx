import React from "react";
import { FC, useState } from "react";
const menuIcon = { cursor: "pointer", width: 42, position: "relative" as const };
const menuBar = { height: 2, width: "100%", margin: "6px 0", display: "block" };
import { motion } from "framer-motion";
import settings from "@settings";

type MenuIconProps = {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
};

const MenuIcon: FC<MenuIconProps> = ({ showMenu, setShowMenu }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowMenu(!showMenu)}
      css={menuIcon}
    >
      <motion.div
        animate={
          showMenu
            ? {
                rotate: "-135Deg",
                y: 18,
                backgroundColor: settings.colors.dark,
              }
            : { rotate: 0, y: 12, backgroundColor: settings.colors.dark }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        css={[menuBar, { left: isHovered && !showMenu ? "2px" : "6px" }]}
      />
      <motion.div
        animate={
          showMenu
            ? { rotate: "135Deg", y: 18, backgroundColor: settings.colors.dark }
            : { rotate: 0, y: 18, backgroundColor: settings.colors.dark }
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        css={[menuBar, { left: isHovered && !showMenu ? "10px" : "6px" }]}
      />
    </motion.div>
  );
};

export default MenuIcon;
