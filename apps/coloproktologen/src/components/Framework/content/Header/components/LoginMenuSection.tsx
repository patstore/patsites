import { navigate } from "@router";
import { useSiteContext } from "@provider";
import React from "react";
import { IoIosLogIn } from "react-icons/io";

const LoginMenuSection: React.FC<{ loginLink: string; userLink: string }> = ({
  loginLink,
  userLink,
}) => {
  const { user } = useSiteContext();

  if (!user) {
    return (
      <li
        css={{ position: "relative" }}
        aria-hidden="true"
        onClick={() => {
          navigate(loginLink);
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
          navigate(userLink);
        }}
      >
        <span css={{ marginRight: "6px" }}>{user.label}</span> <IoIosLogIn />
      </span>
    </li>
  );
};

export default LoginMenuSection;
