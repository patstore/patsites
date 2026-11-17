import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Instagram } from "lucide-react";
import { useLocalization, useOptionalScroll } from "@repo/core";
import { useNavigate } from "@tanstack/react-router";
import { siteLocalization, toLocalizedHref } from "@provider";
import { LanguageToggle } from "./components/LanguageToggle";
import { HeaderNavLink } from "./components/HeaderNavLink";
import { ThemeToggle } from "./components/ThemeToggle";
import { getHeaderNavItems } from "./constants/nav";
import styles from "./Header.module.scss";

const SCROLL_THRESHOLD = 200;

function prefersReducedMotion(): boolean {
	return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function measureExpandedWidth(expanded: HTMLElement): number {
	const previousWidth = expanded.style.width;
	expanded.style.width = "auto";
	const width = expanded.scrollWidth;
	expanded.style.width = previousWidth;
	return width;
}

function setExpandedOpen(expanded: HTMLElement, open: boolean) {
	if (open) {
		gsap.set(expanded, { clearProps: "width" });
	} else {
		gsap.set(expanded, { width: 0 });
	}
}

function tweenExpandedOpen(expanded: HTMLElement, open: boolean) {
	const duration = prefersReducedMotion() ? 0 : 0.45;

	if (open) {
		return gsap.to(expanded, {
			width: measureExpandedWidth(expanded),
			duration,
			ease: "power2.inOut",
			overwrite: true,
			onComplete() {
				gsap.set(expanded, { clearProps: "width" });
			}
		});
	}

	gsap.set(expanded, { width: expanded.offsetWidth });
	return gsap.to(expanded, {
		width: 0,
		duration,
		ease: "power2.inOut",
		overwrite: true
	});
}

export function Header() {
	const navigate = useNavigate();
	const { language } = useLocalization();
	const scroll = useOptionalScroll();
	const navItems = getHeaderNavItems(
		language,
		siteLocalization.defaultLanguage
	);
	const homePath = toLocalizedHref("/", language);
	const [isNavOpen, setIsNavOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const isScrolledRef = useRef(isScrolled);
	const logoTextRef = useRef<HTMLDivElement>(null);
	const hasAnimatedLogo = useRef(false);

	isScrolledRef.current = isScrolled;

	useEffect(() => {
		const onScroll = () => {
			const current = scroll?.getSnapshot().scroll ?? window.scrollY;
			const pastThreshold = current > SCROLL_THRESHOLD;
			if (pastThreshold === isScrolledRef.current) {
				return;
			}
			isScrolledRef.current = pastThreshold;
			setIsScrolled(pastThreshold);
		};

		onScroll();
		if (!scroll) {
			window.addEventListener("scroll", onScroll, { passive: true });
			return () => window.removeEventListener("scroll", onScroll);
		}
		return scroll.subscribe(onScroll);
	}, [scroll]);

	useEffect(() => {
		const logoText = logoTextRef.current;
		if (!logoText) {
			return;
		}

		gsap.killTweensOf(logoText);

		if (!hasAnimatedLogo.current) {
			hasAnimatedLogo.current = true;
			setExpandedOpen(logoText, !isScrolled);
			return;
		}

		const tween = tweenExpandedOpen(logoText, !isScrolled);
		return () => {
			tween.kill();
			gsap.killTweensOf(logoText);
		};
	}, [isScrolled]);

	return (
		<header className={styles.site_header}>
			<div className={styles.inner}>
				<a
					className={styles.logo}
					href={homePath}
					onClick={(event) => {
						event.preventDefault();
						void navigate({ href: homePath });
					}}
				>
					<div className={styles.logo_image}>
						<img src="/logo.png" alt="No Co Girls" />
					</div>
					<div
						ref={logoTextRef}
						className={styles.logo_expanded}
						aria-hidden={isScrolled || undefined}
					>
						<div className={styles.divider} />
						<span className={styles.logo_text}>
							<span>no</span> <span>co</span> <span>girls</span>
						</span>
					</div>
				</a>

				<div className={styles.nav_cluster}>
					<nav className={styles.nav} aria-label="Main">
						<div
							className={styles.nav_expanded}
							aria-hidden={isNavOpen ? undefined : true}
							ref={(node) => {
								if (node) {
									node.inert = !isNavOpen;
								}
							}}
						>
							<div className={styles.toggle_container}>
								<div className={styles.nav_lang}>
									<ThemeToggle />
								</div>
								<div className={styles.nav_lang}>
									<LanguageToggle />
								</div>
							</div>
							<ul className={styles.nav_list}>
								{navItems.map((item) => (
									<HeaderNavLink
										key={item.path}
										item={item}
										setIsNavOpen={setIsNavOpen}
									/>
								))}
							</ul>
							<div className="flex column align-center justify-between gap-lg">
								<div>
									<div className="button dark">
										<span>Follow us on Instagram</span>
										<Instagram size={12} />
									</div>
									<div className="divider" />
								</div>
								<div className="flex row align-center gap-md justify-center">
									<div className="footer_links">
										<a href="https://www.no-co-girls.com/datenschutz">
											Datenschutz
										</a>
									</div>
									<div className="footer_links">
										<a href="https://www.no-co-girls.com/impressum">
											Impressum
										</a>
									</div>
								</div>
							</div>
						</div>
						<div
							className={
								styles.nav_collapsed +
								(isNavOpen ? " " + styles.is_open : "")
							}
							onClick={() => setIsNavOpen(!isNavOpen)}
							role="button"
							tabIndex={0}
							aria-expanded={isNavOpen}
							aria-label={isNavOpen ? "Close menu" : "Open menu"}
							onKeyDown={(event) => {
								if (
									event.key === "Enter" ||
									event.key === " "
								) {
									event.preventDefault();
									setIsNavOpen(!isNavOpen);
								}
							}}
						>
							<div className={styles.burger_container}>
								<div className={styles.burger_line} />
								<div
									className={`${styles.burger_line} ${styles.short}`}
									data-short="true"
								/>
							</div>
							<div className={styles.menu_label}>
								<p>
									<span>Menu</span>
								</p>
							</div>
						</div>
					</nav>
				</div>
			</div>
		</header>
	);
}
