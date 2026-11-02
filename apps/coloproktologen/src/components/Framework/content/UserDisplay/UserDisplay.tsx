import React from "react";
import { LogIn } from "lucide-react";
import { useState } from "react";
import { userDisplayContainer } from "./styles";
import settings from "@settings";

const UserDisplay = () => {
  const [hover, setHover] = useState(false);

  return (
    <a
      css={[
        userDisplayContainer,
        { backgroundColor: hover ? settings.colors.dark : "transparent" },
      ]}
      href={"https://app.saaman-diagnostik.de"}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <LogIn
        size={16}
        strokeWidth={1.75}
        color={hover ? settings.colors.light : settings.colors.dark}
      />
    </a>
  );
};

export default UserDisplay;
