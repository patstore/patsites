import { gql } from "@apollo/client/core";

export const get_user_data = gql`
    query getUserData($objectId: String!) {
        getUser(objectId: $objectId) {
            objectId
            name
            label
            email
            title
            anrede
        }
    }
`;