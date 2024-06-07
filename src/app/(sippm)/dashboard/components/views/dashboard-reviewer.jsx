"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardDashboard } from "@/components/card/card-dashboard";
import { Tabs } from "../tabs";
import { ListPenelitianDashboardReviewer } from "../list-penelitian-dashboard-reviewer";
import { ListPengabdianDashboardReviewer } from "../list-pengabdian-dashboard-reviewer";
import { useQueryGetAllPenelitianDashboardReviewer } from "@/handlers/reviewer/dashboard/penelitian/query-get-all-penelitian-dashboard";
import { useQueryGetAllPengabdianDashboardReviewer } from "@/handlers/reviewer/dashboard/pengabdian/query-get-all-pengabdian-dashboard";
import { useQueryInfoProposalPenelitianDashboardReviewer } from "@/handlers/reviewer/dashboard/penelitian/query-get-info-penelitian-dashboard";
import { useQueryInfoProposalPengabdianDashboardReviewer } from "@/handlers/reviewer/dashboard/pengabdian/query-get-info-pengabdian-dashboard";

export default function DashboardReviewer() {
  const [tabActive] = useState("penelitian");
  const [pagePenelitian, setPagePenelitian] = useState(1);
  const [pagePengabdian, setPagePengabdian] = useState(1);

  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetAllPenelitianDashboardReviewer("", pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetAllPengabdianDashboardReviewer("", pagePengabdian);

  const { data: infoPenelitian } =
    useQueryInfoProposalPenelitianDashboardReviewer();
  const { data: infoPengabdian } =
    useQueryInfoProposalPengabdianDashboardReviewer();

  const totalPenelitianDisetujui =
    infoPenelitian?.data?.status_reviewer?.diterima || 0;

  const totalPeneliatianDitolak =
    infoPenelitian?.data?.status_reviewer?.ditolak || 0;

  const totalProposal =
    infoPenelitian?.data?.status_reviewer?.revisi +
      infoPengabdian?.data?.status_reviewer?.revisi || 0;

  const totalPengabdianDisetujui =
    infoPengabdian?.data?.status_reviewer?.diterima || 0;

  const totalPengabdianDitolak =
    infoPengabdian?.data?.status_reviewer?.ditolak || 0;
  const handlePageChangePenelitian = (event) => {
    setPagePenelitian(event.selected + 1);
  };
  const handlePageChangePengabdian = (event) => {
    setPagePengabdian(event.selected + 1);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <CardDashboard title="Penelitian" jumlah={totalPenelitianDisetujui} />
        <CardDashboard
          status="Ditolak"
          title="Penelitian"
          jumlah={totalPeneliatianDitolak}
        />
        <CardDashboard status="Revisi" title="Semua" jumlah={totalProposal} />
        <CardDashboard title="Pengabdian" jumlah={totalPengabdianDisetujui} />
        <CardDashboard
          status="Ditolak"
          title="Pengabdian"
          jumlah={totalPengabdianDitolak}
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
