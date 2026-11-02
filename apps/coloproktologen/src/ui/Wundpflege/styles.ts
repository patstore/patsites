import { css } from "@emotion/react";
import settings from "@settings";

export const modalOverlay = css({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "20px"
});

export const modalContent = css({
    position: "relative",
    backgroundColor: settings.colors.white,
    borderRadius: settings.borderRadius.medium,
    padding: "20px",
    maxWidth: "90vw",
    maxHeight: "90vh",
    width: "800px",
    display: "flex",
    flexDirection: "column",
    boxShadow: settings.shadows.hover
});

export const modalHeader = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
});

export const modalTitle = css({
    margin: 0,
    fontSize: settings.fontSize.semilarge,
    color: settings.colors.primary
});

export const closeButton = css({
    background: "none",
    border: "none",
    fontSize: "28px",
    cursor: "pointer",
    color: settings.colors.darkgrey,
    padding: "0",
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.2s",
    "&:hover": {
        color: settings.colors.primary
    }
});

export const videoContainer = css({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& video": {
        width: "100%",
        height: "auto",
        maxHeight: "calc(90vh - 100px)",
        borderRadius: "4px"
    }
});
