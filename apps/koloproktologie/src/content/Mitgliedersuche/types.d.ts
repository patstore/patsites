import { Dispatch, SetStateAction } from "react";

export type MemberResult = {
    id: string;
    title: string;
    name: string;
    city: string;
    zip: string;
};

export type MemberSearchProps = {
    setResults: Dispatch<SetStateAction<MemberResult[] | undefined>>;
};

export type RenderResultsProps = {
    results?: MemberResult[];
};
