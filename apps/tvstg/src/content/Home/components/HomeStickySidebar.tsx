import type { ReactNode } from "react";
import { StickyAside } from "@ui";

/** Home Jobbörse column; uses shared scroll-position sticky aside. */
const HomeStickySidebar = ({ children }: { children: ReactNode }) => (
  <StickyAside>{children}</StickyAside>
);

export default HomeStickySidebar;
