import React from "react";

export type PrivateRouteProps = {
    id: string;
    title: string;
    component: React.FC<{ path: string; id: string }>;
    path: string;
    default?: boolean;
};
