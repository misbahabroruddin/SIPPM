"use client";

import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";
// import { useDebouncedCallback } from "use-debounce";

import { Tabs } from "../tabs";
import { ListPengabdianKontrakLppm } from "../lppm/list-document-kontrak-lppm";
import { ListPengabdianSKLppm } from "../lppm/list-document-sk-lppm";
import { useQueryGetListSKPengabdianLPPM } from "@/handlers/lppm/dokumen/pengabdian/sk/query-get-sk-pengabdian";
import { useQueryGetListKontrakPengabdianLPPM } from "@/handlers/lppm/dokumen/pengabdian/kontrak/query-get-kontrak-pengabdian";
// import { SearchInput } from "@/components/input/search-input";

export default function DocumentPengabdianLppm() {
  const [tabActive] = useState("SK");
  const [pageSKPengabdian, setPageSKPengabdian] = useState(1);
  const [pageKontrakPengabdian, setPageKontrakPengabdian] = useState(1);
  const [searchSKPengabdian] = useState("");
  const [searchKontrakPengabdian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const id = useId();

  const handlePageChangeSKPengabdian = (event) => {
    setPageSKPengabdian(event.selected + 1);
  };
  const handlePageChangeKontrakPengabdian = (event) => {
    setPageKontrakPengabdian(event.selected + 1);
  };

  // const handleSearchSKPengabdian = useDebouncedCallback((value) => {
  //   setSKPengabdian(value);
  //   setPageSKPengabdian(1);
  // }, 1000);

  // const handleSearchKontrakPengabdian = useDebouncedCallback((value) => {
  //   setKontrakPengabdian(value);
  //   setPageKontrakPengabdian(1);
  // }, 1000);

  const { data: dataSK, isLoading: isLoadingSK } =
    useQueryGetListSKPengabdianLPPM(searchSKPengabdian, pageSKPengabdian);

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakPengabdianLPPM(
      searchKontrakPengabdian,
      pageKontrakPengabdian,
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs tabActive={currentTab || tabActive} />
          {/* <SearchInput
            onChange={(e) => {
              currentTab === "SK"
                ? handleSearchSKPengabdian(e.target.value)
                : handleSearchKontrakPengabdian(e.target.value);
            }}
            defaultValue={
              currentTab === "SK" ? searchSKPengabdian : searchKontrakPengabdian
            }
          /> */}
        </div>
      </div>
      {currentTab === "SK" || !currentTab ? (
        <ListPengabdianSKLppm
          pengabdian={dataSK?.data}
          isLoading={isLoadingSK}
          handlePageChange={handlePageChangeSKPengabdian}
          key={id}
        />
      ) : (
        <ListPengabdianKontrakLppm
          pengabdian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          handlePageChange={handlePageChangeKontrakPengabdian}
          key={id}
        />
      )}
    </div>
  );
}
