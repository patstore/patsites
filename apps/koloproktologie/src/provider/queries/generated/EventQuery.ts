
        export const query = `
            query AllEvent {
                allPatstoreEvent {
                    edges {
                        node {
                            id
                            
            objectId
    categories
    label
    title
    createdAt
    text
    image
    description
    gallery
    dates
    documents
    data
    location
    link
    
                        }
                    }
                }
            }
        `;
    