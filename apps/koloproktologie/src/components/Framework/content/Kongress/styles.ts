import settings from "@settings";

export const kongressButton = settings.mq({
    position: "fixed",
    right: "0",
    bottom: "120px",
    zIndex: 10,
    height: "280px",
    width: "60px",
    backgroundColor: settings.colors.primary,
    borderTopLeftRadius: "12px",
    borderBottomLeftRadius: "12px",
    boxShadow: "0 2px 5px rgba(0,0,0,.2)",
    cursor: "pointer"
    // transformOrigin: "top right"
});

export const slide = settings.mq({
    top: `calc(50% - 180px)`,
    position: "fixed",
    left: "110%",
    height: "fit-content",
    maxHeight: "55vh",
    width: ["180px"],
    background: settings.colors.white,
    zIndex: 8,
    borderRadius: "6px 0 0 0",
    padding: "12px 6px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 2px 5px rgba(0,0,0,.4)",
    transform: "translateY(-50%)"
});

export const buttonContent = settings.mq({
    width: "260px",
    height: "30px",
    // marginLeft: "6px",
    transform: "rotate(-90deg) translateX(-50%)",
    transformOrigin: "left top",
    display: "inline-block",
    position: "absolute",
    color: settings.colors.white
});

export const iconContainer = settings.mq({
    background: settings.colors.primary,
    position: "absolute",
    bottom: 0,
    left: 0,
    zIndex: 7,
    height: ["40px", "45px", "50px"],
    width: ["40px", "45px", "50px"],
    transform: "translateX(-100%)",
    borderRadius: "6px 0 0 6px",
    padding: "0.3rem",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0,0,0,.4)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
});
