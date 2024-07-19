"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { Tabs } from "../tabs";
import { SearchInput } from "@/components/input/search-input";
import { useDebouncedCallback } from "use-debounce";
import { ListPenelitianProposalLPPM } from "../list-penelitian-lppm";
import { ListPengabdianProposalLPPM } from "../list-pengabdian-lppm";
import { useQueryGetPenelitianLPPM } from "@/handlers/lppm/penelitian/query-get-listing-penelitian";
import { useQueryGetPengabdianLPPM } from "@/handlers/lppm/pengabdian/query-get-listing-pkm-lppm";
import { useQueryInfoProposalPenelitianLPPM } from "@/handlers/lppm/penelitian/query-get-info-penelitian";
import { useQueryInfoProposalPengabdianLPPM } from "@/handlers/lppm/pengabdian/query-get-info-pengabdian";

export default function ProposalPageLPPM() {
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
    setPagePenelitian(1);
  }, 1000);

  const handleSearchPengabdian = useDebouncedCallback((value) => {
    setSearchPengabdian(value);
    setPagePengabdian(1);
  }, 1000);

  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetPenelitianLPPM(searchPenelitian, pagePenelitian);

  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetPengabdianLPPM(searchPengabdian, pagePengabdian);

  const { data: dataStatistikPenelitianLppm } =
    useQueryInfoProposalPenelitianLPPM();

  const { data: dataStatistikPengabdianLppm } =
    useQueryInfoProposalPengabdianLPPM();

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle iconSrc="/icons/search-black.svg" title="Proposal" />
        <div className="flex flex-col justify-between gap-2 lg:flex-row">
          <div className="flex flex-wrap items-center justify-between gap-2 lg:justify-start lg:gap-4">
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
          <ListPenelitianProposalLPPM
            penelitian={penelitian}
            isLoading={isLoadingPenelitian}
            currentTab={currentTab}
            tabActive={tabActive}
            jumlahPenelitianDisetujui={
              dataStatistikPenelitianLppm?.data?.status_lppm?.Diterima
            }
            jumlahPenelitianDitolak={
              dataStatistikPenelitianLppm?.data?.status_lppm?.Ditolak
            }
            jumlahPenelitianRevisi={
              dataStatistikPenelitianLppm?.data?.status_lppm?.Revisi
            }
            jumlahPenelitianPending={
              dataStatistikPenelitianLppm?.data?.status_lppm?.Pending
            }
            handlePageChange={handlePageChangePenelitian}
          />
        ) : (
          <ListPengabdianProposalLPPM
            pengabdian={pengabdian}
            isLoading={isLoadingPengabdian}
            currentTab={currentTab}
            tabActive={tabActive}
            jumlahPengabdianDisetujui={
              dataStatistikPengabdianLppm?.data?.status_lppm?.Diterima
            }
            jumlahPengabdianRevisi={
              dataStatistikPengabdianLppm?.data?.status_lppm?.Revisi
            }
            jumlahPengabdianDitolak={
              dataStatistikPengabdianLppm?.data?.status_lppm?.Ditolak
            }
            jumlahPengabdianPending={
              dataStatistikPengabdianLppm?.data?.status_lppm?.Pending
            }
            handlePagePengabdianChange={handlePageChangePengabdian}
          />
        )}
      </div>
    </ContainerPage>
  );
}
