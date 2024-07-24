"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { TabPenelitianPengabdian } from "@/components/tabs/tab-penelitian-pengabdian";
import { SearchInput } from "@/components/input/search-input";
import { useQueryGetListLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/query-get-list-laporan-hasil-penelitian";
import { useQueryGetListLaporanHasilPengabdian } from "@/handlers/dosen/laporan-hasil/pengabdian/query-get-list-laporan-hasil-pengabdian";
import { ListPenelitian } from "../components/list-penelitian";
import { ListPengabdian } from "../components/list-pengabdian";

export default function LaporanLppmPage() {
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

  const debouncedSearchPenelitian = useDebouncedCallback((value) => {
    setSearchPenelitian(value);
  }, 1000);

  const debouncedSearchPengabdian = useDebouncedCallback((value) => {
    setSearchPengabdian(value);
  }, 1000);

  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetListLaporanHasilPenelitian(searchPenelitian, pagePenelitian);

  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetListLaporanHasilPengabdian(searchPengabdian, pagePengabdian);

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle iconSrc="/icons/search-black.svg" title="Laporan" />
        <div className="flex items-center gap-2 lg:gap-4">
          <TabPenelitianPengabdian tabActive={currentTab || tabActive} />
          <SearchInput
            onChange={(e) => {
              currentTab === "pengabdian"
                ? debouncedSearchPengabdian(e.target.value)
                : debouncedSearchPenelitian(e.target.value);
            }}
            defaultValue={
              currentTab === "pengabdian" ? searchPengabdian : searchPenelitian
            }
          />
        </div>
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitian
            penelitian={penelitian}
            isLoading={isLoadingPenelitian}
            handlePageChange={handlePageChangePenelitian}
          />
        ) : (
          <ListPengabdian
            pengabdian={pengabdian}
            isLoading={isLoadingPengabdian}
            handlePageChange={handlePageChangePengabdian}
          />
        )}
      </div>
    </ContainerPage>
  );
}
