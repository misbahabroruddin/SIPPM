"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Tabs } from "../tabs";
import { ListPengabdianSKDosen } from "../dosen/list-document-sk-dosen";
import { ListPengabdianKontrakDosen } from "../dosen/list-document-kontrak-dosen";
import { useQueryGetListSKDosen } from "@/handlers/dokumen/sk/query-get-sk-dosen";
import { useQueryGetListKontrakDosen } from "@/handlers/dokumen/kontrak/query-get-kontrak-dosen";

export default function DocumentPengabdianDosen() {
  const [tabActive] = useState("SK");
  const [pageSK, setPageSK] = useState(1);
  const [pageKontrak, setPageKontrak] = useState(1);
  const [searchSK] = useState(null);
  const [searchKontrak] = useState(null);
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");

  const handlePageChangeSK = (event) => {
    setPageSK(event.selected + 1);
  };
  const handlePageChangeKontrak = (event) => {
    setPageKontrak(event.selected + 1);
  };

  const { data: dataSK, isLoading: isLoadingSK } = useQueryGetListSKDosen(
    "pengabdian",
    searchSK,
    pageSK,
  );

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakDosen("pengabdian", searchKontrak, pageKontrak);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
          {/* <SearchInput
            onChange={(e) => {
              currentTab === "pengabdian"
                ? debouncedSearchPengabdian(e.target.value)
                : debounced(e.target.value);
            }}
            defaultValue={
              currentTab === "pengabdian" ? searchPengabdian : searchPenelitian
            }
          /> */}
        </div>
      </div>
      {currentTab === "SK" || !currentTab ? (
        <ListPengabdianSKDosen
          pengabdian={dataSK?.data}
          isLoading={isLoadingSK}
          handlePageChange={handlePageChangeSK}
        />
      ) : (
        <ListPengabdianKontrakDosen
          pengabdian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          handlePageChange={handlePageChangeKontrak}
        />
      )}
    </div>
  );
}
