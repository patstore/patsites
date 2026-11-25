import { ContactContent, Layout } from "@components";
import {
    CustomSolution,
    PatworkPricing,
    PricingHeadContent,
    WebsitePricing
} from "./content";

const Pricing = () => {
    return (
        <Layout>
            <PricingHeadContent />
            <PatworkPricing />
            <CustomSolution />
            <WebsitePricing />
            <ContactContent />
        </Layout>
    );
};

export default Pricing;
