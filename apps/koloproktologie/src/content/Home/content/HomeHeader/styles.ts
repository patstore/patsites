import settings from "@settings";

export const homeHeaderContainer = () =>
    settings.mq({
        width: "100%",
        height:["540px", "540px", "600px"],
        paddingBottom: [ "60px"],
        overflow: "hidden",
        paddingTop: 
            ["60px"],
        position: "relative",
    });

export const homeHeaderContent = settings.mq({
        width: "100%",
        height: "100%",
        maxWidth: "960px",
        margin: "auto",
        position: "relative",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: 2
    });

export const homeHeaderCopy = settings.mq({
    position: "relative",
    zIndex: 1,
    maxWidth: "50%",
});

export const homeHeaderMedia = settings.mq({
    position: "absolute",
    right: 0,
    top: "10%",
    width: "50%",
    height: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
});

export const homeHeaderMediaImage = settings.mq({
    maxWidth: "100%",
    maxHeight: "100%",
    width: "auto",
    height: "auto",
    objectFit: "contain",
    borderRadius: settings.borderRadius.large,
});

export const loaderContainer = () =>
    settings.mq({
        display: "flex",
        gap: "10px",
        position: "absolute",
        bottom: "0",
        left: "0"
    });

export const loaderItem = (isActive: boolean) =>
    settings.mq({
        width: "auto",
        height: "30px",
        cursor: "pointer",
        transition: "background-color 0.4s ease",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "flex-end",
      
    });

export const loaderTrack = (isActive: boolean) =>
    settings.mq({
        width: "120px",
        height: "2px",
        backgroundColor: isActive ? settings.colors.grey : settings.colors.light,
        cursor: "pointer",
        transition: "background-color 0.4s ease",
        ":hover": {
            backgroundColor: settings.colors.grey
        }
    });

export const loaderBar =  settings.mq({
        width: "0",
        height: "100%",
        backgroundColor: settings.colors.primary,
    });
