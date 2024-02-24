"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardDashboard } from "@/components/card/card-dashboard";
import { Tabs } from "../tabs";
import { ListPenelitianDashboardLPPM } from "../list-penelitian-dashboard-lppm";
import { ListPengabdianDashboardLPPM } from "../list-pengabdian-dashboard-lppm";

export default function DashboardLppm() {
  const [tabActive] = useState("penelitian");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <CardDashboard title="Pengabdian" />
        <CardDashboard status="Ditolak" title="Pengabdian" />
        <CardDashboard status="Revisi" title="Semua" />
        <CardDashboard title="Penelitian" />
        <CardDashboard status="Ditolak" title="Penelitian" />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
        </div>
      </div>
      <div className="h-[700px] overflow-auto p-[2px]">
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitianDashboardLPPM />
        ) : (
          <ListPengabdianDashboardLPPM />
        )}
      </div>
    </div>
  );
}
