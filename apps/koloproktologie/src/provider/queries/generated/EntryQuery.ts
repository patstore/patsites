
        export const query = `
            query AllEntry {
                allPatstoreEntry {
                    edges {
                        node {
                            id
                            
            objectId
    categories
    label
    title
    createdAt
    text
    link
    file  
  localFile {
            id  
            absolutePath
            url
            publicURL
            childImageSharp {
                gatsbyImageData(
                    width: 1920
                    placeholder: BLURRED
                    formats: [WEBP]
                )
            }
        }
    image
    description
    documents
    
                        }
                    }
                }
            }
        `;
    