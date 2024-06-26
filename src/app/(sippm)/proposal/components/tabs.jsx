"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Tab } from "@/components/tab";

export const Tabs = ({ tabActive, penelitianDraft, pengabdianDraft }) => {
  const pathname = usePathname();
  const tabParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    {
      id: 1,
      name: "penelitian",
      icon: {
        white: "/icons/search-white.svg",
        black: "/icons/search-black.svg",
      },
      func: () => handleTabClick("penelitian"),
      statusDraft: penelitianDraft?.length,
    },
    {
      id: 2,
      name: "pengabdian",
      icon: {
        white: "/icons/location-white.svg",
        black: "/icons/location-black.svg",
      },
      func: () => handleTabClick("pengabdian"),
      statusDraft: pengabdianDraft?.length,
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
      {tabs.map(({ id, name, icon, func, statusDraft }) => {
        return (
          <Tab
            key={id}
            tabName={name}
            tabActive={tabActive}
            iconSrc={icon}
            onClick={func}
            statusDraft={statusDraft}
          />
        );
      })}
    </div>
  );
};
