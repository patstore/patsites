import settings from "@settings";

export const satzungContainer = settings.mq({
    details: {
        cursor: "pointer",
        summary: {
            color: settings.colors.primary,
            listStyle: "none",
            paddingBottom: settings.sizes.medium,
            paddingTop: settings.sizes.medium
        }
    }
});
