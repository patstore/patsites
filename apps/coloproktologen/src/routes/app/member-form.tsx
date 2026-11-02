import { createFileRoute, Navigate } from "@tanstack/react-router";
import { MemberForm } from "../../content/App/content/MemberForm";
import { useSiteContext } from "@provider";

const MEMBER_FORM_ROLE = "tEsx6N2IUm";

export const Route = createFileRoute("/app/member-form")({
    component: MemberFormPage
});

function MemberFormPage() {
    const { loading, user } = useSiteContext();
    const hasAccess = Boolean(
        user && (user.roles.includes(MEMBER_FORM_ROLE) || user.is_superuser)
    );

    if (!loading && !hasAccess) {
        return <Navigate to="/app/benutzerkonto" />;
    }

    return <MemberForm />;
}
