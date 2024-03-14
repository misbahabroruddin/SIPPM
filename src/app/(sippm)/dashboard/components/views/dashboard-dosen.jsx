"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { SearchInput } from "@/components/input/search-input";
import { Tabs } from "../tabs";
import { ListPenelitian } from "../list-penelitian-dashboard-dosen";
import { ListPengabdian } from "../list-pengabdian-dashboard-dosen";
import { useQueryGetAllPenelitianDashboardDosen } from "@/handlers/dosen/penelitian/dashboard/query-get-all-penelitian-dashboard";
import { useQueryInfoProposalPenelitianDashboardDosen } from "@/handlers/dosen/penelitian/dashboard/query-get-info-dashboard";
import { useQueryGetAllPengabdianDashboardDosen } from "@/handlers/dosen/pengabdian/dashboard/query-get-all-pengabdian-dashboard";
import { useQueryInfoProposalPengabdianDashboardDosen } from "@/handlers/dosen/pengabdian/dashboard/query-get-info-pengabdian-dashboard";

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

  const debounced = useDebouncedCallback((value) => {
    setSearchPenelitian(value);
  }, 1000);
  const debouncedSearchPengabdian = useDebouncedCallback((value) => {
    setSearchPengabdian(value);
  }, 1000);

  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetAllPenelitianDashboardDosen(searchPenelitian, pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetAllPengabdianDashboardDosen(searchPengabdian, pagePengabdian);

  const { data: infoPenelitian } =
    useQueryInfoProposalPenelitianDashboardDosen();

  const { data: infoPengabdian } =
    useQueryInfoProposalPengabdianDashboardDosen();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
          <SearchInput
            onChange={(e) => {
              currentTab === "pengabdian"
                ? debouncedSearchPengabdian(e.target.value)
                : debounced(e.target.value);
            }}
            defaultValue={
              currentTab === "pengabdian" ? searchPengabdian : searchPenelitian
            }
          />
        </div>
      </div>
      {currentTab === "penelitian" || !currentTab ? (
        <ListPenelitian
          penelitian={penelitian}
          currentTab={currentTab}
          tabActive={tabActive}
          isLoading={isLoadingPenelitian}
          totalProposal={infoPenelitian}
          handlePageChange={handlePageChangePenelitian}
        />
      ) : (
        <ListPengabdian
          pengabdian={pengabdian}
          currentTab={currentTab}
          tabActive={tabActive}
          isLoading={isLoadingPengabdian}
          totalProposal={infoPengabdian}
          handlePageChange={handlePageChangePengabdian}
        />
      )}
    </div>
  );
}
