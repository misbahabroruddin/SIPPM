"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardDashboard } from "@/components/card/card-dashboard";
import { Tabs } from "../tabs";
import { useQueryGetPenelitianReviewer } from "@/handlers/reviewer/penelitian/query-get-listing-penelitian";
import { useQueryGetPengabdianReviewer } from "@/handlers/reviewer/pengabdian/query-get-listing-pengabdian";
import { ListPenelitianDashboardReviewer } from "../list-penelitian-dashboard-reviewer";
import { ListPengabdianDashboardReviewer } from "../list-pengabdian-dashboard-reviewer";

export default function DashboardReviewer() {
  const [tabActive] = useState("penelitian");
  const [pagePenelitian, setPagePenelitian] = useState(1);
  const [pagePengabdian, setPagePengabdian] = useState(1);

  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetPenelitianReviewer("", pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetPengabdianReviewer("", pagePengabdian);

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
      {/* <div className="max-h-[600px] overflow-auto p-1"> */}
      {currentTab === "penelitian" || !currentTab ? (
        <ListPenelitianDashboardReviewer
          penelitian={penelitian}
          isLoading={isLoadingPenelitian}
          currentTab={currentTab}
          tabActive={tabActive}
          handlePageChange={handlePageChangePenelitian}
        />
      ) : (
        <ListPengabdianDashboardReviewer
          pengabdian={pengabdian}
          isLoading={isLoadingPenelitian}
          currentTab={currentTab}
          tabActive={tabActive}
          handlePageChange={handlePageChangePengabdian}
        />
      )}
      {/* </div> */}
    </div>
  );
}
