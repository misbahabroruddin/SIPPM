"use client";

import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Tabs } from "../tabs";
import { ListPengabdianKontrakLppm } from "../lppm/list-document-kontrak-lppm";
import { ListPengabdianSKLppm } from "../lppm/list-document-sk-lppm";
import { useQueryGetListSKLppm } from "@/handlers/dokumen/sk/query-get-sk-lppm";
import { useQueryGetListKontrakLppm } from "@/handlers/dokumen/kontrak/query-get-kontrak-lppm";

export default function DocumentPengabdianLppm() {
  const [tabActive] = useState("SK");
  const [pageSK, setPageSK] = useState(1);
  const [pageKontrak, setPageKontrak] = useState(1);
  const [searchSK] = useState(null);
  const [searchKontrak] = useState(null);
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const id = useId();

  const handlePageChangeSK = (event) => {
    setPageSK(event.selected + 1);
  };
  const handlePageChangeKontrak = (event) => {
    setPageKontrak(event.selected + 1);
  };

  const { data: dataSK, isLoading: isLoadingSK } = useQueryGetListSKLppm(
    "pengabdian",
    searchSK,
    pageSK,
  );

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakLppm("pengabdian", searchKontrak, pageKontrak);

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
        <ListPengabdianSKLppm
          pengabdian={dataSK?.data}
          isLoading={isLoadingSK}
          key={id}
          handlePageChange={handlePageChangeSK}
        />
      ) : (
        <ListPengabdianKontrakLppm
          pengabdian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          handlePageChange={handlePageChangeKontrak}
          key={id}
        />
      )}
    </div>
  );
}
