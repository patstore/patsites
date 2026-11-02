import { Layout } from "@components";
import { HeadContent } from "@ui";
import React from "react";
import { SpecialistSearch } from "./content";

const Spezialistensuche: React.FC = () => {
    return (
        <Layout showKongress={false}>
            <HeadContent title="Suchen. Finden. Kompetent beraten." isInline />
            <SpecialistSearch />
        </Layout>
    );
};

export default Spezialistensuche;
