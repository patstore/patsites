import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/projekte")({
    component: ProjekteLayout
});

function ProjekteLayout() {
    return <Outlet />;
}
