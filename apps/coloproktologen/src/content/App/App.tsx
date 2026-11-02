import { Outlet, redirect } from "@tanstack/react-router";
import { Layout } from "@components";
import { useSiteContext } from "@provider";

const App = () => {
    const { loading, user } = useSiteContext();

    if (!loading && !user) {
        throw redirect({ to: "/login" });
    }

    return (
        <Layout showKongress={false} isUserProfile>
            {loading ? <div>Loading...</div> : <Outlet />}
        </Layout>
    );
};

export default App;
