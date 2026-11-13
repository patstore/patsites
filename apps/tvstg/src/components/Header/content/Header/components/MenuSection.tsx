import { motion, AnimatePresence } from "motion/react";
import React, { FC, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "@tanstack/react-router";
import { RiArrowDropRightFill } from "react-icons/ri";
import { menuItemVariants, menuVariants } from "../animations";
import SubMenuItems from "./SubMenuISections";
import { MenuSectionProps } from "../types";
import styles from "../Header.module.css";

const MenuSection: FC<MenuSectionProps> = ({ dropdownItem, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subMenuState, setSubMenuState] = useState("");
  const navigate = useNavigate();

  if (dropdownItem?.link?.includes("http")) {
    return (
      <li>
        <a
          style={dropdownItem.color ? { color: dropdownItem.color } : undefined}
          href={dropdownItem.link}
          target="_blank"
          rel="noreferrer"
        >
          {dropdownItem.name}
        </a>
      </li>
    );
  }

  if (!menuItems) {
    return null;
  }

  return (
    <li
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <span
        aria-hidden="true"
        onClick={() => {
          if (dropdownItem.link) {
            return navigate({ to: dropdownItem.link });
          }
          return null;
        }}
      >
        {dropdownItem.name} {!dropdownItem.link && <IoMdArrowDropdown />}
      </span>
      <AnimatePresence mode="wait">
        {isOpen === true && (
          <motion.div
            className={styles.dropdown}
            style={{ originY: 0, originX: 0 }}
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.ul className={styles.list}>
              {menuItems.map((menuItem) => {
                if (menuItem.hasSubmenu === true) {
                  return (
                    <React.Fragment key={menuItem.key}>
                      <motion.li
                        key={menuItem.key}
                        variants={menuItemVariants}
                        onMouseEnter={() => setSubMenuState(menuItem.key)}
                        onMouseLeave={() => setSubMenuState("")}
                        onClick={() => {
                          if (menuItem.link && menuItem.link !== "") {
                            return navigate({ to: menuItem.link });
                          }
                          return null;
                        }}
                        style={{
                          textDecoration: menuItem.link ? "underline" : "none",
                        }}
                      >
                        {menuItem.name} <RiArrowDropRightFill />
                      </motion.li>
                      <SubMenuItems
                        itemKey={menuItem.key}
                        setSubMenuState={setSubMenuState}
                        subMenuState={subMenuState}
                        subMenutItems={menuItem.subMenuItems}
                      />
                    </React.Fragment>
                  );
                }

                return (
                  <motion.li
                    key={menuItem.key}
                    variants={menuItemVariants}
                    onClick={() => {
                      if (menuItem.link && menuItem.link !== "") {
                        return navigate({ to: menuItem.link });
                      }
                      return null;
                    }}
                  >
                    {menuItem.name}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default MenuSection;
