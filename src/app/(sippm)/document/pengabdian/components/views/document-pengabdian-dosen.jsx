"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Tabs } from "../tabs";
import { ListPengabdianSKDosen } from "../dosen/list-document-sk-dosen";
import { ListPengabdianKontrakDosen } from "../dosen/list-document-kontrak-dosen";
import { useQueryGetListSKPengabdianDosen } from "@/handlers/dosen/dokumen/pengabdian/sk/query-get-sk-pengabdian";
import { useQueryGetListKontrakPengabdianDosen } from "@/handlers/dosen/dokumen/pengabdian/kontrak/query-get-kontrak-pengabdian";

export default function DocumentPengabdianDosen() {
  const [tabActive] = useState("SK");
  const [pageSKPengabdian, setPageSKPengabdian] = useState(1);
  const [pageKontrakPengabdian, setPageKontrakPengabdian] = useState(1);
  const [searchSKPengabdian, setSKPengabdian] = useState("");
  const [searchKontrakPengabdian, setKontrakPengabdian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");

  const handlePageChangeSKPengabdian = (event) => {
    setPageSKPengabdian(event.selected + 1);
  };
  const handlePageChangeKontrakPengabdian = (event) => {
    setPageKontrakPengabdian(event.selected + 1);
  };

  const handleSearchSKPengabdian = useDebouncedCallback((value) => {
    setSKPengabdian(value);
    setPageSKPengabdian(1);
  }, 1000);

  const handleSearchKontrakPengabdian = useDebouncedCallback((value) => {
    setKontrakPengabdian(value);
    setPageKontrakPengabdian(1);
  }, 1000);

  const { data: dataSK, isLoading: isLoadingSK } =
    useQueryGetListSKPengabdianDosen(searchSKPengabdian, pageSKPengabdian);

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakPengabdianDosen(
      searchKontrakPengabdian,
      pageKontrakPengabdian,
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
          <SearchInput
            onChange={(e) => {
              currentTab === "SK"
                ? handleSearchSKPengabdian(e.target.value)
                : handleSearchKontrakPengabdian(e.target.value);
            }}
            defaultValue={
              currentTab === "SK" ? searchSKPengabdian : searchKontrakPengabdian
            }
          />
        </div>
      </div>
      {currentTab === "SK" || !currentTab ? (
        <ListPengabdianSKDosen
          pengabdian={dataSK?.data}
          isLoading={isLoadingSK}
          handlePageChange={handlePageChangeSKPengabdian}
        />
      ) : (
        <ListPengabdianKontrakDosen
          pengabdian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          handlePageChange={handlePageChangeKontrakPengabdian}
        />
      )}
    </div>
  );
}
