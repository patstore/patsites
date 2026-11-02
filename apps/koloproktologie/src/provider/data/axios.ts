import axios from "axios";
import Cookies from "js-cookie";
import { env } from "../../env";

const axiosclient = () => {
    const localToken = Cookies.get(env.sessionToken);
    const token = localToken || "";
    return axios.create({
        baseURL: env.patstoreApiUrl,
        headers: {
            "X-Parse-Application-Id": env.patstoreAppId,
            "X-Parse-REST-API-Key": env.patstoreRestKey,
            "X-Parse-Session-Token": token
        }
    });
};

export default axiosclient;
