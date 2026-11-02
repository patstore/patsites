import Cookies from "js-cookie";
import axiosapi from "./axios";
import axiosclient from "./axios";
import { useSiteContext } from "../context";

const useDataHandler = () => {
    const context = useSiteContext;

    const updateData = async ({ className, objectId, query, updateObject }) => {
        const data = [];
        await axiosapi().put(
            `classes/${className}/${objectId}`,
            query || updateObject
        );
        return data;
    };

    const deleteData = async ({ className, objectId }) => {
        await axiosclient().delete(`classes/${className}/${objectId}`);
    };

    const createData = async ({ className, updateObject }) => {
        const data = await axiosapi().post(
            `classes/${className}`,
            updateObject
        );

        return data;
    };

    const getData = async ({ className, query }) => {
        let data = [];
        if (query) {
            data = await Promise.resolve(
                axiosapi().get(`classes/${className}?where={${query}}`)
            ).then((response) => {
                data = response.results;
            });
        }
        if (!query) {
            await Promise.resolve(axiosapi().get(`classes/${className}`)).then(
                (response) => {
                    data = response.results;
                }
            );
        }
        return data;
    };

    const createUser = async ({ updateObject }) => {
        const results = await axiosapi().post("users/", updateObject);
        Cookies.set("sd_session", results.data.sessionToken, { expires: 90 });
        context.sessionHandler(results.data.sessionToken);

        return results;
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
