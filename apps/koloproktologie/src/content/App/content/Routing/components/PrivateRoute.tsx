import React from "react";
import { Navigate } from "@tanstack/react-router";
import { PrivateRouteProps } from "../types";

const PrivateRoute: React.FC<PrivateRouteProps> = ({
    id,
    component: Component,
    ...rest
}) => {
    if (!id) {
        return <Navigate to="/login" />;
    }

    return <Component id={id} {...rest} />;
};

export default PrivateRoute;
