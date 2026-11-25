import { colors } from "@/settings";

export const CARD_HEIGHT = 360;
export const CARD_WIDTH = 300;
export const CARD_PEEK = 36;

export const skillCardsPinWrapper = {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative" as const
};

export const skillCardsContainer = {
    width: `${CARD_WIDTH}px`,
    position: "relative" as const,
    overflow: "visible"
};

export const skillCard = {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    padding: "12px",
    justifyContent: "space-between",
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: `${CARD_WIDTH}px`,
    height: `${CARD_HEIGHT}px`,
    zIndfex: 6
};

export const textContainer = {
    // padding: '12px',
    paddingTop: "24px",
    paddingbottom: "36px"
};

export const skillCardHeading = {
    fontSize: "30px !important",
    fontWeight: "800 !important",
    color: colors.white,
    textTransform: "uppercase"
    // "-webkit-text-stroke": `1.2px black`,

    // textShadow: `1px 1px`,
};

export const skillContainerHeadingWrapper = {
    paddingBottom: "120px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transform: "translateY(-100px)",
    h2: {
        textAlign: "center"
    }
};
