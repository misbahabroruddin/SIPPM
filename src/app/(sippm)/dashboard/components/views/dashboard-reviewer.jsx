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
import { PieChartReviewer } from "../pie-chart-reviewer";
import { useQueryInfoProposalPenelitianReviewer } from "@/handlers/reviewer/penelitian/query-get-info-proposal-penelitian";
import { useQueryInfoProposalPengabdianReviewer } from "@/handlers/reviewer/pengabdian/query-get-info-proposal-pengabdian";

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

  const { data: infoPenelitian, isLoading: isLoadingInfoPenelitian } =
    useQueryInfoProposalPenelitianReviewer();

  const { data: infoPengabdian, isLoading: isLoadingInfoPengabdian } =
    useQueryInfoProposalPengabdianReviewer();

  const handlePageChangePenelitian = (event) => {
    setPagePenelitian(event.selected + 1);
  };
  const handlePageChangePengabdian = (event) => {
    setPagePengabdian(event.selected + 1);
  };

  return (
    <div className="mt-2 flex flex-col gap-4">
      <div className="flex gap-4">
        {isLoadingInfoPenelitian && isLoadingInfoPengabdian ? (
          <p>Loading....</p>
        ) : (
          <>
            <PieChartReviewer
              textHeader={"Proposal Penelitian"}
              proposalDisetujui={infoPenelitian?.data.status_reviewer.Diterima}
              proposalDitolak={infoPenelitian?.data.status_reviewer.Ditolak}
              proposalRevisi={infoPenelitian?.data.status_reviewer.Revisi}
              proposalPending={infoPenelitian?.data.status_reviewer.Pending}
            />
            <PieChartReviewer
              textHeader={"Proposal Pengabdian"}
              proposalDisetujui={infoPengabdian?.data.status_reviewer.Diterima}
              proposalDitolak={infoPengabdian?.data.status_reviewer.Ditolak}
              proposalRevisi={infoPengabdian?.data.status_reviewer.Revisi}
              proposalPending={infoPengabdian?.data.status_reviewer.Pending}
            />
          </>
        )}
      </div>
      {/* <div className="flex justify-between">
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
      )} */}
    </div>
  );
}
