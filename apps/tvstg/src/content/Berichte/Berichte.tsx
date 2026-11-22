import React, { useMemo } from "react";
import { useCollection } from "@provider";
import { Layout } from "@components";
import { BlogElement, FlexBox, HeadContent } from "@ui";
import styles from "./Berichte.module.css";
import "./styles.css";

const ARTICLES_PER_PAGE = 18;

type BerichteProps = {
	kategorie?: string;
	/** 1-based page number. */
	seite: number;
	onCategoryChange: (kategorie: string | undefined) => void;
	onPageChange: (seite: number) => void;
	pageHref: (seite: number) => string;
};

const visiblePages = (
	current: number,
	total: number
): Array<number | "gap"> => {
	const pages = new Set<number>([1, total, current]);
	for (let offset = 1; offset <= 2; offset += 1) {
		pages.add(current - offset);
		pages.add(current + offset);
	}
	const sorted = [...pages]
		.filter((page) => page >= 1 && page <= total)
		.sort((a, b) => a - b);
	const items: Array<number | "gap"> = [];
	sorted.forEach((page, index) => {
		const previous = sorted[index - 1];
		if (previous !== undefined && page - previous > 1) {
			items.push("gap");
		}
		items.push(page);
	});
	return items;
};

const Berichte: React.FC<BerichteProps> = ({
	kategorie,
	seite,
	onCategoryChange,
	onPageChange,
	pageHref
}) => {
	const { items: articles } = useCollection("Article");
	const { items: categorys } = useCollection("Category");
	const visible = useMemo(() => {
		return articles
			.filter(
				(article) =>
					!kategorie || article.categories?.includes(kategorie)
			)
			.sort(
				(a, b) =>
					new Date(b.date || "").getTime() -
					new Date(a.date || "").getTime()
			);
	}, [articles, kategorie]);
	const pageCount = Math.max(
		1,
		Math.ceil(visible.length / ARTICLES_PER_PAGE)
	);
	const page = Math.min(Math.max(seite, 1), pageCount);
	const pageArticles = visible.slice(
		(page - 1) * ARTICLES_PER_PAGE,
		page * ARTICLES_PER_PAGE
	);

	const articleCounts = useMemo(() => {
		const counts = new Map<string, number>();
		articles.forEach((article) => {
			article.categories?.forEach((id) => {
				counts.set(id, (counts.get(id) ?? 0) + 1);
			});
		});
		return counts;
	}, [articles]);

	const categories = useMemo(
		() =>
			categorys
				.filter((category) => category.type === "sportarten")
				.map((category) => ({
					label: category.title || "",
					value: category.objectId,
					count: articleCounts.get(category.objectId) ?? 0
				})),
		[articleCounts, categorys]
	);

	const goToPage = (
		event: React.MouseEvent<HTMLAnchorElement>,
		next: number
	) => {
		event.preventDefault();
		if (next !== page) {
			onPageChange(next);
		}
	};

	return (
		<Layout>
			<div className="wrapper">
				<HeadContent
					titel="Beiträge"
					titeltext="Aktuelle und vergangene Berichte aus dem Vereinsgeschehen"
				/>
				<div className="site-container">
					<FlexBox direction="column" align="center" justify="center">
						<div
							className={`choice-row ${styles.filterBar}`}
							role="group"
							aria-label="Kategorien filtern"
						>
							<button
								type="button"
								aria-pressed={!kategorie}
								className={`btn-choice ${styles.choice}`}
								onClick={() => onCategoryChange(undefined)}
							>
								<span>Alle</span>
								<span className={styles.count}>
									({articles.length})
								</span>
							</button>
							{categories.map((category) => {
								const isSelected = kategorie === category.value;
								return (
									<button
										key={category.value}
										type="button"
										disabled={category.count === 0}
										aria-pressed={isSelected}
										className={`btn-choice ${styles.choice}`}
										onClick={() =>
											onCategoryChange(category.value)
										}
									>
										<span>{category.label}</span>
										<span className={styles.count}>
											({category.count})
										</span>
									</button>
								);
							})}
						</div>
						<FlexBox
							justify="space-between"
							wrap
							align="stretch"
							gap="12px"
						>
							{pageArticles.length > 0 ? (
								pageArticles.map((value) => (
									<BlogElement
										type="tile"
										image={value.image}
										categories={value.categories}
										title={value.title}
										date={value.date}
										key={value.objectId}
										flex={["100%", "45%", "30%"]}
									/>
								))
							) : (
								<p>Keine Artikel gefunden</p>
							)}
						</FlexBox>
					</FlexBox>
					<ul className="pagination">
						<li className="page-item">
							{page > 1 ? (
								<a
									className="page-link"
									href={pageHref(page - 1)}
									onClick={(event) =>
										goToPage(event, page - 1)
									}
								>
									{"< zurück"}
								</a>
							) : (
								<span className="page-link" aria-disabled="true">
									{"< zurück"}
								</span>
							)}
						</li>
						{visiblePages(page, pageCount).map((item, index) =>
							item === "gap" ? (
								<li
									key={`gap-${index}`}
									className="page-item"
									aria-hidden="true"
								>
									<span className="page-link">...</span>
								</li>
							) : (
								<li
									key={item}
									className={
										item === page
											? "page-item active"
											: "page-item"
									}
								>
									<a
										className="page-link"
										href={pageHref(item)}
										aria-current={
											item === page ? "page" : undefined
										}
										onClick={(event) =>
											goToPage(event, item)
										}
									>
										{item}
									</a>
								</li>
							)
						)}
						<li className="page-item">
							{page < pageCount ? (
								<a
									className="page-link"
									href={pageHref(page + 1)}
									onClick={(event) =>
										goToPage(event, page + 1)
									}
								>
									{"weiter >"}
								</a>
							) : (
								<span className="page-link" aria-disabled="true">
									{"weiter >"}
								</span>
							)}
						</li>
					</ul>
				</div>
			</div>
		</Layout>
	);
};

export default Berichte;
