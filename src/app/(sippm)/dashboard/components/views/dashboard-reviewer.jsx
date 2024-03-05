"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardDashboard } from "@/components/card/card-dashboard";
import { Tabs } from "../tabs";
import { useQueryGetPenelitianReviewer } from "@/handlers/reviewer/penelitian/query-get-listing-penelitian";
import { useQueryGetPengabdianReviewer } from "@/handlers/reviewer/pengabdian/query-get-listing-pengabdian";
import { ListPenelitianDashboardReviewer } from "../list-penelitian-dashboard-reviewer";
import { ListPengabdianDashboardReviewer } from "../list-pengabdian-dashboard-reviewer";
import { useQueryTotalProposalReviewer } from "@/handlers/reviewer/query-total-proposal";

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

  const { data: totalProposal } = useQueryTotalProposalReviewer();

  const handlePageChangePenelitian = (event) => {
    setPagePenelitian(event.selected + 1);
  };
  const handlePageChangePengabdian = (event) => {
    setPagePengabdian(event.selected + 1);
  };

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
          isLoading={isLoadingPengabdian}
          currentTab={currentTab}
          tabActive={tabActive}
          handlePageChange={handlePageChangePengabdian}
        />
      )}
    </div>
  );
}
