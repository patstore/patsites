import { Dispatch, SetStateAction } from "react";
import { KoloproktologieUser } from "@types";

export type SiteContext = {
    siteTitle: string;
    siteDescription: string;
    applicationOpen: boolean;
    setApplicationOpen: Dispatch<SetStateAction<boolean>>;
    loading: boolean;
    user?: KoloproktologieUser;
    getUser: () => Promise<void>;
};

export type ModuleCategory = {
    id: string;
    moduleId: string;
    label: string;
    key: string;
    connected_class: string;
    position: number;
    is_multi: boolean;
};

export type ModuleSettings = {
    [key: string]: any;
    categories: {
        id: string;
        label: string;
        value: string;
        position: number;
    }[];
};

export type ModuleName =
    | "Webseite"
    | "Beiträge"
    | "News"
    | "Events"
    | "Kategorien"
    | "Personen"
    | "Bilder"
    | "Trainingsgruppe"
    | "Downloads"
    | "Formulare"
    | "Nutzer";

export type Module = {
    objectId: string;
    name: ModuleName;
    path: string;
    icon: string;
    fields: Field[];
    position: number;
    project: Project;
    connected_class: string;
    categories: ModuleCategory[];
    settings: ModuleSettings;
};

export type DataFields = {
    [key in ModuleName]: string[];
};

export type DataObject = {
    [key in ModuleName]?: any;
};

export type EmailModalProps = {
    emailPopup: boolean;
    setEmailPopup: Dispatch<SetStateAction<boolean>>;
    getUser: () => Promise<void>;
    userId: string;
};
