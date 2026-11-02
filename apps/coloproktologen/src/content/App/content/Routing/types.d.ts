import React from "react";

export type PrivateRouteProps = {
  id?: string;
  hasAccess?: boolean;
  title: string;
  component: React.FC<{ path: string; id: string }>;
  path: string;
  default?: boolean;
};
