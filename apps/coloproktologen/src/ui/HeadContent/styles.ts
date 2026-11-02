import { css } from "@emotion/react";
import settings from "@settings";
import { topline } from "@styles";

export const headContentContainer = ({ isInline }: { isInline: boolean }) =>
    settings.mq({
        width: "100%",
        height: "auto",
        paddingBottom: isInline ? "60px" : ["120px", "120px", "150px"],
        overflow: "hidden",
        paddingTop: isInline
            ? ["120px", "120px", "150px"]
            : ["120px", "120px", "150px"],
        position: "relative",
        minHeight: isInline ? "0" : ["540px", "540px", "600px"],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: settings.colors.white
    });

export const headContentContent = ({
    alignItems = "center"
}: {
  alignItems?: "center" | "flex-start";
}) =>
    settings.mq({
        width: "100%",
        height: "100%",
        maxWidth: "960px",
        margin: "0 auto",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: alignItems,
        justifyContent: "center",
        zIndex: 2
    });

export const headContentTopline = css([
    topline,
    {
        fontSize: settings.fontSize.medium,
        marginBottom: `${settings.sizes.small} !important`
    }
]);

export const headContentBackgroundImage = settings.mq({
    width: "100%",
    height: "600px",
    position: "fixed",
    zIndex: -1,
    top: 0,
    left: 0
});

export const headContentImageContainer = settings.mq({
    flex: "100%",
    position: "relative",
    zIndex: 2,
    order: ["1", "1", "2"],
    padding: ["12px", "12px", "0px"],
    maxHeight: "420px",
    overflow: "hidden",
    borderRadius: "24px",
    marginTop: "42px"
});

export const headContentTextContainer = (hasImage: boolean) =>
    settings.mq({
        flex: hasImage ? "50%" : "100%",
        position: "relative",
        zIndex: 3,
        order: ["2", "2", "1"],
        textAlign: "center",
        display: "flex",
        paddingLeft: ["12px", "12px", "0px"],
        paddingRight: ["12px", "12px", "0px"],
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px"
    });

export const headContentImage = settings.mq({
    width: "100%",
    height: "100%",
    objectFit: "contain",
    position: "relative",
    // maxWidth: "480px",
    // maxHeight: "420px",
    margin: ["12px auto"],
    top: 0,
    left: 0
});

export const backgroundOverlay = settings.mq({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    opacity: 0.5
});

export const headContentSubtitle = settings.mq({
    fontSize: ["15px !important", "28px !important", "24px !important"],
    display: "block !important",
    letterSpacing: "1.6px",
    maxWidth: "480px",
    lineHeight: "1.1",
    fontWeight: 500,
    marginBottom: settings.sizes.small,
    marginTop: settings.sizes.extraLarge,
    whiteSpace: "pre-line"
});

export const titleContainer = settings.mq({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    marginTop: settings.sizes.extraLarge,
    marginBottom: settings.sizes.extraLarge
});
