import { ReactNode } from "react";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";

const Framework = ({ children }: { children: ReactNode }) => (
  <>
    <a className="skip-link" href="#inhalt">
      Zum Inhalt
    </a>
    <HeaderMobile />
    <Header />
    {children}
  </>
);

export default Framework;
