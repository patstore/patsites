import { createFileRoute } from "@tanstack/react-router";
import { Zertifizierung } from "@content";

export const Route = createFileRoute("/aktivitaeten/zertifizierung")({
    component: Zertifizierung
});
