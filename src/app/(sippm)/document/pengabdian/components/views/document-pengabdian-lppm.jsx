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
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const id = useId();

  const { data: dataSK, isLoading: isLoadingSK } = useQueryGetListSKLppm();

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakLppm();

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
        />
      ) : (
        <ListPengabdianKontrakLppm
          pengabdian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
          key={id}
        />
      )}
    </div>
  );
}
