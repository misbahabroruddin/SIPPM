"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardDashboard } from "@/components/card/card-dashboard";
import { Tabs } from "../tabs";

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
      <div className="h-[700px] overflow-auto">
        {currentTab === "penelitian" || !currentTab ? (
          <div>penelitian</div>
        ) : (
          <div>pengabdian</div>
        )}
      </div>
    </div>
  );
}
