"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Tabs } from "../tabs";
import { ListPenelitianDashboardLPPM } from "../list-penelitian-dashboard-lppm";
import { ListPengabdianDashboardLPPM } from "../list-pengabdian-dashboard-lppm";
import { useQueryInfoProposalPenelitianLPPM } from "@/handlers/lppm/penelitian/query-get-info-penelitian";
import { useQueryInfoProposalPengabdianLPPM } from "@/handlers/lppm/pengabdian/query-get-info-pengabdian";
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

  const { data: dataStatistikPenelitianLppm } =
    useQueryInfoProposalPenelitianLPPM();

  const { data: dataStatistikPengabdianLppm } =
    useQueryInfoProposalPengabdianLPPM();

  return (
    <div className="flex flex-col gap-4">
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
          totalPenelitianPending={
            dataStatistikPenelitianLppm?.data?.status_lppm?.Pending
          }
          totalPenelitianDisetujui={
            dataStatistikPenelitianLppm?.data?.status_lppm?.Diterima
          }
          totalPenelitianRevisi={
            dataStatistikPenelitianLppm?.data?.status_lppm?.Revisi
          }
          totalPenelitianDitolak={
            dataStatistikPenelitianLppm?.data?.status_lppm?.Ditolak
          }
        />
      ) : (
        <ListPengabdianDashboardLPPM
          pengabdian={pengabdian}
          isLoading={isLoadingPengabdian}
          currentTab={currentTab}
          tabActive={tabActive}
          handlePageChange={handlePageChangePengabdian}
          totalPengabdianPending={
            dataStatistikPengabdianLppm?.data?.status_lppm?.Pending
          }
          totalPengabdianDisetujui={
            dataStatistikPengabdianLppm?.data?.status_lppm?.Diterima
          }
          totalPengabdianRevisi={
            dataStatistikPengabdianLppm?.data?.status_lppm?.Revisi
          }
          totalPengabdianDitolak={
            dataStatistikPengabdianLppm?.data?.status_lppm?.Ditolak
          }
        />
      )}
    </div>
  );
}
