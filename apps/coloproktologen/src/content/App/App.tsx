import { Navigate, Outlet } from "@tanstack/react-router";
import { Layout } from "@components";
import { useSiteContext } from "@provider";

const App = () => {
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
};

export default App;
