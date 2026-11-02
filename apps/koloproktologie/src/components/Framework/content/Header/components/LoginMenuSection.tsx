import { useSiteContext } from "@provider";
import { useNavigate } from "@tanstack/react-router";
import React from "react";
import { IoIosLogIn } from "react-icons/io";

const LoginMenuSection: React.FC<{ loginLink: string; userLink: string }> = ({
    loginLink,
    userLink
}) => {
    const navigate = useNavigate();
    const { user } = useSiteContext();

    if (!user) {
        return (
            <li
                css={{ position: "relative" }}
                aria-hidden="true"
                onClick={() => {
                    navigate({ to: loginLink });
                }}
            >
                Login
            </li>
        );
    }

    return (
        <li css={{ position: "relative" }}>
            <span
                aria-hidden="true"
                onClick={() => {
                    navigate({ to: userLink });
                }}
            >
                <span css={{ marginRight: "6px" }}>{user.label}</span>{" "}
                <IoIosLogIn />
            </span>
        </li>
    );
};

export default LoginMenuSection;
