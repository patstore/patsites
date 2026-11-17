import {
	Link,
	type ErrorComponentProps,
	useRouter
} from "@tanstack/react-router";
import { Layout } from "../Layout";

export function NotFound() {
	return (
		<Layout>
			<section>
				<h1>Page not found</h1>
				<Link to="/">Back to home</Link>
			</section>
		</Layout>
	);
}

export function RouteError({ error, reset }: ErrorComponentProps) {
	const router = useRouter();

	return (
		<Layout>
			<section>
				<h1>Something went wrong</h1>
				{import.meta.env.DEV ? (
					<pre>
						{error instanceof Error ? error.message : String(error)}
					</pre>
				) : null}
				<button
					type="button"
					onClick={() => {
						reset();
						void router.invalidate();
					}}
				>
					Try again
				</button>
			</section>
		</Layout>
	);
}
