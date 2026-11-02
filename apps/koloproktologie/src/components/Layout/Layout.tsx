import React from "react";
import { layoutContainer } from "./styles";
import "../../styles/global.css";
import { Framework } from "../Framework";
import { Application } from "../Application";
import Footer from "./content/Footer";

const Layout: React.FC<{
    children: React.ReactNode;
    isUserProfile?: boolean;
    showKongress?: boolean;
}> = ({ children, isUserProfile = false, showKongress = true }) => {
    return (
        <>
            <div css={layoutContainer}>
                <Framework showKongress={showKongress} />
                <Application />
                <main css={{ width: "100%", overflow: "hidden" }}>
                    {children}
                </main>
                <Footer isUserProfile={isUserProfile} />
            </div>
        </>
    );
};

export default Layout;
