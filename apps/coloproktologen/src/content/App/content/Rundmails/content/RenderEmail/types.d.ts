export type RenderEmailProps =  {
    email: EmailClass;
}

export type EmailClass =  {
    objectId: string;
    title: string;
    from: string;
    to: string;
    subject: string;
    body: string;
    attachments: string[];
    recipients: EmailRecipient[];
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
  