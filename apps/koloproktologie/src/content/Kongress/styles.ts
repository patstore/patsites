import settings from "@settings";

export const upcomingKongressContainer = settings.mq({
    color: settings.colors.white,
    h2: {
        maxWidth: "100%",
    },
    a: {
        color: `${settings.colors.white} !important`
    }
});

export const summaryStyle = settings.mq({
    width: "fit-content",
    color: settings.colors.white,
    fontSize: settings.fontSize.small,
    cursor: "pointer",
    backgroundColor: settings.colors.primary,
    listStyle: "none",
    padding: settings.padding.small,
    borderRadius: settings.sizes.medium
});
