import type { TargetAndTransition } from "motion/react";

export const slideInAnimation = {
  initial: {
    x: "102%",
  },
  animate: {
    x: "0%",
    transition: {
      ease: "easeOut",
    },
  },
} satisfies Record<string, TargetAndTransition>;
