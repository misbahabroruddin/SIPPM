"use client";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "next/navigation";

import { ContainerPage } from "@/components/container-page";
import { BasePageTitle } from "@/components/base-page-title";
import { SearchInput } from "@/components/input/search-input";
import { ListPenelitianLppm } from "../list-laporan-hasil-penelitian-lppm";
import { useQueryGetListLaporanHasilLppm } from "@/handlers/dosen/laporan-hasil/query-get-list-laporan-hasil-lppm";
import { Tabs } from "../tabs";
import { ListPengabdianLppm } from "../list-laporan-hasil-pengabdian-lppm";

export default function LaporanHasilPageLppm() {
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

  const { data: dataPenelitianLaporanHasil, isLoading: isLoadingPenelitian } =
    useQueryGetListLaporanHasilLppm(
      searchPenelitian,
      pagePenelitian,
      "penelitian",
    );

  const { data: dataPengabdianLaporanHasil, isLoading: isLoadingPengabdian } =
    useQueryGetListLaporanHasilLppm(
      searchPengabdian,
      pagePengabdian,
      "pengabdian",
    );
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/search-black.svg"
          title="Laporan Hasil"
        />
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
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
          <ListPenelitianLppm
            penelitian={dataPenelitianLaporanHasil}
            isLoading={isLoadingPenelitian}
            handlePageChange={handlePageChangePenelitian}
          />
        ) : (
          <ListPengabdianLppm
            pengabdian={dataPengabdianLaporanHasil}
            isLoading={isLoadingPengabdian}
            handlePageChange={handlePageChangePengabdian}
          />
        )}
      </div>
    </ContainerPage>
  );
}
