import type { ReactNode } from "react";
import Header from "./Header";

const Framework = ({ children }: { children: ReactNode }) => (
	<>
		<Header />
		{children}
	</>
);

export default Framework;
