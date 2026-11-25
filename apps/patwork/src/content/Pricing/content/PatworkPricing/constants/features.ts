type Feature = {
    name: "group-a" | "group-b" | "group-c";
    description: string;
};

const features: Feature[] = [
    {
        name: "group-a",
        description: "Module Gruppe A"
    },
    {
        name: "group-b",
        description: "Module Gruppe B"
    },
    {
        name: "group-c",
        description: "Module Gruppe C"
    }
];

export default features;
