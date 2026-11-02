import settings from "@settings";

export const manualContainer = settings.mq({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    padding: settings.padding.medium,
    borderRadius: settings.sizes.medium,
    backgroundColor: settings.colors.light,
    margin: `${settings.sizes.medium} 0`
});

export const quotationText = settings.mq({
    fontSize: "36px !important",
    lineHeight: "1.1 !important",
    color: settings.colors.white,
    maxWidth: "100% !important"
});
