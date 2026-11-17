import { Moon, Sun } from "lucide-react";
import { useTheme } from "@context";
import styles from "../Header.module.scss";

export function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<div
			className={styles.theme_toggle}
			onClick={toggleTheme}
			aria-pressed={theme === "dark"}
			aria-label={
				theme === "dark"
					? "Switch to light mode"
					: "Switch to dark mode"
			}
		>
			<button
				className={styles.theme_toggle_button}
				type="button"
				data-active={theme === "light"}
			>
				<Sun size={18} strokeWidth={2.25} />
			</button>
			<button
				className={styles.theme_toggle_button}
				type="button"
				data-active={theme === "dark"}
			>
				<Moon size={18} strokeWidth={2.25} />
			</button>
		</div>
	);
}
