export type Page = {
    content: any;
};

export type KoloproktologieUser = {
    objectId: string;
    label: string;
    type: "dgk" | "bcd" | "dgk/bcd";
    username: string;
    first_name: string;
    last_name: string;
    email: string | null;
    title: string;
    salutation: string;
    password?: string;
    location?: string;
    data: {
        dgk: {
            address: string;
            title: string;
            name: string;
            postal_code: string;
            city: string;
            country: string;
        };
        bcd: {
            fachrichtung: string;
            klinikposition: string;
            belegklinik: string;
            tel: string;
            fax: string;
            email: string;
            country?: string;
        };
    };
    settings: {
        bcd: {
            publish_specialist: boolean;
        };
        dgk: {
            accept_search: boolean;
        };
        newsletter: boolean;
        newsletter_email?: "existing" | "other";
        newsletter_email_address?: string;
        newsletter_optin_date: string;
        newsletter_optout_date: string | null;
    };
    emails: {
        email: string;
        lists: string[];
        settings: {
            [key: string]: {
                optIn: string | null;
                optOut: string | null;
            };
        };
    }[];
};
