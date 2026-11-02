import { createFileRoute } from "@tanstack/react-router";
import { Mitgliederbereich } from "@content";
import { ClientOnly } from "@ui";

export const Route = createFileRoute("/app/mitgliederbereich")({
    component: MitgliederbereichPage
});

function MitgliederbereichPage() {
    return (
        <ClientOnly>
            <Mitgliederbereich />
        </ClientOnly>
    );
}
