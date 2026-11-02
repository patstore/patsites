import { createFileRoute } from "@tanstack/react-router";
import { Password } from "@content";

export const Route = createFileRoute("/password/$key")({
    component: PasswordPage
});

function PasswordPage() {
    return <Password />;
}
