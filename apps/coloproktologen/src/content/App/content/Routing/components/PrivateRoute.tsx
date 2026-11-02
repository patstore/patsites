import { navigate } from "@router";
import React from "react";
import { PrivateRouteProps } from "../types";

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  id,
  title,
  component: Component,
  hasAccess = true,
  path,
  ...rest
}) => {
  if (!id) {
    navigate("/login/");
    return null;
  }

  if (!hasAccess) {
    navigate("/app/profile");
  }

  return <Component path={path} id={id} {...rest} />;
};

export default PrivateRoute;
