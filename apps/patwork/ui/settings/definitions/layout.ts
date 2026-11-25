import facepaint  from 'facepaint';
/** Breakpoints in px for use in CSS media queries */
export const breakpoints = [576, 768, 992, 1200] as const;

/** Media query strings for min-width */

export const mq = facepaint(
    breakpoints.map(bp => `@media (min-width: ${bp}px)`)
);
