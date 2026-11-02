import { Dispatch, SetStateAction } from "react";

export type Menu = {
  name: string;
  key: string;
  hasSubmenu?: boolean;
  link?: string;
  color?: string;
  type?: "button" | "link" | undefined;
  menuItems?: Array<{
    name: string;
    key: string;
    hasSubmenu?: boolean;
    link?: string;
    function?: () => void;
    subMenuItems?: Array<{
      name: string;
      key: string;
      link: string;
      function?: () => void;
    }>;
  }>;
}[];

export type SubMenuItemsProps = {
  subMenuState: string;
  itemKey: string;
  setSubMenuState: Dispatch<SetStateAction<string>>;
  subMenutItems?: Array<{ link: string; key: string; name: string }>;
};

export type MenuSectionMobileProps = {
  menuItems: Menu[number]["menuItems"];
  dropdownItem: Menu[number];
};

export type MenuSectionProps = {
  menuItems: Menu[number]["menuItems"];
  dropdownItem: Menu[number];
};

export type BurgerMenuProps = {
  menuOpen: boolean;
  setMenuOpen: Dispatch<SetStateAction<boolean>>;
};

export type MobileMenuSectionProps = {
  menuSection: Menu[number];
  setMenuState: Dispatch<SetStateAction<string>>;
};

export type MobileSubMenuSectionProps = {
  menuSection: Menu[number];
  setMenuState: Dispatch<SetStateAction<string>>;
  menuState: string;
};
