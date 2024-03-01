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
  const [pagePenelitian, setPagePenelitian] = useState(1);
  const [pagePengabdian, setPagePengabdian] = useState(1);
  const [tabActive] = useState("penelitian");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetPenelitianLPPM("", pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetPengabdianLPPM("", pagePengabdian);

  const handlePageChangePenelitian = (event) => {
    setPagePenelitian(event.selected + 1);
  };
  const handlePageChangePengabdian = (event) => {
    setPagePengabdian(event.selected + 1);
  };

  const penelitianDisetujui = penelitian?.data.filter(
    (item) => item.status_lppm === "Diterima",
  );

  const penelitianDitolak = penelitian?.data.filter(
    (item) => item.status_lppm === "Ditolak",
  );

  const penelitianRevisi = penelitian?.data.filter(
    (item) => item.status_lppm === "Revisi",
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
        <CardDashboard title="Pengabdian" jumlah={8} />
        <CardDashboard status="Ditolak" title="Pengabdian" jumlah={0} />
        <CardDashboard status="Revisi" title="Semua" jumlah={9} />
        <CardDashboard title="Penelitian" jumlah={10} />
        <CardDashboard status="Ditolak" title="Penelitian" jumlah={0} />
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
        </div>
      </div>
      {currentTab === "penelitian" || !currentTab ? (
        <ListPenelitianDashboardLPPM
          penelitian={penelitian}
          isLoading={isLoadingPenelitian}
          currentTab={currentTab}
          tabActive={tabActive}
          handlePageChange={handlePageChangePenelitian}
        />
      ) : (
        <ListPengabdianDashboardLPPM
          pengabdian={pengabdian}
          isLoading={isLoadingPenelitian}
          currentTab={currentTab}
          tabActive={tabActive}
          handlePageChange={handlePageChangePengabdian}
        />
      )}
    </div>
  );
}
