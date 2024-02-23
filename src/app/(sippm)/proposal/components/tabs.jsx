"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Tab } from "@/components/tab";

export const Tabs = ({ tabActive, setSearch }) => {
  const pathname = usePathname();
  const tabParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    {
      id: 1,
      name: "penelitian",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("penelitian"),
    },
    {
      id: 2,
      name: "pengabdian",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("pengabdian"),
    },
  ];

  const createQueryTab = useCallback(
    (name, value) => {
      const params = new URLSearchParams(tabParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [tabParams]
  );

  const handleTabClick = (tabName) => {
    router.push(`${pathname}?${createQueryTab("tab", tabName)}`);
    setSearch("");
  };

  return (
    <div className='flex gap-1 lg:gap-2 w-fit'>
      {tabs.map(({ id, name, icon, func }) => {
        return (
          <Tab
            key={id}
            tabName={name}
            tabActive={tabActive}
            iconSrc={icon}
            onClick={func}
          />
        );
      })}
    </div>
  );
};
