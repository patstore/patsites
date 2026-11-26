import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import Footer from "./components/Footer";
import type { LayoutProps } from "./types";
import type { FC } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<>
			<main id="main">{children}</main>
			{/* <Footer /> */}
		</>
	);
};

export default Layout;
