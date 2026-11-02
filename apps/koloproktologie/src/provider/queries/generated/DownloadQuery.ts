
        export const query = `
            query AllDownload {
                allPatstoreDownload {
                    edges {
                        node {
                            id
                            
            objectId
    categories
    label
    title
    createdAt
    text
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
    description
    
                        }
                    }
                }
            }
        `;
    