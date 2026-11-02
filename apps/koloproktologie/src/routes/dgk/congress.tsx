import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dgk/congress")({
    component: CongressStub
});

function CongressStub() {
    return <div>congress_2025</div>;
}
