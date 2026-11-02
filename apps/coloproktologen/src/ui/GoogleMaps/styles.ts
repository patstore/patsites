import type React from "react";

// Colors
const colors = {
	primary: "#4285f4",
	primaryHover: "#357ae8",
	danger: "#e74c3c",
	dangerDark: "#c0392b",
	white: "#ffffff",
	textPrimary: "#333",
	textSecondary: "#666",
	textTertiary: "#999",
	borderLight: "#ddd",
	backgroundLight: "#f5f5f5",
	transparent: "transparent"
};

// Marker Styles
export const markerContainerStyle: React.CSSProperties = {
	position: "absolute",
	transform: "translate(-50%, -100%)",
	cursor: "pointer"
};

export const markerPinStyle: React.CSSProperties = {
	background: colors.danger,
	borderRadius: "50% 50% 50% 0",
	width: "30px",
	height: "30px",
	border: `2px solid ${colors.dangerDark}`,
	transform: "rotate(-45deg)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center"
};

export const markerTextStyle: React.CSSProperties = {
	transform: "rotate(45deg)",
	color: "black",
	fontSize: "12px",
	fontWeight: "bold",
	textAlign: "center"
};

// Consent Dialog Styles
export const consentContainerStyle = (mapContainerStyle?: React.CSSProperties): React.CSSProperties => ({
	...mapContainerStyle,
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: colors.backgroundLight,
	border: `1px solid ${colors.borderLight}`,
	borderRadius: "8px",
	padding: "32px",
	textAlign: "center"
});

export const consentContentStyle: React.CSSProperties = {
	maxWidth: "600px",
	marginBottom: "24px"
};

export const consentTitleStyle: React.CSSProperties = {
	fontSize: "20px",
	fontWeight: "600",
	marginBottom: "16px",
	color: colors.textPrimary
};

export const consentTextStyle: React.CSSProperties = {
	fontSize: "14px",
	lineHeight: "1.6",
	color: colors.textSecondary,
	marginBottom: "24px"
};

export const consentButtonsContainerStyle: React.CSSProperties = {
	display: "flex",
	gap: "12px",
	justifyContent: "center",
	flexWrap: "wrap"
};

export const acceptButtonStyle: React.CSSProperties = {
	backgroundColor: colors.primary,
	color: colors.white,
	border: "none",
	borderRadius: "4px",
	padding: "12px 24px",
	fontSize: "14px",
	fontWeight: "500",
	cursor: "pointer",
	transition: "background-color 0.2s"
};

export const declineButtonStyle: React.CSSProperties = {
	backgroundColor: colors.transparent,
	color: colors.textSecondary,
	border: `1px solid ${colors.borderLight}`,
	borderRadius: "4px",
	padding: "12px 24px",
	fontSize: "14px",
	fontWeight: "500",
	cursor: "pointer",
	transition: "background-color 0.2s"
};

export const consentFooterTextStyle: React.CSSProperties = {
	fontSize: "12px",
	color: colors.textTertiary,
	marginTop: "16px"
};

export const consentLinkStyle: React.CSSProperties = {
	color: colors.primary,
	textDecoration: "none"
};

// Declined State Styles
export const declinedContainerStyle = (mapContainerStyle?: React.CSSProperties): React.CSSProperties => ({
	...mapContainerStyle,
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	backgroundColor: colors.backgroundLight,
	border: `1px solid ${colors.borderLight}`,
	borderRadius: "8px",
	padding: "32px",
	textAlign: "center"
});

export const declinedTextStyle: React.CSSProperties = {
	fontSize: "14px",
	color: colors.textSecondary,
	marginBottom: "16px"
};

export const enableButtonStyle: React.CSSProperties = {
	backgroundColor: colors.primary,
	color: colors.white,
	border: "none",
	borderRadius: "4px",
	padding: "10px 20px",
	fontSize: "14px",
	fontWeight: "500",
	cursor: "pointer"
};

// Hover handlers
export const handleAcceptButtonHover = {
	enter: (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.backgroundColor = colors.primaryHover;
	},
	leave: (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.backgroundColor = colors.primary;
	}
};

export const handleDeclineButtonHover = {
	enter: (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.backgroundColor = colors.backgroundLight;
	},
	leave: (e: React.MouseEvent<HTMLButtonElement>) => {
		e.currentTarget.style.backgroundColor = colors.transparent;
	}
};
