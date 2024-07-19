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
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");

  const { data: dataSK, isLoading: isLoadingSK } = useQueryGetListSKDosen();

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakDosen();

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
        />
      ) : (
        <ListPengabdianKontrakDosen
          pengabdian={dataKontrak?.data}
          isLoading={isLoadingKontrak}
        />
      )}
    </div>
  );
}
