import { Layout } from "@components";
import { ContentContainer, HeadContent } from "@ui";
import React from "react";
import LoginForm from "./components/LoginForm";

const Login: React.FC = () => {
    return (
        <Layout showKongress={false}>
            <HeadContent
                title="Mitglieder-Login"
                subtitle="Hier können Sie sich mit Ihrem DGK-Login anmelden."
                isInline
            />

            <ContentContainer>
                <LoginForm
                    title="Login"
                    text="Bitte geben Sie Ihre Login-Daten ein."
                />
            </ContentContainer>
        </Layout>
    );
};

export default Login;
