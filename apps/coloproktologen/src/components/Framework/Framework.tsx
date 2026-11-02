import React from "react";
import { Banner, Kongress, Header, HeaderMobile } from "./content";

const Framework: React.FC<{ showKongress: boolean }> = ({ showKongress }) => {
  return (
    <>
      <HeaderMobile />
      <Header />
      {/* <Banner isFixed={true} /> */}
      {showKongress && <Kongress />}
    </>
  );
};

export default Framework;
