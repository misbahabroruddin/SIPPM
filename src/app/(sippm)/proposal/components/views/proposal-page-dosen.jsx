"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce, useDebouncedCallback } from "use-debounce";

import { BasePageTitle } from "@/components/base-page-title";
import { SearchInput } from "@/components/input/search-input";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Tabs } from "../tabs";
import { ListPengabdian } from "../list-pengabdian";
import { ListPenelitian } from "../list-penelitian";
import { ButtonAdd } from "@/components/button/button-add";
import { ContainerPage } from "@/components/container-page";
import { useQueryGetAllPenelitian } from "@/handlers/dosen/penelitian/query-get-all-penelitian";
import { useQueryGetAllPengabdian } from "@/handlers/dosen/pengabdian/query-get-all-pengabdian";
import { useStep } from "@/lib/hooks/useStep";

export default function ProposalPageDosen() {
  const [tabActive] = useState("penelitian");
  const [pagePenelitian, setPagePenelitian] = useState(1);
  const [pagePengabdian, setPagePengabdian] = useState(1);
  const [searchPenelitian, setSearchPenelitian] = useState("");
  const [searchPengabdian, setSearchPengabdian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const { setCurrentStep } = useStep();

  const handlePageChangePenelitian = (event) => {
    setPagePenelitian(event.selected + 1);
  };
  const handlePageChangePengabdian = (event) => {
    setPagePengabdian(event.selected + 1);
  };

  const debounced = useDebouncedCallback((value) => {
    setSearchPenelitian(value);
    setPagePenelitian(1);
  }, 1000);

  const debouncedSearchPengabdian = useDebouncedCallback((value) => {
    setSearchPengabdian(value);
    setPagePengabdian(1);
  }, 1000);

  const { data: penelitian, isLoading: isLoadingPenelitian } =
    useQueryGetAllPenelitian(searchPenelitian, pagePenelitian);
  const { data: pengabdian, isLoading: isLoadingPengabdian } =
    useQueryGetAllPengabdian(searchPengabdian, pagePengabdian);

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/search-black.svg"
          title={`Proposal - ${capitalFirtsLatter(currentTab || tabActive)}`}
        />
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
                currentTab === "pengabdian"
                  ? searchPengabdian
                  : searchPenelitian
              }
            />
          </div>
          <Link href={`/proposal/${currentTab || tabActive}/tambah`}>
            <ButtonAdd
              disabled={
                penelitian?.data?.find((item) => item.status === "Draft") ||
                pengabdian?.data?.find((item) => item.status === "Draft")
              }
              onClick={() => {
                localStorage.setItem("step", 1);
                localStorage.setItem("isEdit", false);
                localStorage.removeItem("penelitianId");
                localStorage.removeItem("pengabdianId");
                setCurrentStep(1);
              }}
            />
          </Link>
        </div>
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitian
            penelitian={penelitian}
            currentTab={currentTab}
            tabActive={tabActive}
            isLoading={isLoadingPenelitian}
            handlePageChange={handlePageChangePenelitian}
          />
        ) : (
          <ListPengabdian
            pengabdian={pengabdian}
            currentTab={currentTab}
            tabActive={tabActive}
            isLoading={isLoadingPengabdian}
            handlePageChange={handlePageChangePengabdian}
          />
        )}
      </div>
    </ContainerPage>
  );
}
