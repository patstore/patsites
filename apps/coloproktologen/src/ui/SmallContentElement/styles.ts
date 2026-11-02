import settings from "@settings";

export const smallContentElementContainer = (flex: string[] | string | undefined) => settings.mq({
    flex: flex ? flex : ["100%", "50%"],
    display: "flex",
    flexDirection: "column",
    gap: settings.sizes.medium,
    alignItems: "flex-start",
    justifyContent: "space-between",
    padding: settings.sizes.medium,
    borderRadius: settings.borderRadius.medium,
    backgroundColor: settings.colors.light,
    height: "300px",
    position: "relative",
    overflow: "hidden",
    alignSelf: ["stretch", "stretch", "auto"]
});
