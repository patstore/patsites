import type { Variants } from "motion/react";

export const slideInAnimation: Variants = {
  initial: {
    x: "100%",
  },
  animate: {
    x: "-3%",
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    x: "100%",
    transition: {
      x: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  },
};
