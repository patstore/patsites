import { Layout } from "@components";
import { Events, Header, Services, Team, Welcome } from "./content";

const Home = () => (
	<Layout>
		<Header />
		<Welcome />
		<Team />
		<Events />
		<Services />
	</Layout>
);

export default Home;
