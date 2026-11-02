import { Layout } from "@components";
import { Divider, HeadContent } from "@ui";
import React from "react";
import { Manual, Membership } from "./components";
import { Coloproctology } from "../Bcd/components";

const Mitgliedschaft: React.FC = () => {
    return (
        <Layout>
            <HeadContent
                title="Mitglied werden"
                subtitle="und zu den Spezialisten gehören!"
                description="Unsere Arbeit ist unsere Leidenschaft und ein positiver Antrieb für jeden neuen Tag."
                isInline
                id="mitgliedschaft"
            />
            <Membership />
            <Manual />
            <Coloproctology />
        </Layout>
    );
};

export default Mitgliedschaft;
