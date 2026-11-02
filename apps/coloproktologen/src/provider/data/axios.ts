import { env } from "@env";
/* eslint-disable no-undef */
import axios from "axios";
import Cookies from "js-cookie";

type Headers = {
    "X-Parse-Application-Id": string;
    "X-Parse-REST-API-Key": string;
    "X-Parse-Session-Token"?: string;
}

const axiosclient = () => {
    const localToken = Cookies.get(env.sessionToken);
    const token = localToken || "";

    const headers: Headers = {
        "X-Parse-Application-Id": env.patstoreAppId,
        "X-Parse-REST-API-Key": env.patstoreRestKey
    }

    if (token) {
        headers["X-Parse-Session-Token"] = token;
    }

    return axios.create({
        baseURL: env.patstoreApiUrl,
        headers
    });
};

export default axiosclient;
