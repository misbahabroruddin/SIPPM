"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

import { BasePageTitle } from "@/components/base-page-title";
import { SearchInput } from "@/components/input/search-input";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Tabs } from "../tabs";
import { ListPengabdian } from "../list-pengabdian";
import { ListPenelitianAdministrator } from "../list-penelitian-administrator";
import { ButtonAdd } from "@/components/button/button-add";
import { ContainerPage } from "@/components/container-page";
import { useQueryGetAllPenelitian } from "@/handlers/dosen/penelitian/query-get-all-penelitian";
import { useQueryGetAllPengabdian } from "@/handlers/dosen/pengabdian/query-get-all-pengabdian";
import { useStep } from "@/lib/hooks/useStep";
import { ListPengabdianAdministrator } from "../list-pengabdian-administrator";
import { useQueryGetPenelitianAdmin } from "@/handlers/admin-sippm/proposal/query-get-penelitian";
import { useQueryGetPengabdianAdmin } from "@/handlers/admin-sippm/proposal/query-get-pengabdian";

export default function ProposalPageAdministrator() {
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

  const {
    data: penelitian,
    isLoading: isLoadingPenelitian,
    refetch: refecthPenelitian,
  } = useQueryGetPenelitianAdmin(searchPenelitian, pagePenelitian);

  const {
    data: pengabdian,
    isLoading: isLoadingPengabdian,
    refetch: refecthPengabdian,
  } = useQueryGetPengabdianAdmin(searchPengabdian, pagePengabdian);

  // const pengabdianDraft = pengabdian?.data.filter(
  //   (proposal) => proposal.status === "Draft",
  // );
  // const penelitianDraft = penelitian?.data.filter(
  //   (proposal) => proposal.status === "Draft",
  // );

  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/search-black.svg"
          title={`Proposal - ${capitalFirtsLatter(currentTab || tabActive)}`}
        />
        <div className="flex flex-col justify-between gap-2 lg:flex-row">
          <div className="flex flex-wrap items-center justify-between gap-2 lg:justify-start lg:gap-4">
            <Tabs
              tabActive={currentTab || tabActive}
              // penelitianDraft={penelitianDraft}
              // pengabdianDraft={pengabdianDraft}
            />
          </div>
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
          {/* <Link href={`/proposal/${currentTab || tabActive}/tambah`}>
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
              className="w-full justify-center lg:w-fit"
            />
          </Link> */}
        </div>
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitianAdministrator
            penelitian={penelitian}
            currentTab={currentTab}
            tabActive={tabActive}
            isLoading={isLoadingPenelitian}
            handlePageChange={handlePageChangePenelitian}
            refetch={refecthPenelitian}
          />
        ) : (
          <ListPengabdianAdministrator
            pengabdian={pengabdian}
            currentTab={currentTab}
            tabActive={tabActive}
            isLoading={isLoadingPengabdian}
            handlePageChange={handlePageChangePengabdian}
            refetch={refecthPengabdian}
          />
        )}
      </div>
    </ContainerPage>
  );
}