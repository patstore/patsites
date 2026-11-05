import { apiRequest } from "@provider";
import { PasswordResponse } from "../types";

const fetchUserData = async ({
    email,
    key
}: {
    email: string;
    key: string;
}) => {
    let response: PasswordResponse = {
        success: false,
        message: "Invalid request",
        user: undefined
    };

    try {
        const resp = await apiRequest<{ result: PasswordResponse }>(
            "/api/password/user",
            { email, key }
        );
        response = resp.result;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error(error);
        }
        response = {
            success: false,
            message: "Für diese E-Mail Adresse ist kein Account hinterlegt",
            user: undefined
        };
    }

    return response;
};

export default fetchUserData;
