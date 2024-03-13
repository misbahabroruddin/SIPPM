"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { SearchInput } from "@/components/input/search-input";
import { Tabs } from "../tabs";
import { ListPenelitian } from "../list-penelitian-dashboard-dosen";
import { useQueryGetAllPenelitian } from "@/handlers/dosen/penelitian/query-get-all-penelitian";
import { useQueryGetAllPengabdian } from "@/handlers/dosen/pengabdian/query-get-all-pengabdian";
import { ListPengabdian } from "../list-pengabdian-dashboard-dosen";
import { useQueryTotalProposalDosen } from "@/handlers/dosen/query-total-proposal";

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
    useQueryGetAllPenelitian(searchPenelitian, pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetAllPengabdian(searchPengabdian, pagePengabdian);

  const { data: totalProposal } = useQueryTotalProposalDosen();

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
          totalProposal={totalProposal}
          handlePageChange={handlePageChangePenelitian}
        />
      ) : (
        <ListPengabdian
          pengabdian={pengabdian}
          currentTab={currentTab}
          tabActive={tabActive}
          isLoading={isLoadingPengabdian}
          totalProposal={totalProposal}
          handlePageChange={handlePageChangePengabdian}
        />
      )}
    </div>
  );
}
