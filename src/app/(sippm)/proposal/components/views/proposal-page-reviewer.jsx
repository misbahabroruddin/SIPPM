"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { Tabs } from "../tabs";
import { SearchInput } from "@/components/input/search-input";
import { useDebouncedCallback } from "use-debounce";
import { ListPengabdianProposalReviewer } from "../list-pengabdian-reviewer";
import { useQueryGetPengabdianReviewer } from "@/handlers/reviewer/pengabdian/query-get-listing-pengabdian";
import { ListPenelitianProposalReviewer } from "../list-penelitian-reviewer";
import { useQueryInfoProposalPenelitianReviewer } from "@/handlers/reviewer/penelitian/query-get-info-proposal-penelitian";
import { useQueryInfoProposalPengabdianReviewer } from "@/handlers/reviewer/pengabdian/query-get-info-proposal-pengabdian";
import { useQueryGetPenelitianReviewer } from "@/handlers/reviewer/penelitian/query-get-listing-penelitian-reviewer";

export default function ProposalPageReviewer() {
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
  const handleSearchPenelitian = useDebouncedCallback((value) => {
    setSearchPenelitian(value);
  }, 1000);
  const handleSearchPengabdian = useDebouncedCallback((value) => {
    setSearchPengabdian(value);
  }, 1000);

  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetPenelitianReviewer(searchPenelitian, pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetPengabdianReviewer(searchPengabdian, pagePengabdian);

  const { data: totalProposalPenelitian } =
    useQueryInfoProposalPenelitianReviewer();
  const { data: totalProposalPengabdian } =
    useQueryInfoProposalPengabdianReviewer();

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle iconSrc="/icons/search-black.svg" title="Proposal" />
        <div className="flex justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <Tabs tabActive={currentTab || tabActive} />
            <SearchInput
              onChange={(e) => {
                currentTab === "pengabdian"
                  ? handleSearchPengabdian(e.target.value)
                  : handleSearchPenelitian(e.target.value);
              }}
              defaultValue={
                currentTab === "pengabdian"
                  ? searchPengabdian
                  : searchPenelitian
              }
            />
          </div>
        </div>
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitianProposalReviewer
            penelitian={penelitian}
            isLoading={isLoadingPenelitian}
            jumlahPenelitianDisetujui={
              totalProposalPenelitian?.data?.status_reviewer?.Diterima
            }
            jumlahPenelitianDitolak={
              totalProposalPenelitian?.data?.status_reviewer?.Ditolak
            }
            jumlahPenelitianRevisi={
              totalProposalPenelitian?.data?.status_reviewer?.Revisi
            }
            handlePageChange={handlePageChangePenelitian}
          />
        ) : (
          <ListPengabdianProposalReviewer
            pengabdian={pengabdian}
            isLoading={isLoadingPengabdian}
            currentTab={currentTab}
            tabActive={tabActive}
            jumlahPengabdianDisetujui={
              totalProposalPengabdian?.data?.status_reviewer?.Diterima
            }
            jumlahPengabdianRevisi={
              totalProposalPengabdian?.data?.status_reviewer?.Revisi
            }
            jumlahPengabdianDitolak={
              totalProposalPengabdian?.data?.status_reviewer?.Ditolak
            }
            handlePagePengabdianChange={handlePageChangePengabdian}
          />
        )}
      </div>
    </ContainerPage>
  );
}
