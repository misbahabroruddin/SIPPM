"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { ListPenelitian } from "../list-penelitian-dashboard-dosen";
import { ListPengabdian } from "../list-pengabdian-dashboard-dosen";
import { useQueryGetAllPenelitianDashboardDosen } from "@/handlers/dosen/penelitian/dashboard/query-get-all-penelitian-dashboard";
import { useQueryInfoProposalPenelitianDashboardDosen } from "@/handlers/dosen/penelitian/dashboard/query-get-info-dashboard";
import { useQueryGetAllPengabdianDashboardDosen } from "@/handlers/dosen/pengabdian/dashboard/query-get-all-pengabdian-dashboard";
import { useQueryInfoProposalPengabdianDashboardDosen } from "@/handlers/dosen/pengabdian/dashboard/query-get-info-pengabdian-dashboard";
import { PieChartDosen } from "../pie-chart-dosen";

const Loading = () => {
  return <p>Loading....</p>;
};

export default function DashboardDosen() {
  const [tabActive] = useState("penelitian");
  const [pagePenelitian, setPagePenelitian] = useState(1);
  const [pagePengabdian, setPagePengabdian] = useState(1);
  const [searchPenelitian, setSearchPenelitian] = useState("");
  const [searchPengabdian, setSearchPengabdian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");

  const handlePageChangePenelitian = (event) => {
    setPagePenelitian(event.selected + 1);
  };
  const handlePageChangePengabdian = (event) => {
    setPagePengabdian(event.selected + 1);
  };

  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetAllPenelitianDashboardDosen(searchPenelitian, pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetAllPengabdianDashboardDosen(searchPengabdian, pagePengabdian);

  const { data: infoPenelitian, isLoading } =
    useQueryInfoProposalPenelitianDashboardDosen();

  const { data: infoPengabdian } =
    useQueryInfoProposalPengabdianDashboardDosen();

  console.log(infoPengabdian, "<<<<<");

  const proposalPengabdianDitolak =
    infoPengabdian?.data?.status_reviewer?.Ditolak;

  const proposalPengabdianDisetujui =
    infoPengabdian?.data?.status_reviewer?.Diterima;

  const proposalPengabdianRevisi =
    infoPengabdian?.data?.status_reviewer?.Revisi;

  const proposalPenelitianDitolak =
    infoPenelitian?.data?.status_reviewer?.Ditolak;

  const proposalPenelitianDisetujui =
    infoPenelitian?.data?.status_reviewer?.Diterima;

  const proposalPenelitianRevisi =
    infoPenelitian?.data?.status_reviewer?.Revisi;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <PieChartDosen
              textHeader={"Proposal Penelitian"}
              proposalDisetujui={proposalPenelitianDisetujui}
              proposalDitolak={proposalPenelitianDitolak}
              proposalRevisi={proposalPenelitianRevisi}
            />
            <PieChartDosen
              textHeader={"Proposal Pengabdian"}
              totalProposal={infoPengabdian?.data?.total}
              proposalDisetujui={proposalPengabdianDisetujui}
              proposalDitolak={proposalPengabdianDitolak}
              proposalRevisi={proposalPengabdianRevisi}
            />
          </>
        )}
      </div>
      {/* <div className="flex justify-between">
        <div className="flex flex-wrap items-center justify-between gap-2 lg:justify-start lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
        </div>
      </div> */}

      {/* {currentTab === "penelitian" || !currentTab ? (
        <ListPenelitian
          penelitian={penelitian}
          currentTab={currentTab}
          tabActive={tabActive}
          isLoading={isLoadingPenelitian}
          handlePageChange={handlePageChangePenelitian}
        />
      ) : (
        <ListPengabdian
          pengabdian={pengabdian}
          currentTab={currentTab}
          tabActive={tabActive}
          isLoading={isLoadingPengabdian}
          handlePageChange={handlePageChangePengabdian}
        />
      )} */}
    </div>
  );
}
