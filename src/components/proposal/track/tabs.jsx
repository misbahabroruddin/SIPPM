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
      name: "dokumen",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("dokumen"),
    },
    {
      id: 2,
      name: "riwayat",
      icon: {
        white: "/icons/history-white.svg",
        black: "/icons/history-black.svg",
      },
      func: () => handleTabClick("riwayat"),
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
    <div className="flex gap-2">
      {tabs.map(({ id, name, icon, func }) => {
        return (
          <Tab
            key={id}
            tabName={name}
            tabActive={tabActive}
            iconSrc={icon}
            onClick={func}
            className="text-sm lg:text-base"
            tabActiveClass="text-sm lg:text-base"
          />
        );
      })}
    </div>
  );
};
