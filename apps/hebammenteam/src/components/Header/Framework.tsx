import { ReactNode } from "react";
import Header from "./Header";
import HeaderMobile from "./HeaderMobile";

const Framework = ({ children }: { children: ReactNode }) => (
  <>
    <HeaderMobile />
    <Header />
    {children}
  </>
);

export default Framework;
