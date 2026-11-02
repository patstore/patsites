import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Layout } from "@components";
import { useSiteContext } from "@provider";

export const Route = createFileRoute("/app")({
    beforeLoad: ({ context }) => {
        // Auth is checked client-side because session is cookie-based
        return context;
    },
    component: AppLayout
});

function AppLayout() {
    const { loading, user } = useSiteContext();

    if (!loading && !user) {
        throw redirect({ to: "/login" });
    }

    return (
        <Layout showKongress={false} isUserProfile>
            {loading ? <div>Loading...</div> : <Outlet />}
        </Layout>
    );
}
