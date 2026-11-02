/* eslint-disable no-unused-vars */
import { KoloproktologieUser } from "@types";
import { cloneDeep, set } from "lodash-es";

export const NEWSLETTER_LIST_ID_DGK = "wHQrErtMVn";

type EmailListHandler = (arg: {
    emails?: KoloproktologieUser["emails"];
    isOptedIn: boolean;
    email: string;
}) => KoloproktologieUser["emails"];

type CreateInitialValues = (arg: {
    emails?: KoloproktologieUser["emails"];
}) => {
    newsletter_optin: "1" | "0";
    newsletter_email: string;
};

export const emailListHandler: EmailListHandler = ({
    emails,
    isOptedIn,
    email
}) => {
    const emailList = cloneDeep(emails) || [];

    if (typeof isOptedIn !== "boolean") {
        return emailList;
    }

    if (isOptedIn) {
        const hasListInSettings = emailList.findIndex((item) =>
            item.lists.includes(NEWSLETTER_LIST_ID_DGK)
        );
        if (hasListInSettings !== -1) {
            const hasEmailInSettings = emailList.findIndex(
                (item) => item.email === email
            );
            if (hasEmailInSettings !== -1) {
set(
                    emailList,
                    `[${hasEmailInSettings}].settings.${NEWSLETTER_LIST_ID_DGK}.optIn`,
                    new Date().toISOString()
                );
set(
                    emailList,
                    `[${hasEmailInSettings}].settings.${NEWSLETTER_LIST_ID_DGK}.optOut`,
                    null
                );
            } else {
                const listWithoutDGK = emailList[
                    hasListInSettings
                ].lists.filter((item) => item !== NEWSLETTER_LIST_ID_DGK);
set(emailList, `[${hasListInSettings}].lists`, [
                    ...listWithoutDGK
                ]);
                emailList.push({
                    email: email,
                    lists: [NEWSLETTER_LIST_ID_DGK],
                    settings: {
                        [NEWSLETTER_LIST_ID_DGK]: {
                            optIn: new Date().toISOString(),
                            optOut: null
                        }
                    }
                });
            }
        } else {
            const hasEmailInSettings = emailList.findIndex(
                (item) => item.email === email
            );
            if (hasEmailInSettings !== -1) {
set(emailList, `[${hasEmailInSettings}].lists`, [
                    ...emailList[hasEmailInSettings].lists,
                    NEWSLETTER_LIST_ID_DGK
                ]);
set(
                    emailList,
                    `[${hasEmailInSettings}].settings.${NEWSLETTER_LIST_ID_DGK}.optIn`,
                    new Date().toISOString()
                );
set(
                    emailList,
                    `[${hasEmailInSettings}].settings.${NEWSLETTER_LIST_ID_DGK}.optOut`,
                    null
                );
            } else {
                emailList.push({
                    email: email,
                    lists: [NEWSLETTER_LIST_ID_DGK],
                    settings: {
                        [NEWSLETTER_LIST_ID_DGK]: {
                            optIn: new Date().toISOString(),
                            optOut: null
                        }
                    }
                });
            }
        }
    } else {
        const hasListInSettings = emailList.findIndex((item) =>
            item.lists.includes(NEWSLETTER_LIST_ID_DGK)
        );
        if (hasListInSettings !== -1) {
            const hasEmailInSettings = emailList.findIndex(
                (item) => item.email === email
            );
            if (hasEmailInSettings !== -1) {
set(
                    emailList,
                    `[${hasEmailInSettings}].settings.${NEWSLETTER_LIST_ID_DGK}.optOut`,
                    new Date().toISOString()
                );
                const listWithoutDGK = emailList[
                    hasEmailInSettings
                ].lists.filter((item) => item !== NEWSLETTER_LIST_ID_DGK);
set(emailList, `[${hasEmailInSettings}].lists`, [
                    ...listWithoutDGK
                ]);
            } else {
                const listWithoutDGK = emailList[
                    hasListInSettings
                ].lists.filter((item) => item !== NEWSLETTER_LIST_ID_DGK);
set(emailList, `[${hasListInSettings}].lists`, [
                    ...listWithoutDGK
                ]);
set(
                    emailList,
                    `[${hasListInSettings}].settings.${NEWSLETTER_LIST_ID_DGK}.optOut`,
                    new Date().toISOString()
                );
            }
        }
    }

    return emailList;
};

export const createInitialValues: CreateInitialValues = ({ emails }) => {
    const emailList = cloneDeep(emails) || [];
    const hasListInSettings = emailList.findIndex((item) =>
        item.lists.includes(NEWSLETTER_LIST_ID_DGK)
    );
    if (hasListInSettings !== -1) {
        return {
            newsletter_optin: "1",
            newsletter_email: emailList[hasListInSettings].email
        };
    } else {
        return {
            newsletter_optin: "0",
            newsletter_email: ""
        };
    }
};
