"use client";

import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Tabs } from "../tabs";
import { ListPenelitianKontrakLppm } from "../lppm/list-document-kontrak-lppm";
import { ListPenelitianSKLppm } from "../lppm/list-document-sk-lppm";
import { useQueryGetListSKPenelitianLPPM } from "@/handlers/lppm/dokumen/penelitian/sk/query-get-sk-penelitian";
import { useQueryGetListKontrakPenelitianLPPM } from "@/handlers/lppm/dokumen/penelitian/kontrak/query-get-kontrak-penelitian";
import { SearchInput } from "@/components/input/search-input";

export default function DocumentPenelitianLppm() {
  const [tabActive] = useState("SK");
  const [pageSKPenelitian, setPageSKPenelitian] = useState(1);
  const [pageKontrakPenelitian, setPageKontrakPenelitian] = useState(1);
  const [searchSKPenelitian, setSKPenelitian] = useState("");
  const [searchKontrakPenelitian, setKontrakPenelitian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const id = useId();

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
    useQueryGetListSKPenelitianLPPM(searchSKPenelitian, pageSKPenelitian);

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakPenelitianLPPM(
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
        <ListPenelitianSKLppm
          penelitian={dataSK?.data}
          isLoading={isLoadingSK}
          handlePageChange={handlePageChangeSKPenelitian}
          key={id}
        />
      ) : (
        <ListPenelitianKontrakLppm
          penelitian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          handlePageChange={handlePageChangeKontrakPenelitian}
          key={id}
        />
      )}
    </div>
  );
}
