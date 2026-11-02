const variants = {
    active: {
        width: "100%",
        transition: { duration: 6, ease: "easeInOut" }
    },
    inactive: {
      transition: { duration: 0 },
      width: 0
    }
  }

  export const homeHeaderStaggerVariants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
    exit: {
      transition: {
        staggerChildren: 0.08,
        staggerDirection: -1,
      },
    },
  }

  export const homeHeaderVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.35, ease: "easeIn" }
    }
  }

  export const homeHeaderMediaVariants = {
    initial: {
      opacity: 0,
      y: 10
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.85 }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.35, ease: "easeIn" }
    }
  }

  export default variants