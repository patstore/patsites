import React, { useEffect } from "react";
import { DialogProps } from "./types";
import {
	backdropStyle,
	dialogContainerStyle,
	closeButtonContainerStyle,
	closeButtonStyle,
	contentStyle,
	handleCloseButtonHover
} from "./styles";

export const Dialog: React.FC<DialogProps> = ({
	open,
	onClose,
	children,
	maxWidth = "600px",
	showCloseButton = true,
	closeOnBackdropClick = true,
	animationDuration = 300,
	useBackdrop = false,
	backgroundColor = "#ffffff",
	title = ""
}) => {
	// Prevent body scroll when dialog is open
	useEffect(() => {
		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "";
		}

		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	// Handle ESC key to close dialog
	useEffect(() => {
		const handleEscKey = (event: KeyboardEvent) => {
			if (event.key === "Escape" && open) {
				onClose();
			}
		};

		if (open) {
			document.addEventListener("keydown", handleEscKey);
		}

		return () => {
			document.removeEventListener("keydown", handleEscKey);
		};
	}, [open, onClose]);

	const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
		if (useBackdrop && closeOnBackdropClick && e.target === e.currentTarget) {
			onClose();
		}
	};

	if (!open) {
		return null;
	}

	return (
		<div
			style={backdropStyle(open, animationDuration, useBackdrop)}
			onClick={handleBackdropClick}
		>
			<div
				style={{
					...dialogContainerStyle(open, maxWidth, animationDuration),
					pointerEvents: "auto",
					backgroundColor: backgroundColor
				}}
			>
				{showCloseButton && (
					<div style={closeButtonContainerStyle(title)}>
						{title && <h3 style={{ margin: 0 }}>{title}</h3>}
						<button
							onClick={onClose}
							style={closeButtonStyle}
							onMouseEnter={handleCloseButtonHover.enter}
							onMouseLeave={handleCloseButtonHover.leave}
							aria-label="Close dialog"
						>
							×
						</button>
					</div>
				)}
				<div style={contentStyle}>
					<>{children}</>
				</div>
			</div>
		</div>
	);
};

export default Dialog;
