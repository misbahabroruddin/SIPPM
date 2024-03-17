"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Tab } from "@/components/tab";

export const Tabs = ({ tabActive }) => {
  const pathname = usePathname();
  const tabParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    {
      id: 1,
      name: "SK",
      icon: {
        white: "/icons/search-white.svg",
        black: "/icons/search-black.svg",
      },
      func: () => handleTabClick("SK"),
      upperCase: true,
    },
    {
      id: 2,
      name: "kontrak",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("kontrak"),
      upperCase: false,
    },
  ];

  const createQueryTab = useCallback(
    (name, value) => {
      const params = new URLSearchParams(tabParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [tabParams],
  );

  const handleTabClick = (tabName) => {
    router.push(`${pathname}?${createQueryTab("tab", tabName)}`);
  };

  return (
    <div className="flex w-fit gap-1 lg:gap-2">
      {tabs.map(({ id, name, icon, func, upperCase }) => {
        return (
          <Tab
            key={id}
            tabName={name}
            tabActive={tabActive}
            iconSrc={icon}
            onClick={func}
            upperCase={upperCase}
            className="w-36 lg:w-40"
            tabActiveClass="w-36 lg:w-40"
          />
        );
      })}
    </div>
  );
};
