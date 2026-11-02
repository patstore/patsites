import React from "react";
import { Routing } from "./content";
import { Layout } from "@components";
import { useSiteContext } from "@provider";

const App: React.FC = () => {
    const { loading, user } = useSiteContext();

    return (
        <Layout
            showKongress={false}
            isUserProfile
        >
            {loading ? <div>Loading...</div> : <Routing id={user?.objectId} />}
        </Layout>
    );
};

export default App;
