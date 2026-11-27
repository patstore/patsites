import settings from "@settings";

export const cancerLogoContainer = settings.mq({
	width: "100%",
	height: "auto",
	display: "flex",
	flexDirection: ["row", "row", "row"],
	alignItems: "center",
	justifyContent: "flex-start",
	gap: "30px",
	paddingBottom: settings.sizes.medium
});

export const manualContainer = settings.mq({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "flex-start",
	textAlign: "center",
	cursor: "pointer",
	gap: 0,
	p: {
		maxWidth: "300px"
	}
});

export const openAccessTextContainer = settings.mq({
	position: "absolute",
	top: "50%",
	left: "50%",
	width: "80%",
	maxWidth: "960px",
	transform: "translate(-50%, -50%)",
	zIndex: 2,
	h2: {
		fontWeight: 500,
		fontSize: ["32px", "32px", "48px"]
	}
});

export const headBannerContainer = settings.mq({
	width: "100%",
	height: "auto",
	padding: ["30px 24px", "30px 24px", "60px 24px"],
	backgroundColor: settings.colors.primary,
	color: settings.colors.white
});

export const headBannerContent = settings.mq({
	width: "100%",
	height: "auto",
	display: "flex",
	flexDirection: ["column", "column", "row"],
	alignItems: ["flex-start", "flex-start", "center"],
	justifyContent: "center",
	textAlign: "left",
	maxWidth: "960px",
	margin: "auto",
	h2: {
		marginTop: "0 !important",
		fontSize: ["36px !important", "42px !important", "48px !important"]
	},
	p: {
		fontSize: ["13px", "14px", "14px"],
		fontWeight: 600
	}
});

export const manualLabelContainer = settings.mq({
	padding: settings.padding.small,
	paddingLeft: "30px",
	paddingRight: "30px",
	border: `1px solid ${settings.colors.dark}`,
	backgroundColor: settings.colors.white,
	position: "absolute",
	top: "100%",
	left: "50%",
	width: "150px",
	transform: "translate(-50%, -50%)",
	textTransform: "uppercase",
	fontWeight: 400,
	color: settings.colors.dark,
	letterSpacing: "1.8px",
	fontSize: "16px",
	zIndex: 2
});

export const congressFacts = settings.mq({
	display: "flex",
	flexDirection: ["column", "row", "row"],
	gap: ["12px", "12px", "16px"],
	marginTop: settings.sizes.extraLarge,
	width: "100%"
});

export const congressFact = settings.mq({
	flex: 1,
	display: "flex",
	flexDirection: "column",
	gap: "2px",
	padding: `${settings.sizes.medium} ${settings.sizes.veryLarge}`,
	backgroundColor: settings.colors.white,
	borderTop: `4px solid ${settings.colors.primary}`,
	boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)",
	span: {
		fontSize: "12px",
		fontWeight: 600,
		letterSpacing: "1.6px",
		textTransform: "uppercase",
		color: settings.colors.primary
	},
	strong: {
		fontSize: ["20px", "22px", "24px"],
		fontWeight: 600,
		lineHeight: 1.2,
		color: settings.colors.dark
	}
});

export const congressLead = settings.mq({
	marginTop: settings.sizes.extraLarge,
	display: "grid",
	gridTemplateColumns: ["1fr", "1fr", "1fr 1fr"],
	gap: ["12px", "18px", "30px"],
	strong: {
		color: settings.colors.primary,
		fontWeight: 700
	}
});

export const congressProgram = settings.mq({
	marginTop: settings.sizes.extraLarge,
	display: "flex",
	flexDirection: "column",
	gap: "36px",
	backgroundColor: settings.colors.white,
	borderRadius: settings.sizes.medium,
	padding: [
		settings.sizes.large,
		settings.sizes.veryLarge,
		settings.sizes.extraLarge
	],
	width: "100%",
	boxShadow: "0 6px 24px rgba(0, 0, 0, 0.08)",
	h3: {
		marginTop: 0,
		marginBottom: settings.sizes.medium
	}
});

export const programTopics = settings.mq({
	display: "grid",
	gridTemplateColumns: ["1fr", "1fr", "repeat(3, 1fr)"],
	gap: settings.sizes.large,
	counterReset: "topic"
});

export const programTopic = settings.mq({
	position: "relative",
	counterIncrement: "topic",
	padding: `${settings.sizes.veryLarge} ${settings.sizes.large} ${settings.sizes.large}`,
	backgroundColor: settings.colors.lightgrey,
	borderTop: `4px solid ${settings.colors.primary}`,
	"&::before": {
		content: "counter(topic, decimal-leading-zero)",
		display: "block",
		fontSize: "36px",
		fontWeight: 700,
		lineHeight: 1,
		marginBottom: settings.sizes.medium,
		color: settings.colors.primaryLight
	},
	h4: {
		marginTop: 0,
		marginBottom: settings.sizes.medium,
		color: settings.colors.primary
	},
	p: {
		marginBottom: 0,
		fontSize: "15px",
		lineHeight: 1.5
	}
});

export const programFormats = settings.mq({
	display: "flex",
	flexWrap: "wrap",
	gap: settings.sizes.small,
	margin: `0 0 ${settings.sizes.large} 0`,
	padding: 0,
	li: {
		listStyle: "none",
		padding: "3px 6px",
		borderRadius: "3px",
		backgroundColor: settings.colors.primaryLight,
		color: settings.colors.dark,
		fontSize: "11px",
		textTransform: "uppercase",
		fontWeight: 600
	}
});

export const homeHeaderTextContent = settings.mq({
	fontSize: ["18px !important", "18px !important", "21px !important"],
	letterSpacing: "1.6px",
	maxWidth: "480px",
	lineHeight: "1.1",
	margin: 0,
	fontWeight: 500,
	marginBottom: settings.sizes.medium,
	color: settings.colors.white
});
