export const headerMartinaStaggerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.08
        }
    }
};

export const headerMartinaVariants = {
    initial: {
        opacity: 0,
        y: 12
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: "easeOut" }
    }
};
