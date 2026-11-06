import { useQuery } from "@apollo/client/react";
import { generateQuery, sanitizeGraphQlNode } from "@provider";
import { memberContainer } from "@styles";
import { ContentContainer, Divider, FlexBox } from "@ui";
import React, { useMemo } from "react";
import Rundmail from "./components/Rundmail";
import { PatstoreEntry } from "@types";
import {ContentPreview} from "./content/ContentPreview";
import { EmailClass } from "./content/RenderEmail/types";
import { Divide } from "lucide-react";
import settings from "@settings";

type NewsItem = PatstoreEntry & {
    date: string;
    documents: string[];
}

const Rundmails: React.FC = () => {
    const { data: newsData } = useQuery(
        generateQuery({
            type: "find",
            objectName: "Entry",
            queryName: "entries",
            fields: [
                "objectId",
                "title",
                "label",
                "image",
                "text",
                "date",
                "categories",
                "documents"
            ]
        }),
        {
            variables: {
                params: {
                    project: {
                        have: {
                            id: {
                                equalTo:"JRxDkaxCoI"
                            }
                        }
                    },
                    categories: { in: "HCVFonw4Ye" },
                }
            }
        }
    );

    const { data: emailData } = useQuery(
        generateQuery({
            type: "find",
            objectName: "Email",
            queryName: "emails",
            fields: [
                "objectId",
                "createdAt",
                "title",
                "description",
                "settings",
                "content",
                "attachments {...on Element {value}}",
                "recipients {...on Element {value}}",
               
            ]
        }),
        {
            variables: {
                params: {
                    module: {
                        have: {
                            id: {
                                equalTo:"3YikWD07CJ"
                            }
                        }
                    },
                    type: {
                        equalTo: "template"
                    },
                    state: {
                        equalTo: "sent"
                    }
                }
            }
        }
    );

    
    const emails = useMemo(() => {
        const allEmails = emailData?.emails?.edges.map((edge: any) => sanitizeGraphQlNode(edge.node)) || [];
        const filteredEmails = allEmails.filter((email: any) => email.title.includes("Rundmail"));
        return filteredEmails.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) || [];
    }, [emailData]);

    const news = useMemo(() => {
        const nws: NewsItem[] = newsData?.entries?.edges.map((edge: any) => sanitizeGraphQlNode(edge.node)) || [];
        return nws.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
    }, [newsData]);

    return (
        <ContentContainer>
            <div css={[memberContainer, {gap: "24px"}]}>
                <div>
                    <h1>Rundmails</h1>
                    <p>
                        Hier finden Sie alle Rundmails des BCD der Jahre{" "}
                        {new Date().getFullYear() - 1} und{" "}
                        {new Date().getFullYear().toString()}.
                    </p>
                </div>
                <div>
                    <h2 css={{margin: "0 !important"}}>
                        2026
                    </h2>
                </div>
                <FlexBox direction="column" align="stretch" gap={settings.sizes.medium} styles={{borderTop: `0.6px solid ${settings.colors.grey}`}}>
                    {emails.map((email: EmailClass) => {
                        const objectIds = (email.attachments || []).map((a: any) =>
                            typeof a === "string" ? a : a?.value
                        ).filter(Boolean);
                        return email.title && (
                            <ContentPreview
                                key={email.objectId}
                                title={email.title}
                                date={email.createdAt}
                                content={email.content}
                                attachments={objectIds}
                            />
                        );
                    })}
                </FlexBox>
                <Divider />
                <div>
                    <h2 css={{margin: "0 !important"}}>
                        2025
                    </h2>
                </div>
                <div css={{borderTop: `0.6px solid ${settings.colors.grey}`}}>
                    {news.map((newsItem: NewsItem) => (
                        newsItem.title &&  ( 
                            <Rundmail
                                key={newsItem.objectId}
                                title={newsItem.title}
                                description={newsItem.description || ""}
                                text={newsItem.text || ""}
                                date={newsItem.date}
                                categories={newsItem.categories || []}
                                documents={newsItem.documents || []}
                            />
                        )
                    ))}
                </div>
            </div>
        </ContentContainer>
    );
};

export default Rundmails;
