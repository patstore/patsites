import { Link } from "@tanstack/react-router";
import { CmsBody, Layout } from "@components";
import styles from "./Home.module.css";
import { Events, Header, Welcome } from "./content";

const Home = () => (
  <Layout>
    <Header />
    <Welcome />
    <Events />
   
  
  </Layout>
);

export default Home;
