import { AxiosError } from "axios";

export const compileAxiosError = (error: AxiosError) => {
    if (!error) {
        return {
            success: false,
            message: "Unbekannter Fehler",
            type: "unknown-error"
        };
    }
    return {
        success: false,
        message: error.message,
        type: "network-error"
    };
};
