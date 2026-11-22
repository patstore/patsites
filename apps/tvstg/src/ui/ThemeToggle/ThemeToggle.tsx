import { useEffect, useState } from "react";

const STORAGE_KEY = "tvstg-theme";

export function currentTheme(): "light" | "dark" {
	const explicit = document.documentElement.dataset.theme;
	if (explicit === "light" || explicit === "dark") {
		return explicit;
	}
	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light";
}

function SunIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
			className="theme-toggle-icon"
		>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
		</svg>
	);
}

function MoonIcon() {
	return (
		<svg
			viewBox="0 0 24 24"
			aria-hidden="true"
			focusable="false"
			className="theme-toggle-icon"
		>
			<path d="M21 14.5A8.5 8.5 0 1 1 9.5 3 6.8 6.8 0 0 0 21 14.5z" />
		</svg>
	);
}

export function ThemeToggle() {
	const [theme, setTheme] = useState<"light" | "dark">("light");

	useEffect(() => {
		const sync = () => setTheme(currentTheme());
		sync();
		window.addEventListener("tvstg-theme", sync);
		return () => window.removeEventListener("tvstg-theme", sync);
	}, []);

	const toggle = () => {
		const next = currentTheme() === "dark" ? "light" : "dark";
		document.documentElement.dataset.theme = next;
		localStorage.setItem(STORAGE_KEY, next);
		setTheme(next);
		window.dispatchEvent(new Event("tvstg-theme"));
	};

	return (
		<button
			type="button"
			className="btn-choice square theme-toggle"
			aria-pressed={theme === "dark"}
			aria-label={
				theme === "dark"
					? "Hellen Modus aktivieren"
					: "Dunklen Modus aktivieren"
			}
			onClick={toggle}
		>
			{theme === "dark" ? <SunIcon /> : <MoonIcon />}
		</button>
	);
}
