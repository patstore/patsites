import { Layout } from "@components";
import { Events, Header, Services, Welcome } from "./content";

const Home = () => (
  <Layout>
    <Header />
    <Welcome />
    <Events />
    <Services />
  </Layout>
);

export default Home;
