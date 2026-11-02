import { Layout } from "@components";
import { Button, ContentContainer, FlexBox, HeadContent, Dialog } from "@ui";
import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import { contentBox } from "@styles";
import settings from "@settings";

const Login: React.FC = () => {
    const [open, setOpen] = useState(true);
    return (
        <Layout showKongress={false}>
            <HeadContent
                title="Mitglieder-Login"
                description="Hier können Sie sich auf der Seite des BCD anmelden."
                isInline
            />

            <ContentContainer noPaddingTop>
                <FlexBox direction="row"
                    align="stretch"
                    justify="center"
                    changeToColumn>
                    <div css={{ flex: "1 1 50%" }}>
                        <LoginForm title="Login" text="Bitte geben Sie Ihre Login-Daten ein." />
                    </div>
                    <div css={[contentBox(), { flex: "1 1 50%" }]}>
                        <h3>Noch kein Login?</h3>
                        <p>
                            Wenn Sie Mitglied des BCD sind, aber noch keinen Login haben, oder Sie bei Ihrem bisherigen Account keine E-Mail Adresse hinterlegt hatten, dann wenden Sie sich bitte an unseren Support.

                        </p>
                        <Button text="Kontakt Homepage" externalLink="mailto:homepage@coloproktologen.de" />
                    </div>
                </FlexBox>
            </ContentContainer>
            {/* <Dialog 
                open={open}
                onClose={() => setOpen(false)}
                maxWidth="600px"
                backgroundColor={settings.colors.lightgrey}
                title="Information zum Login"
            >
                <p>
                    Am 1. Dezember 2025 ist die Seite mit den Mitgliederdaten umgezogen. Leider konnten die Passwörter der Accounts nicht in das neue BCD-System übertragen werden.
                </p>
                <ul>
                    <li>    
                        Sie haben bereits einen Account auf der <b>Webseite der DGK</b> (Deutsche Gesellschaft der Koloproktologie) ? <br />
                        Dann können Sie sich mit Ihren bekannten Zugangsdaten anmelden.

                    </li>
                    <li>
                        Sie haben bereits einen Account auf der <b>Webseite des BCD</b> ? <br />
                        Dann müssen Sie für diese Seite zuerst ein neues Passwort erstellen, da Ihr bisheriges Passwort nicht verwendet werden kann. <br />
                        Bitte klicken Sie dazu auf „Passwort vergessen“ und geben Sie Ihre E-Mail-Adresse ein.
                    </li>
                </ul>
                <p>
                    In anderen Fällen oder bei Problemen schreiben Sie bitte eine E-Mail an <a href="mailto:homepage@coloproktologen.de">homepage@coloproktologen.de</a>
                </p>
            </Dialog> */}
        </Layout>
    );
};

export default Login;
