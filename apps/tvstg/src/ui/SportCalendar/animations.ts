import type { Variants } from "motion/react";

export const headerVariants: Variants = {
  start: {
    height: 120,
    y: 0,
    boxShadow: "0 2px 5px rgba(0,0,0,0)",
    transition: { height: { duration: 0.4, ease: "easeIn", delay: 0.1 } },
  },
  site: {
    height: 70,
    y: 0,
    boxShadow: "0 2px 5px rgba(0,0,0,.2)",
    transition: { height: { duration: 0.4, ease: "easeIn", delay: 0.1 } },
  },
};

export const topHeaderVariants: Variants = {
  start: {
    height: 30,
    transition: { height: { duration: 0.4, ease: "easeIn", delay: 0.1 } },
  },
  site: {
    height: 0,
    transition: { height: { duration: 0.4, ease: "easeIn", delay: 0.1 } },
  },
};

export const variantsMobileVariants: Variants = {
  start: {
    height: 70,
    y: 0,
    boxShadow: "0 2px 5px rgba(0,0,0,0)",
    transition: { height: { duration: 0.4, ease: "easeIn", delay: 0.1 } },
  },
  site: {
    height: 50,
    y: 0,
    boxShadow: "0 2px 5px rgba(0,0,0,.2)",
    transition: { height: { duration: 0.4, ease: "easeIn", delay: 0.1 } },
  },
};

export const SubHeaderVariants: Variants = {
  start: {
    height: 60,
    y: 100,
    boxShadow: "0 2px 5px rgba(0,0,0,0)",
    transition: {
      height: { duration: 0.4, ease: "easeIn", delay: 0.1 },
      y: { duration: 0.4, ease: "easeIn", delay: 0.1 },
    },
  },
  site: {
    height: 40,
    y: 70,
    boxShadow: "0 2px 5px rgba(0,0,0,.2)",
    transition: {
      height: { duration: 0.4, ease: "easeIn", delay: 0.1 },
      y: { duration: 0.4, ease: "easeIn", delay: 0.1 },
    },
  },
};

export const menuVariants: Variants = {
  initial: {
    scaleY: 0,
    transition: {
      duration: 0.1,
      ease: "easeIn",
      delay: 0,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  animate: {
    scaleY: 1,
    transition: {
      scaleY: {
        duration: 0.1,
        ease: "easeIn",
        delay: 0,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  },
  exit: {
    scaleY: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
      delay: 0.1,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

export const menuListVariants: Variants = {
  initial: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
  animate: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2, delay: 0.1 },
  },
  exit: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.2,
      staggerDirection: -1,
    },
  },
};

export const menuItemVariants: Variants = {
  initial: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      delay: 0.1,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      delay: 0.1,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      delay: 0,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

export const subMenuVariants: Variants = {
  initial: {
    scaleX: 0,
    x: "100%",
    transition: {
      duration: 0.1,
      ease: "easeIn",
      delay: 0,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
  animate: {
    scaleX: 1,
    x: "100%",
    transition: { scaleX: { duration: 0.1, delay: 0 } },
  },
  exit: {
    scaleX: 0,
    x: "100%",
    transition: { duration: 0.2, ease: "easeOut", delay: 0.1 },
  },
};

export const menuenterrightVariants: Variants = {
  initial: {
    opacity: 1,
    x: "100%",
    transition: {
      x: { duration: 0.5, delay: 0 },
      opacity: { duration: 0.1, delay: 0 },
    },
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      x: { duration: 0.4, delay: 0, ease: "easeOut" },
      opacity: { duration: 0.1, delay: 0 },
    },
  },
  hidden: {
    opacity: 0,
    x: "100%",
    transition: {
      x: { duration: 0.4, delay: 0.3 },
      opacity: { duration: 0.2, delay: 0.8 },
    },
  },
};

export const listVariants: Variants = {
  initial: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.4 },
  },
  hidden: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

export const listItemVariants: Variants = {
  initial: {
    x: 20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  hidden: {
    x: -20,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};
