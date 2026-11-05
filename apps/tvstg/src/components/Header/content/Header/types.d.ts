import { Dispatch, SetStateAction } from "react";
import main_menu from "./constants/main_menu";

export type SubMenuItem = {
  name: string;
  key: string;
  link: string;
};

export type Menu = {
  name: string;
  key: string;
  hasSubmenu?: boolean;
  link?: string;
  color?: string;
  menuItems: Array<{
    name: string;
    key: string;
    hasSubmenu?: boolean;
    link?: string;
    subMenuItems?: Array<SubMenuItem>;
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
  dropdownItem: Omit<Menu[number], "menuItems">;
};

export type MenuSectionProps = {
  menuItems: Menu[number]["menuItems"];
  dropdownItem: Omit<Menu[number], "menuItems">;
};
