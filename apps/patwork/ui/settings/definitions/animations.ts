/** Animation timing and keyframe definitions for CSS */
export const navlist = {
  staggerChildren: 0.2,
  delayChildren: 0.3,
} as const;

export const navitem = {
  initial: { y: 40, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 40, opacity: 0 },
  ease: 'easeInOut' as const,
} as const;
