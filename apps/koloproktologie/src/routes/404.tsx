import { createFileRoute, Link } from "@tanstack/react-router";
import { Layout } from "@components";
import { HeadContent } from "@ui";

export const Route = createFileRoute("/404")({
    component: NotFoundPage
});

function NotFoundPage() {
    return (
        <Layout>
            <HeadContent
                title="Seite nicht gefunden"
                subtitle="Die eingegebene URL wurde nicht gefunden."
                content={<Link to="/">Zurück zur Startseite</Link>}
            />
        </Layout>
    );
}
