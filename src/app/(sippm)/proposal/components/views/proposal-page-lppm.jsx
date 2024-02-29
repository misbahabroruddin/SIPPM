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
  }, 1000);
  const handleSearchPengabdian = useDebouncedCallback((value) => {
    setSearchPengabdian(value);
  }, 1000);

  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetPenelitianLPPM(searchPenelitian, pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetPengabdianLPPM(searchPengabdian, pagePengabdian);

  const penelitianRevisi = penelitian?.data.filter(
    (item) => item.status_lppm === "Revisi",
  );

  const penelitianDisetujui = penelitian?.data.filter(
    (item) => item.status_lppm === "Diterima",
  );

  const penelitianDitolak = penelitian?.data.filter(
    (item) => item.status_lppm === "Ditolak",
  );

  const pengabdianRevisi = pengabdian?.data.filter(
    (item) => item.status_lppm === "Revisi",
  );

  const pengabdianDisetujui = pengabdian?.data.filter(
    (item) => item.status_lppm === "Diterima",
  );

  const pengabdianDitolak = pengabdian?.data.filter(
    (item) => item.status_lppm === "Ditolak",
  );
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
          <ListPenelitianProposalLPPM
            penelitian={penelitian}
            isLoading={isLoadingPenelitian}
            currentTab={currentTab}
            tabActive={tabActive}
            jumlahPenelitianDisetujui={penelitianDisetujui}
            jumlahPenelitianDitolak={penelitianDitolak}
            jumlahPenelitianRevisi={penelitianRevisi}
            handlePageChange={handlePageChangePenelitian}
          />
        ) : (
          <ListPengabdianProposalLPPM
            pengabdian={pengabdian}
            isLoading={isLoadingPengabdian}
            currentTab={currentTab}
            tabActive={tabActive}
            jumlahPengabdianDisetujui={pengabdianDisetujui}
            jumlahPengabdianRevisi={pengabdianRevisi}
            jumlahPengabdianDitolak={pengabdianDitolak}
            handlePagePengabdianChange={handlePageChangePengabdian}
          />
        )}
      </div>
    </ContainerPage>
  );
}
