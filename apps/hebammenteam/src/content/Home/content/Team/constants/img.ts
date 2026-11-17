export const imgStyling: Record<string, { rotate: number }> = {
	"0": { rotate: -15 },
	"1": { rotate: 0 },
	"2": { rotate: 15 }
};

/** Extra vertical travel, in pixels, while a portrait crosses the viewport. */
export const imgParallax: Record<string, number> = {
	"0": 64,
	"1": -36,
	"2": 108
};
