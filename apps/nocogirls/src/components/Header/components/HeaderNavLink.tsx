import { isSamePagePath, useLocalization } from "@repo/core";
import { useNavigate } from "@tanstack/react-router";
import { siteLocalization, toLocalizedHref } from "@provider";
import type { HeaderNavItem } from "../constants/nav";
import styles from "../Header.module.scss";

export function HeaderNavLink({
	item,
	setIsNavOpen
}: {
	item: HeaderNavItem;
	setIsNavOpen: (isNavOpen: boolean) => void;
}) {
	const navigate = useNavigate();
	const { pathname, language } = useLocalization();
	const itemPath = toLocalizedHref(item.path, language);
	const isActive = isSamePagePath(pathname, item.path, siteLocalization);

	return (
		<li
			className={
				styles.nav_link + (isActive ? " " + styles["is-active"] : "")
			}
		>
			<a
				href={itemPath}
				aria-current={isActive ? "page" : undefined}
				onClick={(event) => {
					event.preventDefault();
					void navigate({ href: itemPath });
					setIsNavOpen(false);
				}}
			>
				<span>{item.label}</span>
			</a>
		</li>
	);
}
