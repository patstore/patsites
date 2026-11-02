import React, { useCallback, useMemo, useState } from "react";
import {
    headerBackground,
    informationContainer,
    paginationWrapper
} from "./styles";
import site_states from "./constants/site_states";
import { ContentContainer, FlexBox, SwitchButton } from "@ui";
import { useQuery } from "@apollo/client/react";
import { DownloadClass } from "@data";
import { generateQuery, sanitizeGraphQlNode } from "@provider";
import { env } from "../../../../env";
import ReactPaginateImport from "react-paginate";
import type { ComponentType } from "react";
import Protocol from "./components/Protocol";
import settings from "@settings";
import { EmailClass, MembershipItem, NewsItem } from "./types";
import News from "./components/News";
import { cloneDeep } from "lodash-es";

const itemsPerPage = 12;

const resolveDefaultExport = (mod: unknown): ComponentType<any> => {
    if (typeof mod === "function") {
        return mod as ComponentType<any>;
    }
    if (mod && typeof mod === "object" && "default" in mod) {
        return resolveDefaultExport((mod as { default: unknown }).default);
    }
    throw new Error("Could not resolve react-paginate component");
};

const ReactPaginate = resolveDefaultExport(ReactPaginateImport);

const Mitgliederbereich: React.FC = () => {
    const [siteState, setSiteState] = useState(site_states[0]);
    const [itemOffset, setItemOffset] = useState(0);

    const { data: downloads } = useQuery(
        generateQuery({
            type: "find",
            objectName: "Download",
            queryName: "downloads",
            fields: [
                "objectId",
                "title",
                "label",
                "file {name url}",
                "categories",
                "date"
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
                    categories: { in: ["sI5e1zJLtP", "7MApQkLhNl"] }
                }
            }
        }
    );

    const { data: news } = useQuery(
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
                                equalTo: env.patstoreProjectId
                            }
                        }
                    }
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
                                equalTo: "yWQiSY88AY"
                            }
                        }
                    },
                    state: {
                        equalTo: "sent"
                    },
                    type: {
                        equalTo: "template"
                    }
                }
            }
        }
    );

    const endOffset = itemOffset + itemsPerPage;

    const items = useMemo(() => {
        const itemArray: MembershipItem[] | NewsItem[] = [];
        const allDownloads =
            downloads?.downloads.edges.map((edge: { node: DownloadClass }) =>
                sanitizeGraphQlNode(edge.node)
            ) || [];
        const allNews =
            news?.entries.edges.map((edge: { node: NewsItem }) =>
                sanitizeGraphQlNode(edge.node)
            ) || [];
        const allEmails =
            emailData?.emails.edges.map((edge: { node: EmailClass }) => {
                return {
                    ...sanitizeGraphQlNode(edge.node),
                    date: edge.node.createdAt,
                    categories: ["rundmail"]
                };
            }) || [];

        const allItems = [...allDownloads, ...allNews, ...allEmails].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        allItems.forEach((item) => {
            const itemCopy = cloneDeep(item);
            if (itemCopy.categories?.includes("rundmail")) {
                itemCopy.categories = ["HCVFonw4Ye"];
            }
            if (siteState.value === "all") {
                itemArray.push(item);
            } else if (itemCopy.categories?.includes(siteState.value)) {
                itemArray.push(item);
            }
        });

        const currentItems = itemArray.slice(itemOffset, endOffset) || [];
        const pageCount = Math.ceil(itemArray.length / itemsPerPage);

        return {
            items: currentItems,
            pageCount
        };
    }, [siteState, downloads, itemOffset, endOffset, news, emailData]);

    const handlePageClick = useCallback(
        (event: { selected: number }) => {
            if (event) {
                const newOffset = event.selected * 12;
                setItemOffset(newOffset);
            }
        },
        [items.items, downloads]
    );

    return (
        <ContentContainer>
            <div css={informationContainer}>
                <div>
                    <h1>Mitgliederbereich</h1>
                    <p>
                        Hier haben Sie Zugriff auf alle Informationen, die wir
                        im Mitgliederbereich bereitgestellt haben.
                    </p>
                    <FlexBox
                        direction="row"
                        justify="space-between"
                        align="center"
                        hasFullWidth
                        gap={settings.sizes.medium}
                        styles={headerBackground}
                        wrap
                    >
                        <div>
                            {site_states.map((st) => {
                                return (
                                    <SwitchButton
                                        text={st.label}
                                        key={st.value}
                                        initialState={st}
                                        state={siteState}
                                        onClick={() => setSiteState(st)}
                                    />
                                );
                            })}
                        </div>
                        <div css={paginationWrapper}>
                            <ReactPaginate
                                breakLabel="…"
                                nextLabel="›"
                                previousLabel="‹"
                                previousAriaLabel="Vorherige Seite"
                                nextAriaLabel="Nächste Seite"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={3}
                                marginPagesDisplayed={1}
                                pageCount={items.pageCount}
                                previousClassName="previous"
                                nextClassName="next"
                                breakClassName="break"
                                activeClassName="active"
                                disabledClassName="disabled"
                                forcePage={itemOffset / itemsPerPage}
                            />
                        </div>
                    </FlexBox>
                </div>
                <FlexBox
                    direction="row"
                    justify="space-between"
                    align="stretch"
                    wrap
                    hasFullWidth
                    gap={settings.sizes.medium}
                >
                    {items.items.map((item) => {
                        if (item.categories?.includes("sI5e1zJLtP")) {
                            return (
                                <Protocol
                                    label={"Protokoll"}
                                    key={item.objectId}
                                    protocol={item}
                                />
                            );
                        }
                        if (item.categories?.includes("7MApQkLhNl")) {
                            return (
                                <Protocol
                                    label="Stellungnahme"
                                    key={item.objectId}
                                    protocol={item}
                                />
                            );
                        }
                        if (item.categories?.includes("Ae6bSBcZrH")) {
                            return (
                                <News
                                    label="News"
                                    key={item.objectId}
                                    item={item as NewsItem}
                                />
                            );
                        }
                        if (item.categories?.includes("HCVFonw4Ye")) {
                            return (
                                <News
                                    label="Rundmail"
                                    key={item.objectId}
                                    item={item as NewsItem}
                                />
                            );
                        }
                        if (item.categories?.includes("rundmail")) {
                            return (
                                <News
                                    label="Rundmail"
                                    key={item.objectId}
                                    item={item as NewsItem}
                                    type="email"
                                />
                            );
                        }
                        if (item.categories?.includes("9bPb7sUwYV")) {
                            return (
                                <News
                                    label="Infobrief"
                                    key={item.objectId}
                                    item={item as NewsItem}
                                />
                            );
                        }
                    })}
                </FlexBox>
            </div>
        </ContentContainer>
    );
};

export default Mitgliederbereich;
