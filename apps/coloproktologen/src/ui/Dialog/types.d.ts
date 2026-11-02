import React from "react";

export interface DialogProps {
	open: boolean;
	onClose: () => void;
	children: React.ReactNode;
	maxWidth?: string;
	showCloseButton?: boolean;
	closeOnBackdropClick?: boolean;
	animationDuration?: number;
	useBackdrop?: boolean;
	backgroundColor?: string;
	title?: string;
}
