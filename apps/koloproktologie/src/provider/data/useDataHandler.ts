import { apiRequest } from "./api";

const useDataHandler = () => {
    const updateData = async () => {
        throw new Error("Änderungen laufen über eine eigene Server-Route.");
    };

    const deleteData = async () => {
        throw new Error("Löschen läuft über eine eigene Server-Route.");
    };

    const createData = async ({
        className,
        updateObject
    }: {
        className: string;
        updateObject?: { data?: unknown; reference_id?: string; type?: string };
    }) => {
        if (className !== "Item" || !updateObject?.reference_id) {
            throw new Error(`Keine Server-Route für ${className}`);
        }
        return apiRequest("/api/forms/submit", {
            data: updateObject.data,
            referenceId: updateObject.reference_id
        });
    };

    const getData = async () => {
        throw new Error("Abfragen laufen über eine eigene Server-Route.");
    };

    const createUser = async () => {
        throw new Error("Nutzer werden über eine eigene Server-Route angelegt.");
    };

    return {
        updateData,
        createData,
        deleteData,
        getData,
        createUser
    };
};

export default useDataHandler;
