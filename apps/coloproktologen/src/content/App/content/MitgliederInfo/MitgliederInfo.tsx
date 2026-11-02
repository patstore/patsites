import { env } from "@env";
import { useQuery } from "@apollo/client/react";
import { generateQuery, sanitizeGraphQlNode } from "@provider";
import { memberContainer } from "@styles";
import { ContentContainer } from "@ui";
import React, { useMemo } from "react";
import MitgliederInfoNews from "./components/MitgliederInfoNews";
import { transformToWeb } from "../Rundmails/content/ContentPreview/functions";
import settings from "@settings";

const MitgliederInfo: React.FC = () => {
    const { data } = useQuery(
        generateQuery({
            type: "find",
            objectName: "Entry",
            queryName: "entries",
            fields: [
                "objectId",
                "title",
                "description",
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
                                equalTo: env.patstoreProjectId
                            }
                        }
                    },
                    categories: { in: "EJNNfwqU9X" }
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
                "content {...on Element {value}}",
                "date",
                "attachments {...on Element {value}}",
                "recipients {...on Element {value}}"
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
                    },
                    active: {
                        equalTo: true
                    }
                }
            }
        }
    );

    const news = useMemo(() => {
        const newsData = data?.entries?.edges.map((edge: any) => sanitizeGraphQlNode(edge.node)) || [];
        const emails = emailData?.emails?.edges.length > 0 ? emailData?.emails?.edges.map((edge: any) => {
            const email = sanitizeGraphQlNode(edge.node);

            return {
                title: email.title,
                description: email.description,
                date: edge.node.createdAt,
                isEmail: true,
                content: transformToWeb((email.content as any[]) || [])
            }
        }) : [];
        
        const news = [...newsData, ...emails];
        return news.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime()) || [];
    }, [data, emailData]);

    return (
        <ContentContainer>
            <div css={memberContainer}>
                <div>
                    <h1>Mitgliederinfo</h1>
                    <p>Hier finden Sie aktuelle Informationen sowie Informationen aus den vergangenen Jahren.</p>
                </div>
                <div css={{borderTop: `0.6px solid ${settings.colors.grey}`}}>
                    {news.map((newsItem: any) => (
                        <MitgliederInfoNews
                            key={newsItem.objectId}
                            title={newsItem.title}
                            description={newsItem.description}
                            text={newsItem.text}
                            date={newsItem.date}
                            categories={newsItem.categories}
                            documents={newsItem.documents}
                            isEmail={newsItem.isEmail}
                            content={newsItem.content}
                        />
                    ))}
                </div>
            </div>
        </ContentContainer>
    );
};

export default MitgliederInfo;
