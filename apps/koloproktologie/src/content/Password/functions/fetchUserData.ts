import { axiosclient } from "@provider";
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
        const resp = await axiosclient().post(
            "functions/get_user_from_password_key",
            { email, key }
        );

        const userData = resp.data;

        response = userData.result;
    } catch (error) {
        response = {
            success: false,
            message: "Für diese E-Mail Adresse ist kein Account hinterlegt",
            user: undefined
        };
    }

    return response;
};

export default fetchUserData;
