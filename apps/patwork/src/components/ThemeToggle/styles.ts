import { borderRadius, colors } from "@/settings";

export const buttonIsActive = {
    color: colors.white,
    backgroundColor: colors.darkgrey,
    borderColor: colors.darkgrey
};

export const toggleButton = {
    fontSize: "8px",
    position: "relative" as const,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "48px",
    height: "26px",
    borderRadius: "13px",
    border: `0.9px solid ${colors.darkgrey}`,
    backgroundColor: "transparent",
    cursor: "pointer",
    padding: 0,
    transition: "background-color 0.3s ease, border-color 0.3s ease",
    flexShrink: 0,
    color: colors.darkgrey,
    '&[data-active="true"]': {
        ...buttonIsActive
    }
};

export const toggleButtonDark = {
    backgroundColor: colors.darkgrey,
    borderColor: colors.darkgrey
};

export const toggleThumb = {
    fontSize: "8px",
    position: "absolute" as const,
    left: "3px",
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: colors.darkgrey,
    // boxShadow: colors.shadow,
    transition: "transform 0.3s ease, background-color 0.3s ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: colors.white
};

export const toggleThumbDark = {
    transform: "translateX(22px)",
    backgroundColor: colors.primary,
    color: colors.darkgrey
};

export const iconStyles = {
    width: "14px",
    height: "14px",
    display: "block",
    flexShrink: 0
};

export const toggleThumbButton = {
    fontSize: "8px",
    position: "relative" as const,
    width: "15px",
    height: "15px",
    borderRadius: "50%",
    backgroundColor: colors.darkgrey,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // boxShadow: colors.shadow,
    margin: 0,
    transition: "transform 0.3s ease, background-color 0.3s ease"
};

export const toggleThumbButtonDark = {
    backgroundColor: colors.primary,
    color: colors.darkgrey
};

export const themeButton = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    position: "fixed" as const,
    bottom: "24px",
    left: "24px",
    border: `1.2px solid var(--color-text)`,
    backgroundColor: "var(--color-dark)",
    color: "var(--color-light)",
    padding: 0,
    zIndex: 8,
    cursor: "pointer",
    "&::before": {
        content: "none"
    }
};
