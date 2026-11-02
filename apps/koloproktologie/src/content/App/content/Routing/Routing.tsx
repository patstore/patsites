import React from "react";
import { Navigate, useLocation } from "@tanstack/react-router";
import { Profile } from "../Profile";
import { Mitgliederbereich } from "../Mitgliederbereich";

const Routing: React.FC<{ id?: string }> = ({ id }) => {
    const { pathname } = useLocation();

    if (!id) {
        return <Navigate to="/login" />;
    }

    if (pathname.includes("/profile")) {
        return <Profile />;
    }

    return <Mitgliederbereich />;
};

export default Routing;
