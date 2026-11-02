import React, { useState, useEffect } from "react";
import GoogleMapReact from "google-map-react";
import {
	markerContainerStyle,
	markerPinStyle,
	markerTextStyle,
	consentContainerStyle,
	consentContentStyle,
	consentTitleStyle,
	consentTextStyle,
	consentButtonsContainerStyle,
	acceptButtonStyle,
	declineButtonStyle,
	consentFooterTextStyle,
	consentLinkStyle,
	declinedContainerStyle,
	declinedTextStyle,
	enableButtonStyle,
	handleAcceptButtonHover,
	handleDeclineButtonHover
} from "./styles";

interface MarkerProps {
	lat: number;
	lng: number;
	text?: string;
	children?: React.ReactElement | string | number | null;
	onClick?: () => void;
}

const Marker = ({ children, text, onClick }: MarkerProps): JSX.Element => (
	<div
		style={markerContainerStyle}
		onClick={onClick}
	>
		{children ?? (
			<div style={markerPinStyle}>
				<div style={markerTextStyle}>{text ?? "📍"}</div>
			</div>
		)}
	</div>
);

export interface GoogleMapsProps {
	apiKey: string;
	center?: {
		lat: number;
		lng: number;
	};
	zoom?: number;
	markers?: MarkerProps[];
	onMapClick?: (coords: { lat: number; lng: number }) => void;
	mapContainerStyle?: React.CSSProperties;
	termsText?: string;
	acceptButtonText?: string;
	declineButtonText?: string;
	cookieName?: string;
	cookieExpiryDays?: number;
	onAccept?: () => void;
	onDecline?: () => void;
}

const COOKIE_NAME = "google_maps_consent";
const COOKIE_EXPIRY_DAYS = 365;

const setCookie = (name: string, value: string, days: number) => {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	const expires = `expires=${date.toUTCString()}`;
	document.cookie = `${name}=${value};${expires};path=/;SameSite=Lax`;
};

const getCookie = (name: string): string | null => {
	const nameEQ = `${name}=`;
	const cookies = document.cookie.split(";");
	for (let i = 0; i < cookies.length; i++) {
		let cookie = cookies[i];
		if (cookie) {
			while (cookie.charAt(0) === " ") {
				cookie = cookie.substring(1, cookie.length);
			}
			if (cookie.indexOf(nameEQ) === 0) {
				return cookie.substring(nameEQ.length, cookie.length);
			}
		}
	}
	return null;
};

const defaultCenter = { lat: 52.520008, lng: 13.404954 };

export const GoogleMaps: React.FC<GoogleMapsProps> = ({
	apiKey,
	center = { lat: 52.520008, lng: 13.404954 },
	zoom = 11,
	markers = [],
	onMapClick,
	mapContainerStyle = { height: "400px", width: "100%" },
	termsText = "Um Google Maps zu nutzen, müssen Sie die Nutzungsbedingungen und Datenschutzrichtlinien von Google Maps akzeptieren. Dies setzt notwendige Cookies für die Funktion des Dienstes.",
	acceptButtonText = "Akzeptieren & Karte anzeigen",
	declineButtonText = "Ablehnen",
	cookieName = COOKIE_NAME,
	cookieExpiryDays = COOKIE_EXPIRY_DAYS,
	onAccept,
	onDecline
}) => {
	const [hasConsent, setHasConsent] = useState<boolean | null>(null);

	useEffect(() => {
		// Check if consent cookie exists
		const consent = getCookie(cookieName);
		if (consent === "accepted") {
			setHasConsent(true);
		} else if (consent === "declined") {
			setHasConsent(false);
		} else {
			setHasConsent(null); // Show consent dialog
		}
	}, [cookieName]);

	const handleAccept = () => {
		setCookie(cookieName, "accepted", cookieExpiryDays);
		setHasConsent(true);
		onAccept?.();
	};

	const handleDecline = () => {
		setCookie(cookieName, "declined", cookieExpiryDays);
		setHasConsent(false);
		onDecline?.();
	};

	const handleMapClick = ({ lat, lng }: { lat: number; lng: number }) => {
		onMapClick?.({ lat, lng });
	};

	if (hasConsent === null) {
		// Show consent dialog
		return (
			<div style={consentContainerStyle(mapContainerStyle)}>
				<div style={consentContentStyle}>
					<h3 style={consentTitleStyle}>Google Maps Nutzungsbedingungen</h3>
					<p style={consentTextStyle}>{termsText}</p>
					<div style={consentButtonsContainerStyle}>
						<button
							onClick={handleAccept}
							style={acceptButtonStyle}
							onMouseEnter={handleAcceptButtonHover.enter}
							onMouseLeave={handleAcceptButtonHover.leave}
						>
							{acceptButtonText}
						</button>
						<button
							onClick={handleDecline}
							style={declineButtonStyle}
							onMouseEnter={handleDeclineButtonHover.enter}
							onMouseLeave={handleDeclineButtonHover.leave}
						>
							{declineButtonText}
						</button>
					</div>
					<p style={consentFooterTextStyle}>
						Weitere Informationen finden Sie in den{" "}
						<a
							href="https://policies.google.com/terms"
							target="_blank"
							rel="noopener noreferrer"
							style={consentLinkStyle}
						>
							Google Nutzungsbedingungen
						</a>{" "}
						und der{" "}
						<a
							href="https://policies.google.com/privacy"
							target="_blank"
							rel="noopener noreferrer"
							style={consentLinkStyle}
						>
							Datenschutzerklärung
						</a>
					</p>
				</div>
			</div>
		);
	}

	if (hasConsent === false) {
		// User declined
		return (
			<div style={declinedContainerStyle(mapContainerStyle)}>
				<div>
					<p style={declinedTextStyle}>
						Google Maps ist deaktiviert. Sie können es durch Akzeptieren der Bedingungen aktivieren.
					</p>
					<button
						onClick={handleAccept}
						style={enableButtonStyle}
						onMouseEnter={handleAcceptButtonHover.enter}
						onMouseLeave={handleAcceptButtonHover.leave}
					>
						Google Maps aktivieren
					</button>
				</div>
			</div>
		);
	}

	// User accepted - show map
	return (
		<div style={mapContainerStyle}>
			<GoogleMapReact
				bootstrapURLKeys={{ key: apiKey }}
				defaultCenter={defaultCenter}
				defaultZoom={zoom}
				onClick={handleMapClick}
				center={center}
			>
				{markers.map((marker, index) => (
					<Marker
						key={index}
						lat={marker.lat}
						lng={marker.lng}
						text={marker.text}
						onClick={marker.onClick}
					>
						{marker.children}
					</Marker>
				))}
			</GoogleMapReact>
		</div>
	);
};

export default GoogleMaps;
