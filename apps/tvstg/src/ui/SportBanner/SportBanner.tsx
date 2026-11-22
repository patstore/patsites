import { useNavigate } from "@tanstack/react-router";
import { FullButton } from "../Button";
import styles from "./SportBanner.module.css";
import { useCollection } from "@provider";

const SportBanner = () => {
	const navigate = useNavigate();
	const { items: categories } = useCollection("Category");
	console.log(categories);

	const filteredCategories = categories.filter(
		(category) =>
			category.category_id === "237be678-1f6f-418c-82bf-d4493cb28798"
	);
	console.log(filteredCategories);

	return (
		<div className={styles.banner}>
			<div className={styles.copy}>
				<h2 className={styles.title}>
					Finde jetzt Deine nächste Sportart!
				</h2>
			</div>
			<div className={styles.actions}>
				{filteredCategories.map((fachbereich) => (
					<FullButton
						key={fachbereich.objectId}
						color="white"
						text={fachbereich.title ?? ""}
						onClick={() =>
							navigate({
								to: `/sportangebot?kategorie=${fachbereich.objectId}`
								// params: { slug: fachbereich }
							})
						}
					/>
				))}
			</div>
		</div>
	);
};

export default SportBanner;
