"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Tabs } from "../tabs";
import { useQueryGetListSKPenelitianDosen } from "@/handlers/dosen/dokumen/penelitian/sk/query-get-sk-penelitian";
import { useQueryGetListKontrakPenelitianDosen } from "@/handlers/dosen/dokumen/penelitian/kontrak/query-get-kontrak-penelitian";
import { ListPenelitianSKDosen } from "../dosen/list-document-sk-dosen";
import { ListPenelitianKontrakDosen } from "../dosen/list-document-kontrak-dosen";

export default function DocumentPenelitianDosen() {
  const [tabActive] = useState("SK");
  const [pageSKPenelitian, setPageSKPenelitian] = useState(1);
  const [pageKontrakPenelitian, setPageKontrakPenelitian] = useState(1);
  const [searchSKPenelitian, setSKPenelitian] = useState("");
  const [searchKontrakPenelitian, setKontrakPenelitian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");

  const handlePageChangeSKPenelitian = (event) => {
    setPageSKPenelitian(event.selected + 1);
  };
  const handlePageChangeKontrakPenelitian = (event) => {
    setPageKontrakPenelitian(event.selected + 1);
  };

  const handleSearchSKPenelitian = useDebouncedCallback((value) => {
    setSKPenelitian(value);
    setPageSKPenelitian(1);
  }, 1000);

  const handleSearchKontrakPenelitian = useDebouncedCallback((value) => {
    setKontrakPenelitian(value);
    setPageKontrakPenelitian(1);
  }, 1000);

  const { data: dataSK, isLoading: isLoadingSK } =
    useQueryGetListSKPenelitianDosen(searchSKPenelitian, pageSKPenelitian);

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakPenelitianDosen(
      searchKontrakPenelitian,
      pageKontrakPenelitian,
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
          <SearchInput
            onChange={(e) => {
              currentTab === "SK"
                ? handleSearchSKPenelitian(e.target.value)
                : handleSearchKontrakPenelitian(e.target.value);
            }}
            defaultValue={
              currentTab === "SK" ? searchSKPenelitian : searchKontrakPenelitian
            }
          />
        </div>
      </div>
      {currentTab === "SK" || !currentTab ? (
        <ListPenelitianSKDosen
          penelitian={dataSK?.data}
          isLoading={isLoadingSK}
          handlePageChange={handlePageChangeSKPenelitian}
        />
      ) : (
        <ListPenelitianKontrakDosen
          penelitian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          handlePageChange={handlePageChangeKontrakPenelitian}
        />
      )}
    </div>
  );
}
