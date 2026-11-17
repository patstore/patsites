import type { ReactNode } from "react";
import { Header } from "../Header";

export function Layout({ children }: { children: ReactNode }) {
	return (
		<div className="site">
			<Header />
			<main className="site-main">
				<div className="page-content">{children}</div>
			</main>
		</div>
	);
}
