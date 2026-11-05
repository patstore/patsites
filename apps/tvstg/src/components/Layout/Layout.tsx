import {
  layoutContainer,
  siteContentContainer,
  siteInnerContent,
} from "./styles";
import { ReactNode } from "react";
import Footer from "./components/Footer";
import ToTop from "./components/ToTop";

const Layout = ({ children }: { children: ReactNode }) => (
  <div css={layoutContainer}>
    <main>
      <div css={siteContentContainer}>
        <div css={siteInnerContent}>{children}</div>
      </div>
    </main>
    <ToTop />
    <Footer />
  </div>
);

export default Layout;
