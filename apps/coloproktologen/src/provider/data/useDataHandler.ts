import Cookies from "js-cookie";
import axiosapi from "./axios";
import axiosclient from "./axios";

const useDataHandler = () => {
  const updateData = async ({ className, objectId, updateObject }) => {
    const data = [];
    await axiosapi().put(`classes/${className}/${objectId}`, updateObject);
    return data;
  };

  const deleteData = async ({ className, objectId }) => {
    await axiosclient().delete(`classes/${className}/${objectId}`);
  };

  const createData = async ({
    className,
    updateObject,
  }: {
    className: string;
    updateObject?: any;
  }) => {
    const data = await axiosapi().post(`classes/${className}`, updateObject);

    return data;
  };

  const getData = async ({ className, query }) => {
    const path = query
      ? `classes/${className}?where={${query}}`
      : `classes/${className}`;
    const response = await axiosapi().get(path);
    return response.data?.results ?? [];
  };

  const createUser = async ({ updateObject }) => {
    const results = await axiosapi().post("users/", updateObject);
    Cookies.set("sd_session", results.data.sessionToken, { expires: 90 });
    return results;
  };

  return {
    updateData,
    createData,
    deleteData,
    getData,
    createUser,
  };
};

export default useDataHandler;
