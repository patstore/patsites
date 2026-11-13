import React, { useState } from "react";
import { motion } from "motion/react";
import styles from "./MenuIcon.module.css";

type MenuIconProps = {
  showMenu: boolean;
  setShowMenu: (showMenu: boolean) => void;
};

const MenuIcon: React.FC<MenuIconProps> = ({ showMenu, setShowMenu }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setShowMenu(!showMenu)}
      className={styles.icon}
    >
      <motion.div
        animate={showMenu ? { rotate: "-135Deg", y: 18 } : { rotate: 0, y: 12 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles.bar}
        style={{ left: isHovered && !showMenu ? "2px" : "6px" }}
      />
      <motion.div
        animate={showMenu ? { rotate: "135Deg", y: 18 } : { rotate: 0, y: 18 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={styles.bar}
        style={{ left: isHovered && !showMenu ? "10px" : "6px" }}
      />
    </motion.div>
  );
};

export default MenuIcon;
