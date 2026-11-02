import { css } from "@emotion/react";
import settings from "@settings";

export const specialistsContainer = css({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: settings.sizes.medium,
    width: "100%",
    minHeight: "600px"
});

export const specialistSearchContainer = settings.mq({
    display: "flex",
    flexDirection: ["column", "column", "row"],
    alignItems: ["stretch", "stretch", "flex-start"],
    justifyContent: "space-between",
    gap: settings.sizes.medium,
    width: "100%"
});

export const searchFieldsContainer = settings.mq({
    maxWidth: ["100%", "100%", "360px"],
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "flex-start",
    gap: settings.sizes.small,
    width: "100%"
});

export const filterButtonsContainer = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: settings.sizes.medium,
    width: "100%",
    padding: settings.padding.small,
    borderTop: `0.6px solid ${settings.colors.grey}`,
    borderBottom: `0.6px solid ${settings.colors.grey}`
});

export const specialistSearchForm = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: settings.sizes.medium,
    width: "100%"
});

export const postalcodeInput = css({
    width: "90px",
    padding: `${settings.padding.small} !important`
});

export const searchFieldsFormContainer = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    gap: settings.sizes.medium,
    width: "100%",
    padding: settings.padding.small,
    borderTop: `0.6px solid ${settings.colors.grey}`
});

export const loaderContainer = css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    height: "100%",
    paddingTop: "100px",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    zIndex: 9999
});

export const specialistsHeaderContainer = css({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: settings.padding.small,
    borderTop: `0.6px solid ${settings.colors.grey}`,
    borderBottom: `0.6px solid ${settings.colors.grey}`
});
