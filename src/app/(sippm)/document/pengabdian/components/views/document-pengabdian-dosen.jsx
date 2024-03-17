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
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");

  const { data: dataSK, isLoading: isLoadingSK } =
    useQueryGetListSKPengabdianDosen();

  const { data: dataKontrak, isLoading: isLoadingKontrak } =
    useQueryGetListKontrakPengabdianDosen();

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
