import { css } from "@emotion/react";
import settings from "@settings";

export const profileContainer = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
    minHeight: "800px",
    gap: "60px",
    paddingTop: "120px",
    backgroundColor: settings.colors.white
});

export const profileContentContainer = css({
    width: "100%",
    height: "auto",
    display: "flex",
    flexDirection: ["row", "row", "column"],
    alignItems: "center",
    justifyContent: "space-evenly",
    gap: "30px",
    padding: settings.padding.medium,
    backgroundColor: settings.colors.lightgrey,
    borderRadius: settings.sizes.large
});

export const checkboxContainer = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%"
});

export const profileHighlightContent = ({
    background
}: {
    background?: string;
}) =>
    settings.mq({
        flex: "1 1 300px",
        // maxWidth: "50%",
        height: "auto",
        backgroundColor: background ? background : settings.colors.white,
        padding: settings.padding.large,
        borderRadius: settings.sizes.large,
        overflow: "hidden",
        position: "relative",
        transition: "box-shadow 0.4s ease",
        border: `1px solid ${settings.colors.grey}`
    });

// Newsletter styles
export const newsletterContainer = css({
    width: "100%"
});

export const newsletterForm = css({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "24px"
});

export const sectionTitle = css({
    marginBottom: "16px",
    fontSize: "18px",
    fontWeight: 600
});

export const radioLabel = css({
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    cursor: "pointer",
    marginBottom: "16px",
    fontSize: settings.fontSize.semismall,
    lineHeight: 1
});

export const radioLabelNoMargin = css({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    cursor: "pointer",
    fontSize: settings.fontSize.semismall,
    lineHeight: 1,
    verticalAlign: "middle"
});

export const radioInput = css({
    marginTop: "4px",
    flexShrink: 0,
    width: "18px",
    height: "18px",
    cursor: "pointer"
});

export const radioInputSmall = css({
    marginTop: "3px",
    flexShrink: 0,
    width: "16px",
    height: "16px",
    cursor: "pointer"
});

export const emailSelectionBox = css({
    marginLeft: "30px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #dee2e6",
    marginBottom: "16px"
});

export const emailSelectionTitle = css({
    marginBottom: "12px",
    fontSize: "16px",
    fontWeight: 600,
    color: "#495057"
});

export const emailSelectionDescription = css({
    marginBottom: "16px",
    fontSize: "14px",
    color: "#6c757d"
});

export const emailOptionLabel = css({
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
    cursor: "pointer",
    marginBottom: "12px",
    fontSize: settings.fontSize.semismall
});

export const customEmailInput = css({
    width: "100%",
    padding: "10px 12px",
    fontSize: "14px",
    border: "1px solid #dee2e6",
    borderRadius: "6px",
    marginTop: "8px",
    fontFamily: "inherit",
    "&:focus": {
        outline: "none",
        borderColor: settings.colors.primary,
        boxShadow: `0 0 0 3px ${settings.colors.primary}20`
    }
});
