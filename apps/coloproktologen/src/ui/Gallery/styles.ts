import { css } from "@emotion/react";
import React from "react";

export const galleryContainerStyle: React.CSSProperties = {
	width: "100%",
	position: "relative"
};

export const horizontalGalleryWrapperStyle: React.CSSProperties = {
	width: "100%",
	display: "flex",
	flexDirection: "row",
	gap: "16px",
	padding: "16px 0",
	overflowX: "auto",
	scrollbarWidth: "none"
};

export const mosaicGalleryWrapperStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
	gap: "16px",
	padding: "16px 0"
};

export const mosaicImageContainerStyle = css({
	position: "relative",
	width: "100%",
	aspectRatio: "1",
	overflow: "hidden",
	borderRadius: "8px",
	cursor: "pointer",
	transition: "box-shadow 0.2s ease-in-out",
	minWidth: "120px",
	":hover": {
		boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
	}
});

export const mosaicImageContainerHoverStyle: React.CSSProperties = {
	transform: "scale(1.05)",
	boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
};

export const mosaicImageStyle: React.CSSProperties = {
	width: "100%",
	height: "100%",
	objectFit: "cover"
};

export const modalOverlayStyle: React.CSSProperties = {
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "rgba(0, 0, 0, 0.9)",
	zIndex: 9999,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	padding: "20px"
};

export const modalContentStyle: React.CSSProperties = {
	width: "100%",
	maxWidth: "1200px",
	height: "auto",
	position: "relative"
};

export const modalCloseButtonStyle: React.CSSProperties = {
	position: "absolute",
	top: "-40px",
	right: "0",
	background: "transparent",
	border: "none",
	color: "white",
	fontSize: "32px",
	cursor: "pointer",
	padding: "8px",
	zIndex: 10000,
	lineHeight: "1"
};
