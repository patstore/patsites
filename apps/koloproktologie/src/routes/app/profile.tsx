import { createFileRoute } from "@tanstack/react-router";
import { Profile } from "@content";

export const Route = createFileRoute("/app/profile")({
    component: ProfilePage
});

function ProfilePage() {
    return (
        <>
            <Profile />
        </>
    );
}
