import settings from "@settings";

export const contentContainer = ({
    background,
    borderRadius,
    noPaddingTop
}: {
    background: string;
    borderRadius?: boolean;
    noPaddingTop?: boolean;
}) =>
    settings.mq({
        width: "100%",
        height: "auto",
        backgroundColor: background,
        overflow: "visible",
        paddingTop: noPaddingTop ? "0px" : borderRadius ? "48px" : "72px",
        paddingBottom: borderRadius ? "48px" : "72px",
        paddingLeft: [
            settings.sizes.medium,
            settings.sizes.large,
            settings.sizes.large,
            0
        ],
        paddingRight: [
            settings.sizes.medium,
            settings.sizes.large,
            settings.sizes.large,
            0
        ]
    });

export const contentContent = ({
    background,
    borderRadius,
    centerContent = false,
    padding = false
}: {
    background: string;
    borderRadius: string;
    centerContent?: boolean;
    padding?: boolean;
}) =>
    settings.mq({
        width: "100%",
        height: "auto",
        maxWidth: centerContent ? "660px" : "960px",
        margin: "0 auto",
        backgroundColor: background,
        display: "flex",
        flexDirection: ["column", "column", "row"],
        alignItems: "flex-start",
        flexWrap: "wrap",
        gap: "24px",
        overflow: "visible",
        paddingLeft: padding ? "30px" : "0",
        paddingRight: padding ? "30px" : "0",
        borderRadius
    });

export const contentElementContainer = ({
    background
}: {
    background: string;
}) =>
    settings.mq({
        width: "100%",
        height: "auto",
        backgroundColor: background,
        overflow: "visible",
        paddingLeft: [
            settings.sizes.medium,
            settings.sizes.large,
            settings.sizes.large,
            0
        ],
        paddingRight: [
            settings.sizes.medium,
            settings.sizes.large,
            settings.sizes.large,
            0
        ]
    });

export const contentElementContent = ({
    background,
    borderRadius,
    centerContent = false,
    padding = false
}: {
    background: string;
    borderRadius: string;
    centerContent?: boolean;
    padding?: boolean;
}) =>
    settings.mq({
        width: "100%",
        height: "auto",
        maxWidth: centerContent ? "660px" : "960px",
        margin: "0 auto",
        backgroundColor: background,
        display: "flex",
        flexDirection: ["column", "column", "row"],
        alignItems: "flex-start",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "30px",
        paddingLeft: padding ? "30px" : "0",
        paddingRight: padding ? "30px" : "0",
        borderRadius
    });
