import React from "react";
import { Header, HeaderMobile } from "./content/Header";
import Kongress from "./content/Kongress";
import { Banner } from "./content";

const Framework: React.FC<{ showKongress: boolean }> = ({ showKongress }) => {
    return (
        <>
            <HeaderMobile />
            <Header />
            {showKongress && <Kongress />}
            <Banner isFixed />
        </>
    );
};

export default Framework;
