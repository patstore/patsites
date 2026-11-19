import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useMemo,
	useRef,
	type ReactNode
} from "react";
import { Link } from "@tanstack/react-router";
import { useOptionalScroll } from "@repo/core";
import type { PersonClass } from "@data";
import { useCollection } from "@provider";
import { motion, useMotionValue, type MotionValue } from "motion/react";
import {
	displayName,
	initials,
	personSlug,
	personTransitionProps,
	portraitSrc,
	sortPersons
} from "../person";
import { imgParallax, imgStyling } from "./img";
import styles from "./TeamRoster.module.css";
import { ChevronRightIcon } from "lucide-react";

const valueForIndex = <T,>(
	values: Record<string, T>,
	index: number,
	fallback: T
) => {
	const keys = Object.keys(values);
	const key = keys[index % keys.length];
	return key === undefined ? fallback : (values[key] ?? fallback);
};

type MemberRegistration = {
	element: HTMLElement;
	y: MotionValue<number>;
	parallax: number;
};

const Member = ({
	rotate,
	parallax,
	register,
	children
}: {
	rotate: number;
	parallax: number;
	register: (member: MemberRegistration) => () => void;
	children: ReactNode;
}) => {
	const ref = useRef<HTMLLIElement>(null);
	const y = useMotionValue(0);

	useLayoutEffect(() => {
		const element = ref.current;
		if (!element) {
			return;
		}
		return register({ element, y, parallax });
	}, [parallax, register, y]);

	return (
		<motion.li ref={ref} className={styles.item} style={{ rotate, y }}>
			{children}
		</motion.li>
	);
};

const TeamRoster = ({
	empty = false,
	onSelect,
	isContact = false
}: {
	empty?: boolean;
	isContact?: boolean;
	onSelect?: (person: PersonClass) => void;
}) => {
	const scroll = useOptionalScroll();
	const members = useRef(new Set<MemberRegistration>());
	const register = useRef((member: MemberRegistration) => {
		members.current.add(member);
		return () => {
			members.current.delete(member);
		};
	}).current;
	const { items } = useCollection("Person");
	const { items: images } = useCollection("Image");
	const portraitFor = useMemo(() => {
		const byId = new Map(images.map((image) => [image.objectId, image]));
		return (id: string | null | undefined) =>
			portraitSrc(id ? byId.get(id) : undefined);
	}, [images]);
	const persons = useMemo(() => sortPersons(items), [items]);

	const updateParallax = useCallback(() => {
		const height = window.innerHeight || 1;
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)"
		).matches;

		members.current.forEach((member) => {
			if (reduceMotion) {
				member.y.set(0);
				return;
			}
			const applied = member.y.get();
			const rect = member.element.getBoundingClientRect();
			const naturalCenter = rect.top - applied + rect.height / 2;
			member.y.set((naturalCenter / height - 0.5) * member.parallax);
		});
	}, []);

	useLayoutEffect(() => {
		updateParallax();
	}, [updateParallax, persons, images]);

	useEffect(() => {
		if (!scroll) {
			window.addEventListener("scroll", updateParallax, {
				passive: true
			});
			window.addEventListener("resize", updateParallax);
			return () => {
				window.removeEventListener("scroll", updateParallax);
				window.removeEventListener("resize", updateParallax);
			};
		}

		window.addEventListener("resize", updateParallax);
		const unsubscribe = scroll.subscribe(updateParallax);
		return () => {
			unsubscribe();
			window.removeEventListener("resize", updateParallax);
		};
	}, [scroll, updateParallax]);

	if (persons.length === 0) {
		if (!empty) {
			return null;
		}
		return (
			<p className={styles.empty}>
				Das Team erscheint hier, sobald die Profile veröffentlicht sind.
			</p>
		);
	}

	const getFirstName = (name: string) => {
		return name.split(" ")[0];
	};

	return (
		<ul className={styles.list}>
			{persons.map((person, index) => {
				const name = displayName(person);
				const portrait = portraitFor(person.image);
				const transition = personTransitionProps(person.objectId);
				const card = (
					<>
						{portrait ? (
							<img
								{...transition}
								className={styles.portrait}
								src={portrait}
								alt=""
							/>
						) : (
							<span
								{...transition}
								className={styles.placeholder}
								aria-hidden="true"
							>
								{initials(name) || "H"}
							</span>
						)}
						<span className={styles.name}>{name}</span>
						<div className={styles.button}>
							{onSelect ? (
								<button className="inverted with-icon">
									{isContact
										? "Schreibe " + getFirstName(name)
										: "Mehr über " + getFirstName(name)}
									<div className="icon">
										<ChevronRightIcon className="icon-inner" />
									</div>
								</button>
							) : (
								<button
									type="button"
									className="inverted with-icon"
									tabIndex={-1}
								>
									{isContact
										? "Schreibe" + getFirstName(name)
										: "Mehr über " + getFirstName(name)}
									<div className="icon">
										<ChevronRightIcon className="icon-inner" />
									</div>
								</button>
							)}
						</div>
					</>
				);
				return (
					<Member
						key={person.objectId}
						rotate={
							valueForIndex(imgStyling, index, { rotate: 0 })
								.rotate
						}
						parallax={valueForIndex(imgParallax, index, 0)}
						register={register}
					>
						{onSelect ? (
							<button
								type="button"
								className={styles.person}
								onClick={() => onSelect(person)}
							>
								{card}
							</button>
						) : (
							<Link
								to="/team/$slug"
								params={{ slug: personSlug(person) }}
								className={styles.person}
							>
								{card}
							</Link>
						)}
					</Member>
				);
			})}
		</ul>
	);
};

export default TeamRoster;
