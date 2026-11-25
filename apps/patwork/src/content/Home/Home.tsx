import { ContactContent, Layout } from "@components";
import { HeadContent, OfferContent, WorkContent } from "./content";

const Home = () => {
    return (
        <Layout>
            <HeadContent />
            <OfferContent />
            <WorkContent />
            {/* <HomePatstoreContent /> */}
            {/* <HomeProcessContent /> */}
            <ContactContent />
        </Layout>
    );
};

export default Home;
