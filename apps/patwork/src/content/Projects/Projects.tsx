import { ContactContent, Layout } from "@components";

import { ProjectGrid, ProjectsHeadContent } from "./content";

const Projects = () => {
    return (
        <Layout>
            <ProjectsHeadContent />
            <ProjectGrid />
            <ContactContent />
        </Layout>
    );
};

export default Projects;
