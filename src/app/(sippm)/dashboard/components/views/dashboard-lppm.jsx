"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardDashboard } from "@/components/card/card-dashboard";
import { Tabs } from "../tabs";
import { ListPenelitianDashboardLPPM } from "../list-penelitian-dashboard-lppm";
import { ListPengabdianDashboardLPPM } from "../list-pengabdian-dashboard-lppm";
import { useQueryGetPenelitianLPPM } from "@/handlers/lppm/penelitian/query-get-listing-penelitian";
import { useQueryGetPengabdianLPPM } from "@/handlers/lppm/pengabdian/query-get-listing-pkm-lppm";
import { useQueryTotalProposalLPPM } from "@/handlers/lppm/query-total-proposal";

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

  const { data: totalProposal } = useQueryTotalProposalLPPM();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <CardDashboard
          title="Penelitian"
          jumlah={totalProposal?.data?.penelitian_disetujui}
        />
        <CardDashboard
          status="Ditolak"
          title="Penelitian"
          jumlah={totalProposal?.data?.penelitian_ditolak}
        />
        <CardDashboard
          status="Revisi"
          title="Semua"
          jumlah={totalProposal?.data?.revisi}
        />
        <CardDashboard
          title="Pengabdian"
          jumlah={totalProposal?.data?.pengabdian_disetujui}
        />
        <CardDashboard
          status="Ditolak"
          title="Pengabdian"
          jumlah={totalProposal?.data?.pengabdian_ditolak}
        />
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
          isLoading={isLoadingPengabdian}
          currentTab={currentTab}
          tabActive={tabActive}
          handlePageChange={handlePageChangePengabdian}
        />
      )}
    </div>
  );
}
