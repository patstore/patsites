import { KoloproktologieUser } from "@types";

export type PasswordResponse = {
    message: string;
    user?: KoloproktologieUser;
    success: boolean;
};
