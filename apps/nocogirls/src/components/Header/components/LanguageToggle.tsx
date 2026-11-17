import { Fragment } from "react";
import { useLocalization } from "@repo/core";
import { useNavigate } from "@tanstack/react-router";
import { toLocalizedHref } from "@provider";
import styles from "../Header.module.scss";

function languageLabel(lang: string): string {
	return lang.toUpperCase();
}

export function LanguageToggle() {
	const navigate = useNavigate();
	const { pathname, language, languages } = useLocalization();

	if (languages.length <= 1) {
		return null;
	}

	const switchLanguage = (lang: string) => {
		if (lang === language) {
			return;
		}
		void navigate({ href: toLocalizedHref(pathname, lang) });
	};

	return (
		<div
			className={styles["language-toggle"]}
			role="group"
			aria-label="Language"
		>
			{languages.map((lang, index) => (
				<Fragment key={lang}>
					<button
						type="button"
						className={
							styles["language-toggle-button"] +
							(lang === language ? " " + styles["is-active"] : "")
						}
						onClick={() => switchLanguage(lang)}
						aria-pressed={lang === language}
						aria-label={`Switch to ${languageLabel(lang)}`}
					>
						{languageLabel(lang)}
					</button>
					{index < languages.length - 1 ? (
						<div className={styles.divider} />
					) : null}
				</Fragment>
			))}
		</div>
	);
}
