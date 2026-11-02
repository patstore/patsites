import { Layout } from "@components";
import { Button, ContentContainer, FlexBox, HeadContent } from "@ui";
import React, { useEffect, useState } from "react";
import settings from "@settings";
import axios from "axios";
import { CheckCircle, XCircle } from "lucide-react";

const Optout: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [optedOut, setOptedOut] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [userData, setUserData] = useState<{
        first_name: string;
        last_name: string;
    } | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
    const [listId, setListId] = useState<string | null>(null);

    useEffect(() => {
        // Get URL parameters
        const params = new URLSearchParams(window.location.search);
        const userIdParam = params.get("userId");
        const listIdParam = params.get("listId");

        if (!userIdParam || !listIdParam) {
            setError("Ungültige Parameter. Bitte überprüfen Sie den Link.");
            setLoading(false);
            return;
        }

        setUserId(userIdParam);
        setListId(listIdParam);

        // Fetch user data
        axios
            .get(`/api/newsletter/user?userId=${userIdParam}`)
            .then((response) => {
                setUserData(response.data);
                setLoading(false);
            })
            .catch((err) => {
                // eslint-disable-next-line no-console
                console.error("Error fetching user data:", err);
                setError(
                    "Fehler beim Laden der Benutzerdaten. Bitte versuchen Sie es später erneut."
                );
                setLoading(false);
            });
    }, []);

    const handleOptout = async () => {
        if (!userId || !listId) {
            setError("Ungültige Parameter.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.post("/api/newsletter/optout", {
                userId,
                listId
            });

            if (response.data.success) {
                setOptedOut(true);
            } else {
                setError(
                    "Fehler beim Abmelden. Bitte versuchen Sie es erneut."
                );
            }
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("Error opting out:", err);
            setError(
                "Fehler beim Abmelden. Bitte versuchen Sie es später erneut."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout showKongress={false}>
            <HeadContent
                title="Newsletter Abmeldung"
                subtitle="Hier können Sie sich vom Newsletter abmelden."
                isInline
            />

            <ContentContainer largeBackground={settings.colors.light}>
                <FlexBox
                    direction="column"
                    align="center"
                    justify="center"
                    gap="24px"
                >
                    {loading && (
                        <div
                            css={{
                                padding: "48px",
                                textAlign: "center"
                            }}
                        >
                            <p>Laden...</p>
                        </div>
                    )}

                    {!loading && error && (
                        <div
                            css={{
                                padding: "48px",
                                textAlign: "center",
                                maxWidth: "600px"
                            }}
                        >
                            <FlexBox
                                direction="column"
                                align="center"
                                gap="24px"
                            >
                                <XCircle
                                    size={64}
                                    color={settings.colors.category_3}
                                />
                                <h3 css={{ color: settings.colors.dark }}>
                                    Fehler
                                </h3>
                                <p css={{ color: settings.colors.dark }}>
                                    {error}
                                </p>
                            </FlexBox>
                        </div>
                    )}

                    {!loading && !error && !optedOut && userData && (
                        <div
                            css={{
                                padding: "48px",
                                textAlign: "center",
                                maxWidth: "600px"
                            }}
                        >
                            <FlexBox
                                direction="column"
                                align="center"
                                gap="24px"
                            >
                                <h3 css={{ color: settings.colors.dark }}>
                                    Hallo {userData.first_name}{" "}
                                    {userData.last_name}
                                </h3>
                                <p css={{ color: settings.colors.dark }}>
                                    Möchten Sie sich wirklich von unserem
                                    Newsletter abmelden? Sie werden keine
                                    weiteren E-Mails von dieser Liste erhalten.
                                </p>
                                <Button
                                    text="Newsletter abmelden"
                                    background={settings.colors.category_3}
                                    color={settings.colors.white}
                                    onClick={handleOptout}
                                />
                            </FlexBox>
                        </div>
                    )}

                    {!loading && optedOut && (
                        <div
                            css={{
                                padding: "48px",
                                textAlign: "center",
                                maxWidth: "600px"
                            }}
                        >
                            <FlexBox
                                direction="column"
                                align="center"
                                gap="24px"
                            >
                                <CheckCircle
                                    size={64}
                                    color={settings.colors.secondary}
                                />
                                <h3 css={{ color: settings.colors.dark }}>
                                    Erfolgreich abgemeldet
                                </h3>
                                <p css={{ color: settings.colors.dark }}>
                                    Sie wurden erfolgreich von unserem
                                    Newsletter abgemeldet. Sie erhalten keine
                                    weiteren E-Mails von dieser Liste.
                                </p>
                            </FlexBox>
                        </div>
                    )}
                </FlexBox>
            </ContentContainer>
        </Layout>
    );
};

export default Optout;
