import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import fetch from "isomorphic-fetch";
import { env } from "../../env";

const client = new ApolloClient({
    link: new HttpLink({
        uri: env.patstoreGraphqlUrl,
        headers: {
            "X-Parse-Application-Id": env.patstoreAppId,
            "X-Parse-Rest-Api-Key": env.patstoreRestKey
        },
        fetch
    }),
    devtools: {
        enabled: true
    },
    cache: new InMemoryCache()
});

export default client;
