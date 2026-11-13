import { ReactNode } from "react";
import Footer from "./components/Footer";
import ToTop from "./components/ToTop";

const Layout = ({ children }: { children: ReactNode }) => (
  <div className="layout-root">
    <main>
      <div className="site-content">
        <div className="site-inner">{children}</div>
      </div>
    </main>
    <ToTop />
    <Footer />
  </div>
);

export default Layout;
