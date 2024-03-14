"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardDashboard } from "@/components/card/card-dashboard";
import { Tabs } from "../tabs";
import { ListPenelitianDashboardLPPM } from "../list-penelitian-dashboard-lppm";
import { ListPengabdianDashboardLPPM } from "../list-pengabdian-dashboard-lppm";
import { useQueryGetAllPengabdianDashboardLPPM } from "@/handlers/lppm/dashboard/pengabdian/query-get-all-pengabdian-dashboard";
import { useQueryGetAllPenelitianDashboardLPPM } from "@/handlers/lppm/dashboard/penelitian/query-get-all-penelitian-dashboard";
import { useQueryInfoProposalPenelitianDashboardLPPM } from "@/handlers/lppm/dashboard/penelitian/query-get-info-penelitian-dashboard";
import { useQueryInfoProposalPengabdianDashboardLPPM } from "@/handlers/lppm/dashboard/pengabdian/query-get-info-pengabdian-dashboard";

export default function DashboardLppm() {
  const [pagePenelitian, setPagePenelitian] = useState(1);
  const [pagePengabdian, setPagePengabdian] = useState(1);
  const [tabActive] = useState("penelitian");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetAllPenelitianDashboardLPPM("", pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetAllPengabdianDashboardLPPM("", pagePengabdian);

  const handlePageChangePenelitian = (event) => {
    setPagePenelitian(event.selected + 1);
  };
  const handlePageChangePengabdian = (event) => {
    setPagePengabdian(event.selected + 1);
  };

  const { data: infoPenelitian } =
    useQueryInfoProposalPenelitianDashboardLPPM();
  const { data: infoPengabdian } =
    useQueryInfoProposalPengabdianDashboardLPPM();

  const totalPenelitianDisetujui =
    infoPenelitian?.data?.status_lppm?.diterima || 0;

  const totalPeneliatianDitolak =
    infoPenelitian?.data?.status_lppm?.ditolak || 0;

  const totalProposal =
    infoPenelitian?.data?.total + infoPengabdian?.data?.total || 0;

  const totalPengabdianDisetujui =
    infoPengabdian?.data?.status_lppm?.diterima || 0;

  const totalPengabdianDitolak =
    infoPengabdian?.data?.status_lppm?.ditolak || 0;

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
