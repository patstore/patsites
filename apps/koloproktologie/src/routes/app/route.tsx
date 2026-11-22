import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
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

	// Redirect with a component instead of throwing during render, which
	// surfaces as an uncaught error in the route's error boundary.
	if (!loading && !user) {
		return <Navigate to="/login" replace />;
	}

	return (
		<Layout showKongress={false} isUserProfile>
			{loading ? <div>Loading...</div> : <Outlet />}
		</Layout>
	);
}
