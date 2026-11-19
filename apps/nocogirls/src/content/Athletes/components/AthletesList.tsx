import { ArrowRight } from "lucide-react";
import { useLocalization } from "@repo/core";
import { useNavigate } from "@tanstack/react-router";
import { toLocalizedHref } from "@provider";
import { useResolveImage } from "@ui";
import type { CategoryRecord, PersonRecord } from "@types";
import styles from "../Athletes.module.scss";

function CategoryImage({ imageId, title }: { imageId: string; title: string }) {
	const resolveImage = useResolveImage();
	const src = resolveImage(imageId);
	if (!src) {
		return null;
	}
	return <img src={src} alt={title} height={18} />;
}

export function AthletesList({
	athletes,
	categories,
	search
}: {
	athletes: PersonRecord[];
	categories: CategoryRecord[];
	search: string;
}) {
	const navigate = useNavigate();
	const { language } = useLocalization();
	const sorted = [...athletes].sort((a, b) =>
		(a.title ?? "").localeCompare(b.title ?? "")
	);
	const filtered = sorted.filter((athlete) =>
		(athlete.title ?? "").toLowerCase().includes(search.toLowerCase())
	);

	const categoryFor = (ids: string[] | null | undefined) =>
		categories.find((category) => ids?.includes(category.objectId));

	return (
		<div className={styles.athletes_list}>
			{filtered.length === 0 ? (
				<div className={styles.athlete_item}>
					<p>No athletes found</p>
				</div>
			) : (
				filtered.map((athlete) => {
					const category = categoryFor(athlete.categories);
					const href = toLocalizedHref(
						`/athletes/${athlete.slug ?? athlete.objectId}`,
						language
					);
					return (
						<div
							key={athlete.objectId}
							className={styles.athlete_item}
							onClick={() => void navigate({ href })}
						>
							<div className={styles.title}>
								<div className={styles.athlete_item_image}>
									{category?.image ? (
										<CategoryImage
											imageId={category.image}
											title={athlete.title ?? ""}
										/>
									) : null}
								</div>
								<div className={styles.title}>
									{(athlete.title ?? "")
										.split(" ")
										.map((word) => (
											<h3 key={word}>{word}</h3>
										))}
								</div>
							</div>
							<button className="round_button" type="button">
								<ArrowRight size={12} />
							</button>
						</div>
					);
				})
			)}
		</div>
	);
}
