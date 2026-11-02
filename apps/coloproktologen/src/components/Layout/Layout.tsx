import React from "react";
import { layoutContainer } from "./styles";
import "../../styles/global.css";
import { Framework } from "../Framework";
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
        <main css={{ width: "100%"}}>{children}</main>
        <Footer isUserProfile={isUserProfile} />
        <script async src="https://scripts.simpleanalyticscdn.com/latest.js"></script>
      </div>
    </>
  );
};

export default Layout;
