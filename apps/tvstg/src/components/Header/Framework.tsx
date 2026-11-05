import React, { ReactNode, useState } from "react";
import { Header, HeaderMobile } from "./content/Header";

const Framework = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <HeaderMobile />
      <Header />
      {children}
    </>
  );
};

export default Framework;
