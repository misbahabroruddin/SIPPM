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
      name: "profile",
      icon: {
        white: "/icons/profile.svg",
        black: "/icons/profile.svg",
      },
      func: () => handleTabClick("profile"),
    },
    {
      id: 2,
      name: "security",
      icon: {
        white: "/icons/security.svg",
        black: "/icons/security.svg",
      },
      func: () => handleTabClick("security"),
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
  };

  return (
    <div className='flex gap-2'>
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
