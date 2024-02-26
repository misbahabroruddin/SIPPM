"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardDashboard } from "@/components/card/card-dashboard";
import { Tabs } from "../tabs";
import { ListPenelitianDashboardLPPM } from "../list-penelitian-dashboard-lppm";
import { ListPengabdianDashboardLPPM } from "../list-pengabdian-dashboard-lppm";
import { useQueryGetPenelitianLPPM } from "@/handlers/lppm/penelitian/query-get-listing-penelitian";
import { useQueryGetPengabdianLPPM } from "@/handlers/lppm/pengabdian/query-get-listing-pkm-lppm";

export default function DashboardLppm() {
  const [tabActive] = useState("penelitian");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetPenelitianLPPM();
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetPengabdianLPPM();

  const penelitianPending = penelitian?.data.filter(
    (item) => item.status_lppm === "Pending",
  );

  const penelitianDisetujui = penelitian?.data.filter(
    (item) => item.status_lppm === "Diterima",
  );

  const penelitianDitolak = penelitian?.data.filter(
    (item) => item.status_lppm === "Ditolak",
  );

  const penelitianRevisi = penelitian?.data.filter(
    (item) => item.status_lppm === "Revisi",
  );

  const pengabdianPending = pengabdian?.data.filter(
    (item) => item.status_lppm === "Pending",
  );

  const pengabdianDisetujui = pengabdian?.data.filter(
    (item) => item.status_lppm === "Diterima",
  );

  const pengabdianDitolak = pengabdian?.data.filter(
    (item) => item.status_lppm === "Ditolak",
  );

  const pengabdianRevisi = pengabdian?.data.filter(
    (item) => item.status_lppm === "Revisi",
  );
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <CardDashboard
          title="Pengabdian"
          jumlah={pengabdianDisetujui?.length}
        />
        <CardDashboard
          status="Ditolak"
          title="Pengabdian"
          jumlah={pengabdianDitolak?.length}
        />
        <CardDashboard
          status="Revisi"
          title="Semua"
          jumlah={pengabdianRevisi?.length + penelitianRevisi?.length || 0}
        />
        <CardDashboard
          title="Penelitian"
          jumlah={penelitianDisetujui?.length}
        />
        <CardDashboard
          status="Ditolak"
          title="Penelitian"
          jumlah={penelitianDitolak?.length}
        />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
        </div>
      </div>
      <div className="max-h-[600px] overflow-auto p-1">
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitianDashboardLPPM
            penelitian={penelitianPending}
            isLoading={isLoadingPenelitian}
            currentTab={currentTab}
            tabActive={tabActive}
          />
        ) : (
          <ListPengabdianDashboardLPPM
            pengabdian={pengabdianPending}
            isLoading={isLoadingPenelitian}
            currentTab={currentTab}
            tabActive={tabActive}
          />
        )}
      </div>
    </div>
  );
}
