"use client";

import { useId, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Tabs } from "../tabs";
import { ListPenelitianKontrakLppm } from "../lppm/list-document-kontrak-lppm";
import { ListPenelitianSKLppm } from "../lppm/list-document-sk-lppm";
import { useQueryGetListSKPenelitianLPPM } from "@/handlers/lppm/dokumen/penelitian/sk/query-get-sk-penelitian";
import { useQueryGetListKontrakPenelitianLPPM } from "@/handlers/lppm/dokumen/penelitian/kontrak/query-get-kontrak-penelitian";

export default function DocumentPenelitianLppm() {
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
    "penelitian",
    searchSK,
    pageSK,
  );

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakLppm("penelitian", searchKontrak, pageKontrak);

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
        <ListPenelitianSKLppm
          penelitian={dataSK?.data}
          isLoading={isLoadingSK}
          handlePageChange={handlePageChangeSK}
          key={id}
        />
      ) : (
        <ListPenelitianKontrakLppm
          penelitian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          handlePageChange={handlePageChangeKontrak}
          key={id}
        />
      )}
    </div>
  );
}
