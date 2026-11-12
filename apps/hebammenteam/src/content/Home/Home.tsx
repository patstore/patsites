import { Layout } from "@components";
import { Events, Header, Services, Team, Welcome } from "./content";

const Home = () => (
  <Layout>
    <Header />
    <Welcome />
    <Events />
    <Team />
    <Services />
  </Layout>
);

export default Home;
