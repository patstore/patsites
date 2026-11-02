import { set } from "lodash-es";

const getEmailArray = (
    status: "bcd" | "dgk" | "dgk/bcd",
    email?: string,
    newsletterEmail?: string
) => {
    const emailArray: {
        email: string;
        lists: string[];
        settings: { [key: string]: { optIn: string; optOut: string } };
    }[] = [];
    if (status === "bcd") {
        if (email) {
            emailArray.push({
                email: email,
                lists: ["7jRgwBkXZv"],
                settings: {
                    "7jRgwBkXZv": {
                        optIn: new Date().toISOString(),
                        optOut: ""
                    }
                }
            });
        }
        if (newsletterEmail) {
            const equalEmail = emailArray.findIndex(
                (item) => item.email === newsletterEmail
            );
            if (equalEmail === -1) {
                emailArray.push({
                    email: newsletterEmail,
                    lists: ["FaCXUlANoY"],
                    settings: {
                        FaCXUlANoY: {
                            optIn: new Date().toISOString(),
                            optOut: ""
                        }
                    }
                });
            } else {
set(emailArray, `[${equalEmail}].lists`, [
                    "7jRgwBkXZv",
                    "FaCXUlANoY"
                ]);
set(
                    emailArray,
                    `[${equalEmail}].settings.7jRgwBkXZv.optIn`,
                    new Date().toISOString()
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.7jRgwBkXZv.optOut`,
                    ""
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.FaCXUlANoY.optIn`,
                    new Date().toISOString()
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.FaCXUlANoY.optOut`,
                    ""
                );
            }
        }
    } else if (status === "dgk") {
        if (email) {
            emailArray.push({
                email: email,
                lists: ["3eRgIi9Jkh"],
                settings: {
                    "3eRgIi9Jkh": {
                        optIn: new Date().toISOString(),
                        optOut: ""
                    }
                }
            });
        }
        if (newsletterEmail) {
            const equalEmail = emailArray.findIndex(
                (item) => item.email === newsletterEmail
            );
            if (equalEmail === -1) {
                emailArray.push({
                    email: newsletterEmail,
                    lists: ["wHQrErtMVn"],
                    settings: {
                        wHQrErtMVn: {
                            optIn: new Date().toISOString(),
                            optOut: ""
                        }
                    }
                });
            } else {
set(emailArray, `[${equalEmail}].lists`, [
                    "3eRgIi9Jkh",
                    "wHQrErtMVn"
                ]);
set(
                    emailArray,
                    `[${equalEmail}].settings.3eRgIi9Jkh.optIn`,
                    new Date().toISOString()
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.3eRgIi9Jkh.optOut`,
                    ""
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.wHQrErtMVn.optIn`,
                    new Date().toISOString()
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.wHQrErtMVn.optOut`,
                    ""
                );
            }
        }
    } else if (status === "dgk/bcd") {
        if (email) {
            emailArray.push({
                email: email,
                lists: ["7jRgwBkXZv", "3eRgIi9Jkh"],
                settings: {
                    "7jRgwBkXZv": {
                        optIn: new Date().toISOString(),
                        optOut: ""
                    },
                    "3eRgIi9Jkh": {
                        optIn: new Date().toISOString(),
                        optOut: ""
                    }
                }
            });
        }
        if (newsletterEmail) {
            const equalEmail = emailArray.findIndex(
                (item) => item.email === newsletterEmail
            );
            if (equalEmail === -1) {
                emailArray.push({
                    email: newsletterEmail,
                    lists: ["FaCXUlANoY", "wHQrErtMVn"],
                    settings: {
                        FaCXUlANoY: {
                            optIn: new Date().toISOString(),
                            optOut: ""
                        },
                        wHQrErtMVn: {
                            optIn: new Date().toISOString(),
                            optOut: ""
                        }
                    }
                });
            } else if (equalEmail !== undefined) {
set(emailArray, `[${equalEmail}].lists`, [
                    "7jRgwBkXZv",
                    "3eRgIi9Jkh",
                    "FaCXUlANoY",
                    "wHQrErtMVn"
                ]);
set(
                    emailArray,
                    `[${equalEmail}].settings.7jRgwBkXZv.optIn`,
                    new Date().toISOString()
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.7jRgwBkXZv.optOut`,
                    ""
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.3eRgIi9Jkh.optIn`,
                    new Date().toISOString()
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.3eRgIi9Jkh.optOut`,
                    ""
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.FaCXUlANoY.optIn`,
                    new Date().toISOString()
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.FaCXUlANoY.optOut`,
                    ""
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.wHQrErtMVn.optIn`,
                    new Date().toISOString()
                );
set(
                    emailArray,
                    `[${equalEmail}].settings.wHQrErtMVn.optOut`,
                    ""
                );
            }
        }
    }
    return emailArray;
};

export default getEmailArray;
