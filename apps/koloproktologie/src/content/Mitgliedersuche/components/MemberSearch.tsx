import { apiRequest } from "@provider";
import settings from "@settings";
import { highlightContent } from "@styles";
import { Button, ContentContainer, Divider } from "@ui";
import React, { useCallback } from "react";
import { MemberSearchProps } from "../types";

const MemberSearch: React.FC<MemberSearchProps> = ({ setResults }) => {
    const [search, setSearch] = React.useState<{
        last_name: string;
        zip: string;
    }>({
        last_name: "",
        zip: ""
    });
    const [loading, setLoading] = React.useState(false);

    const searchHandler = useCallback(async () => {
        setLoading(true);
        const response = await apiRequest<{ result: Parameters<typeof setResults>[0] }>(
            "/api/members/search",
            {
                lastName: search.last_name,
                zip: search.zip
            }
        );
        setResults(response.result);

        setLoading(false);
    }, [search]);

    return (
        <ContentContainer>
            <div
                css={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between"
                }}
            >
                <div css={{ flex: "1 1 50%" }}>
                    <div>
                        <label htmlFor="last_name">Nachname</label>
                        <input
                            key="last_name"
                            id="last_name"
                            type="text"
                            placeholder="Nachname"
                            onChange={(e) => {
                                setSearch({
                                    ...search,
                                    last_name: e.target.value
                                });
                            }}
                        />
                    </div>
                    <div>
                        <label htmlFor="zip">PLZ</label>
                        <input
                            id="zip"
                            type="text"
                            placeholder="PLZ"
                            onChange={(e) => {
                                setSearch({
                                    ...search,
                                    zip: e.target.value
                                });
                            }}
                        />
                    </div>
                    <Divider />
                    <Button
                        text={loading ? "Suche..." : "Mitglieder suchen"}
                        onClick={searchHandler}
                        disabled={loading}
                    />
                </div>
                <div
                    css={[
                        highlightContent({
                            background: settings.colors.light
                        }),
                        { flex: "1 1 50%" }
                    ]}
                >
                    <h3>Mitglieder suchen</h3>
                    <p>
                        Sie können sich unsere Mitglieder nach Postleitzahlen
                        oder deren Nachnamen sortiert anzeigen lassen.
                    </p>
                </div>
            </div>
        </ContentContainer>
    );
};

export default MemberSearch;
