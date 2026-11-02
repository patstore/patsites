
        export const query = `
        query AllImage {
            allPatstoreImage {
            edges {
                node {
                        id
                        objectId
                        localFile {
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
                    }
            }
            }
        }
        `;
    