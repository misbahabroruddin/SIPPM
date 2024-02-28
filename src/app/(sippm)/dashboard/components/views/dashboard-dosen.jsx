"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { SearchInput } from "@/components/input/search-input";
import { Tabs } from "../tabs";
import { ListPenelitian } from "../list-penelitian-dashboard-dosen";
import { useQueryGetAllPenelitian } from "@/handlers/dosen/penelitian/query-get-all-penelitian";
import { useQueryGetAllPengabdian } from "@/handlers/dosen/pengabdian/query-get-all-pengabdian";
import ListCardPenelitianDashboardDosen from "../list-card-penelitian-dashboard-dosen";
import ListCardPengabdianDashboardDosen from "../list-card-pengabdian-dashboard-dosen";
import { ListPengabdian } from "../list-pengabdian-dashboard-dosen";

export default function DashboardDosen() {
  const [tabActive] = useState("penelitian");
  const [searchPenelitian, setSearchPenelitian] = useState("");
  const [searchPengabdian, setSearchPengabdian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const debounced = useDebouncedCallback((value) => {
    setSearchPenelitian(value);
  }, 1000);
  const debouncedSearchPengabdian = useDebouncedCallback((value) => {
    setSearchPengabdian(value);
  }, 1000);

  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetAllPenelitian(searchPenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetAllPengabdian(searchPengabdian);

  const dataPenelitianRevisiDraft = penelitian?.filter(
    (item) =>
      item.status_lppm === "Revisi" ||
      item.status === "Draft" ||
      item.status_lppm === "Ditolak",
  );

  const dataPengabdianRevisiDraft = pengabdian?.filter(
    (item) =>
      item.status_lppm === "Revisi" ||
      item.status === "Draft" ||
      item.status_lppm === "Ditolak",
  );

  const totalProposalPenelitian = penelitian?.filter(
    (item) => item.status !== "Draft",
  );

  const totalPenelitianDisetujui = penelitian?.filter(
    (item) => item.status_lppm === "Diterima",
  );

  const totalPenelitianDitolak = penelitian?.filter(
    (item) => item.status_lppm === "Ditolak",
  );

  const totalPengabdianDisetujui = pengabdian?.filter(
    (item) => item.status_lppm === "Diterima",
  );

  const totalPengabdianDitolak = pengabdian?.filter(
    (item) => item.status_lppm === "Ditolak",
  );

  const totalProposalPengabdian = pengabdian?.filter(
    (item) => item.status !== "Draft",
  );

  return (
    <div className="flex flex-col gap-4">
      {currentTab === "penelitian" || !currentTab ? (
        <ListCardPenelitianDashboardDosen
          jumlahPenelitian={totalProposalPenelitian}
          jumlahPenelitianDisetujui={totalPenelitianDisetujui}
          jumlahPenelitianDitolak={totalPenelitianDitolak}
        />
      ) : (
        <ListCardPengabdianDashboardDosen
          jumlahPengabdian={totalProposalPengabdian}
          jumlahPengabdianDisetujui={totalPengabdianDisetujui}
          jumlahPengabdianDitolak={totalPengabdianDitolak}
        />
      )}
      <div className="flex justify-between">
        <div className="flex items-center gap-2 lg:gap-4">
          <Tabs
            tabActive={currentTab || tabActive}
            setSearch={setSearchPenelitian}
          />
          <SearchInput
            onChange={(e) => {
              currentTab === "pengabdian"
                ? debouncedSearchPengabdian(e.target.value)
                : debounced(e.target.value);
            }}
            defaultValue={
              currentTab === "pengabdian" ? searchPengabdian : searchPenelitian
            }
          />
        </div>
      </div>
      <div className="max-h-[700px] overflow-auto p-[2px]">
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitian
            penelitian={dataPenelitianRevisiDraft}
            currentTab={currentTab}
            tabActive={tabActive}
            isLoading={isLoadingPenelitian}
          />
        ) : (
          <ListPengabdian
            pengabdian={dataPengabdianRevisiDraft}
            currentTab={currentTab}
            tabActive={tabActive}
            isLoading={isLoadingPengabdian}
          />
        )}
      </div>
    </div>
  );
}
