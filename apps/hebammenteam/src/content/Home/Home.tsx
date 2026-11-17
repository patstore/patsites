import { Layout, Marquee } from "@components";
import { Events, Header, Services, Team, Welcome } from "./content";

const Home = () => (
	<Layout>
		<Header />
		<Marquee />
		<Welcome />
		<Team />
		<Events />
		<Services />
	</Layout>
);

export default Home;
