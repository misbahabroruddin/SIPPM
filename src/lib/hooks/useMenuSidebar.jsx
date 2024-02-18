"use client";

import { useEffect, useState } from "react";

import {
  MENU_SIDEBAR_ADMIN,
  MENU_SIDEBAR_DOSEN,
  MENU_SIDEBAR_LPPM,
  MENU_SIDEBAR_REVIEWER,
} from "@/lib/constants/sidebar";
import { ADMINISTRATOR, DOSEN, LPPM } from "../constants/role";

export const useSidebarMenu = (session) => {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const setMenusBasedOnRole = () => {
      const userRole = session?.user.roles[0]?.name;

      switch (userRole) {
        case ADMINISTRATOR:
          setMenus(MENU_SIDEBAR_ADMIN);
          break;
        case DOSEN:
          setMenus(MENU_SIDEBAR_DOSEN);
          break;
        case LPPM:
          setMenus(MENU_SIDEBAR_LPPM);
          break;
        default:
          setMenus(MENU_SIDEBAR_REVIEWER);
          break;
      }
    };

    setMenusBasedOnRole();
  }, [session]);

  return menus;
};
