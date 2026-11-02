import React from "react";

export const backdropStyle = (open: boolean, animationDuration: number, useBackdrop: boolean): React.CSSProperties => ({
	position: "fixed",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: useBackdrop ? "rgba(0, 0, 0, 0.5)" : "transparent",
	display: "flex",
	alignItems: "flex-end",
	justifyContent: "center",
	zIndex: 1000,
	opacity: open ? 1 : 0,
	transition: `opacity ${animationDuration}ms ease-in-out`,
	pointerEvents: !open ? "none" : useBackdrop ? "auto" : "none"
});

export const dialogContainerStyle = (
	open: boolean,
	maxWidth: string,
	animationDuration: number
): React.CSSProperties => ({
	backgroundColor: "#ffffff",
	borderTopLeftRadius: "16px",
	borderTopRightRadius: "16px",
	maxWidth: maxWidth,
	width: "100%",
	maxHeight: "90vh",
	overflowY: "auto",
	boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)",
	position: "relative",
	transform: open ? "translateY(0)" : "translateY(100%)",
	transition: `transform ${animationDuration}ms ease-in-out`,
	display: "flex",
	flexDirection: "column"
});

export const closeButtonContainerStyle = (title: string): React.CSSProperties => ({
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	padding: "12px 16px",
	borderBottom: "1px solid #e0e0e0",
	justifyContent: title ? "space-between" : "flex-end"
});

export const closeButtonStyle: React.CSSProperties = {
	background: "transparent",
	border: "none",
	fontSize: "24px",
	cursor: "pointer",
	padding: "8px",
	lineHeight: 1,
	color: "#666",
	borderRadius: "4px",
	transition: "background-color 0.2s ease, color 0.2s ease"
};

export const contentStyle: React.CSSProperties = {
	padding: "24px",
	flex: 1,
	overflowY: "auto"
};

export const handleCloseButtonHover = {
	enter: (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.backgroundColor = "#f5f5f5";
		e.currentTarget.style.color = "#333";
	},
	leave: (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.backgroundColor = "transparent";
		e.currentTarget.style.color = "#666";
	}
};
