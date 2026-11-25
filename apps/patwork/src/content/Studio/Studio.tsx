import { ContactContent, Layout } from "@components";
import {
    StudioHeader,
    StudioKooperation,
    StudioPhilosophy,
    StudioPresentation
} from "./content";

const Steps = () => {
    return (
        <Layout>
            <StudioHeader />
            <StudioPresentation />
            {/* <StudioKooperation /> */}
            <StudioPhilosophy />
            <ContactContent />
        </Layout>
    );
};

export default Steps;
