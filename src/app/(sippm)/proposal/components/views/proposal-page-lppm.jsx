"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { Tabs } from "../tabs";
import { SearchInput } from "@/components/input/search-input";
import { useDebouncedCallback } from "use-debounce";
import { ListPenelitianProposalLPPM } from "../list-penelitian-lppm";
import { ListPengabdianProposalLPPM } from "../list-pengabdian-lppm";

export default function ProposalPageLPPM() {
  const [tabActive] = useState("penelitian");
  const [searchPenelitian, setSearchPenelitian] = useState("");
  const [searchPengabdian, setSearchPengabdian] = useState("");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const debounced = useDebouncedCallback((value) => {
    setSearchPenelitian(value);
  }, 1000);
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle iconSrc="/icons/search-black.svg" title="Proposal" />
        <div className="flex justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <Tabs tabActive={currentTab || tabActive} />
            <SearchInput
              onChange={(e) => {
                currentTab === "pengabdian"
                  ? setSearchPengabdian(e.target.value)
                  : debounced(e.target.value);
              }}
              defaultValue={
                currentTab === "pengabdian"
                  ? searchPengabdian
                  : searchPenelitian
              }
            />
          </div>
        </div>
        {currentTab === "penelitian" || !currentTab ? (
          <ListPenelitianProposalLPPM />
        ) : (
          <ListPengabdianProposalLPPM />
        )}
      </div>
    </ContainerPage>
  );
}
