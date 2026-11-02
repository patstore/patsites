import { Link } from "@router";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "@tanstack/react-router";
import { Layout } from "@components";
import { ContentContainer, HeadContent } from "@ui";
import PasswordForm from "./components/PasswordForm";
import fetchUserData from "./functions/fetchUserData";
import { PasswordResponse } from "./types";

const Password: React.FC = () => {
    const params = useParams({ strict: false });
    const key = typeof params.key === "string" ? params.key : "";
    const { searchStr } = useLocation();
    const email = new URLSearchParams(searchStr).get("email");
    const [response, setResponse] = useState<PasswordResponse>();

    const getUserData = async () => {
        if (email && key) {
            const res: PasswordResponse = await fetchUserData({ email, key });
            setResponse(res);
        }
    };

    useEffect(() => {
        if (!response && email && key) {
            getUserData();
        }
    }, [email, key]);

    return (
        <Layout>
            <HeadContent
                title="Passwort zurücksetzen"
                isInline
            />
            <ContentContainer noPaddingTop>
                <div>
                    {email && response && response.user ? (
                        <PasswordForm
                            email={email}
                            passwordKey={key}
                            userId={response?.user?.objectId}
                        />
                    ) : (
                        <p>
                            {response?.message ||
                                "Ungültige angaben, bitte beantragen Sie einen neuen Link"}{" "}
                            <br /> <br />
                            <Link to="/login">Zurück zum Login</Link>
                        </p>
                    )}
                </div>
            </ContentContainer>
        </Layout>
    );
};

export default Password;
