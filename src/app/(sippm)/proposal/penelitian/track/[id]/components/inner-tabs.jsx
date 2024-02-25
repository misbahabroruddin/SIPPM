"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { Tab } from "@/components/tab";

export const InnerTabs = ({ tabActive }) => {
  const pathname = usePathname();
  const tabParams = useSearchParams();
  const router = useRouter();

  const tabs = [
    {
      id: 1,
      name: "Identitas Usulan",
      func: () => handleTabClick("Identitas Usulan"),
    },
    {
      id: 2,
      name: "anggota",
      func: () => handleTabClick("anggota"),
    },
    {
      id: 3,
      name: "Luaran dan Target Capaian",
      func: () => handleTabClick("Luaran dan Target Capaian"),
    },
    {
      id: 4,
      name: "Rencana Anggaran",
      func: () => handleTabClick("Rencana Anggaran"),
    },
    {
      id: 5,
      name: "Jadwal",
      func: () => handleTabClick("Jadwal"),
    },
    {
      id: 6,
      name: "Berkas",
      func: () => handleTabClick("Berkas"),
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
    router.push(`${pathname}?${createQueryTab("tab2", tabName)}`);
  };

  return (
    <div className="flex gap-2">
      {tabs.map(({ id, name, icon, func }) => {
        return (
          <Tab
            key={id}
            tabName={name}
            tabActive={tabActive}
            onClick={func}
            className="rounded rounded-bl-none rounded-br-none border-none bg-[#10487A] text-white outline-none"
            tabActiveClass="rounded rounded-bl-none rounded-br-none border border-b-0 border-blue-primary bg-white text-black"
          />
        );
      })}
    </div>
  );
};
