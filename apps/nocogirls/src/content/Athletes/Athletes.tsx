import { useState } from "react";
import { Field, Section } from "@repo/core";
import { Footer } from "@components";
import { useCollection } from "@repo/provider";
import type { CategoryRecord, PersonRecord } from "@types";
import { AthletesList } from "./components/AthletesList";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import styles from "./Athletes.module.scss";

export function Athletes() {
	const [search, setSearch] = useState("");
	const debouncedSearch = useDebouncedValue(search, 500);
	const { items: athletes } = useCollection<PersonRecord>("Person");
	const { items: categories } = useCollection<CategoryRecord>("Category");

	return (
		<>
			<Section id="Athletes">
				<section className={styles.athletes}>
					<div className={styles.athletes_header}>
						<div>
							<div className="eyebrow transform">
								<Field id="eyebrow">
									Get information about our
								</Field>
							</div>
							<h1 className="border" id="title">
								Athletes
							</h1>
						</div>
						<label htmlFor="search">
							<Field id="label">
								<span>Search for athletes</span>
							</Field>
							<br />
							<input
								id="search"
								type="text"
								placeholder="Anna Kerko"
								value={search}
								onChange={(event) =>
									setSearch(event.target.value)
								}
							/>
						</label>
					</div>
					<AthletesList
						athletes={athletes}
						categories={categories}
						search={debouncedSearch}
					/>
				</section>
			</Section>
			<Footer />
		</>
	);
}
