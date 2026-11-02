import { Layout } from "@components";
import { HeadContent } from "@ui";
import React from "react";
import MemberSearch from "./components/MemberSearch";
import { MemberResult } from "./types";
import RenderResults from "./components/RenderResults";

const Mitgliedersuche: React.FC = () => {
    const [results, setResults] = React.useState<MemberResult[] | undefined>();

    return (
        <Layout>
            <HeadContent
                title="Mitgliedersuche der DGK"
                subtitle="Über unsere Mitgliedersuche finden Sie schnell die gesuchte Person – über den Namen oder die Postleitzahl. Angezeigt werden ausschließlich Mitglieder, die einer Veröffentlichung ihrer Daten zugestimmt haben."
                isInline
            />
            <MemberSearch setResults={setResults} />
            <RenderResults results={results} />
        </Layout>
    );
};

export default Mitgliedersuche;
