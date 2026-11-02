import { createFileRoute } from "@tanstack/react-router";
import { Auszeichnungen } from "@content";

export const Route = createFileRoute("/aktivitaeten/auszeichnungen")({
    component: Auszeichnungen
});
