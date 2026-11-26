import { ErrorComponentProps, Link, useRouter } from "@tanstack/react-router";
import { Layout } from "../Layout";
import styles from "./StatusPages.module.css";

export const NotFound = () => (
	<Layout>
		<section className={`container ${styles.page}`}>
			<h1>Seite nicht gefunden</h1>
			<p>Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
			<Link to="/" className="button">
				Zur Startseite
			</Link>
		</section>
	</Layout>
);

export const RouteError = ({ error, reset }: ErrorComponentProps) => {
	const router = useRouter();

	return (
		<Layout>
			<section className={`container ${styles.page}`}>
				<h1>Etwas ist schiefgelaufen</h1>
				<p>Bitte versuchen Sie es gleich noch einmal.</p>
				{import.meta.env.DEV ? (
					<pre>
						{error instanceof Error ? error.message : String(error)}
					</pre>
				) : null}
				<div className={styles.actions}>
					<button
						type="button"
						className="button"
						onClick={() => {
							reset();
							void router.invalidate();
						}}
					>
						Erneut versuchen
					</button>
					<Link to="/">Zur Startseite</Link>
				</div>
			</section>
		</Layout>
	);
};
