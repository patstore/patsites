// recreate query hooks after making changes in this file
// using the script in scripts/generateQueries.ts
// then recreate types in codegen

// reset Cache is not necessary

export const coloproktologen_schema = [
    {
        name: "Entry",
        keys: [
            "objectId",
            "categories",
            "label",
            "title",
            "createdAt",
            "text",
            "link",
            "file",
            "image",
            "description",
            "date"
        ]
    },
    {
        name: "Event",
        keys: [
            "objectId",
            "categories",
            "label",
            "title",
            "createdAt",
            "text",
            "image",
            "description",
            "text",
            "gallery",
            "dates",
            "documents",
            "file",
            "link"
        ]
    },
    {
        name: "Webpage",
        keys: [
            "objectId",
            "categories",
            "label",
            "title",
            "createdAt",
            "text",
            "gallery",
            "date",
            "state",
            "content",
            "path"
        ]
    },
    {
        name: "Category",
        keys: ["objectId", "categories", "label", "title", "createdAt", "text"]
    },
    {
        name: "Download",
        keys: [
            "objectId",
            "categories",
            "label",
            "title",
            "createdAt",
            "text",
            "state",
            "file",
            "image",
            "description"
        ]
    },
    {
        name: "Image",
        keys: [
            "objectId",
            "categories",
            "label",
            "title",
            "createdAt",
            "text",
            "date",
            "state",
            "connected_elements",
            "file"
        ]
    },
    {
        name: "Person",
        keys: [
            "objectId",
            "categories",
            "label",
            "title",
            "createdAt",
            "text",
            "portrait",
            "email",
            "description",
            "image",
            "data"
        ]
    },
    {
        name: "Location",
        keys: [
            "objectId", 
            "categories", 
            "label", 
            "title", 
            "createdAt", 
            "text", 
            "data", 
            "description"
        ]
    }
];
