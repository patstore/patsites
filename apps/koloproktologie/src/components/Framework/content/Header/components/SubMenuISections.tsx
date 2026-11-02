import { motion, AnimatePresence } from 'framer-motion';
import React, { FC } from 'react'
import { subMenuStyle } from '../styles';
import { subMenuVariants } from '../animations';
import { SubMenuItemsProps } from '../types';
import { Link } from '@tanstack/react-router';

const SubMenuItems: FC<SubMenuItemsProps> = ({
    subMenuState,
    itemKey, 
    setSubMenuState,
    subMenutItems
}) => {

    if (!subMenutItems || subMenutItems.length === 0) {
        return null;
    }

    return (
        <AnimatePresence>
            {subMenuState === itemKey &&
                <motion.ul
                    key={itemKey}
                    css={subMenuStyle}
                    style={{originX: 0}}
                    variants={subMenuVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    onMouseEnter={() => setSubMenuState('ballsport')}
                    onMouseLeave={() => setSubMenuState('')}
                >
                    {subMenutItems.map(subMenuItem =>
                        <motion.li
                            key={subMenuItem.key}
                        >
                            <Link
                                to={subMenuItem.link}
                                key={subMenuItem.key}
                            >
                                {subMenuItem.name}
                            </Link>
                        </motion.li>
                    )}
                </motion.ul>
            }
        </AnimatePresence>
    )
}

export default SubMenuItems
