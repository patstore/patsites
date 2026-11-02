import { navigate, Link } from "@router";
import { motion, AnimatePresence } from "framer-motion";
import React, { FC, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { RiArrowDropRightFill } from "react-icons/ri";
import { menuStyle } from "../styles";
import { menuItemVariants, menuVariants } from "../animations";
import { MenuSectionMobileProps } from "../types";

const MenuSectionMobile: FC<MenuSectionMobileProps> = ({
    dropdownItem,
    menuItems
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [subMenuState, setSubMenuState] = useState('');

    if (dropdownItem?.link?.includes('http')) {
        return (
            <div  css={{position: 'relative'}}>
                <a 
                    css={{
                        color: dropdownItem.color ? `${dropdownItem.color} !important` : 'inherit',
                        textDecoration: dropdownItem.link ? 'underline !important' : 'none',
                        fontSize: '1.16rem !important',
                        lineHeight: '1 !important'
                    }}
                    href={dropdownItem.link}
                    target='_blank' 
                    rel='noreferrer'
                >
                    {dropdownItem.name}
                </a>
            </div>
        );
    }

    return (
        <div 
            role='button'
            aria-hidden='true'
            onClick={() => {
                if (dropdownItem.link) {
                    return navigate(dropdownItem.link);
                }
                return null;
            }} 
            onMouseEnter={() => setIsOpen(true) } 
            onMouseLeave={() => setIsOpen(false)}
        >
            <h3>
                {dropdownItem.name} {!dropdownItem.link && <IoMdArrowDropdown />}
            </h3>
            <AnimatePresence mode='wait'>
                {isOpen === true &&
                    <motion.div
					    css={menuStyle} 
					    style={{originY: 0, originX:0}} 
					    variants={menuVariants} 
					    initial="initial" 
					    animate="animate" 
                        exit="exit"
                    >
                        <motion.ul>
					        {menuItems && menuItems.map(menuItem => {
					            if (menuItem.hasSubmenu === true ) {
                                        return (
                                            <React.Fragment key={menuItem.key}>
					                        <motion.li 
					                            key={menuItem.key} 
					                            variants={menuItemVariants} 
					                            onMouseEnter={() => setSubMenuState(menuItem.key)} 
					                            onMouseLeave={() => setSubMenuState('')}
                                                >
					                            {!menuItem.link || menuItem.link === "" ? (
                                                        <>
					                                    {menuItem.name} <RiArrowDropRightFill />
                                                        </>
                                                    ) : (
					                                <Link to={menuItem.link}>
					                                    {menuItem.name} <RiArrowDropRightFill />
                                                        </Link>
                                                    )}
                                                </motion.li>
                                            </React.Fragment>
                                        );
                                    }
                                    if (menuItem.link) {
                                        return (
					                    <motion.li 
					                        key={menuItem.key} 
                                                variants={menuItemVariants}
                                            >
                                                <Link to={menuItem.link}>
                                                    {menuItem.name}
                                                </Link>
                                            </motion.li>
                                        );
                                    }
					            return null
                                })}
                        </motion.ul>
                    </motion.div>
                }
            </AnimatePresence>
        </div>
    );
};

export default MenuSectionMobile;
