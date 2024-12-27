"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { Tabs } from "../tabs";
import { ListPenelitianSKDosen } from "../dosen/list-document-sk-dosen";
import { ListPenelitianKontrakDosen } from "../dosen/list-document-kontrak-dosen";
import { useQueryGetListKontrakDosen } from "@/handlers/dokumen/kontrak/query-get-kontrak-dosen";
import { useQueryGetListSKDosen } from "@/handlers/dokumen/sk/query-get-sk-dosen";

export default function DocumentPenelitianDosen() {
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
    "penelitian",
    searchSK,
    pageSK,
  );

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakDosen("penelitian", searchKontrak, pageKontrak);

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
        <ListPenelitianSKDosen
          penelitian={dataSK?.data}
          isLoading={isLoadingSK}
          handlePageChange={handlePageChangeSK}
        />
      ) : (
        <ListPenelitianKontrakDosen
          penelitian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          handlePageChange={handlePageChangeKontrak}
        />
      )}
    </div>
  );
}
