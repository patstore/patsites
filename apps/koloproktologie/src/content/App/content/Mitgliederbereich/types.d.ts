import { DownloadClass } from "@data";
import { ContentBlock } from "./functions/transformToWeb";

export type DownloadProtocol = {
    renderType: "protocol";
} & DownloadClass;

export type MembershipItem = {
    objectId: string;
    name: string;
    label: string;
    file: { name: string; url: string };
    categories: string[];
    date: string;
};

export type EmailClass = {
    objectId: string;
    title: string;
    from: string;
    to: string;
    subject: string;
    body: string;
    attachments: string[];
    recipients: object[];
    content: ContentBlock[];
    createdAt: string;
    updatedAt: string;
    state?: "draft" | "sent";
    date?: string;
    settings: {
        unsubscribe_link: boolean;
        unsubscribe_url?: string;
        email_subject?: string;
        recipient_list?: string;
    };
};

export type NewsItem = {
    objectId: string;
    name: string;
    label: string;
    date: string;
    file: { name: string; url: string };
    categories: string[];
    text: string;
    documents: string[];
};
