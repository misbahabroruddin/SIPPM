"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { SelectFilter } from "@/components/select/single-select-filter";

export default function DosenPageLPPM() {
  return (
    <ContainerPage>
      <div className="flex flex-col gap-4">
        <BasePageTitle
          iconSrc="/icons/biodata-black.svg"
          title={"Data Dosen"}
        />
        <div className="flex flex-col gap-4 rounded-lg px-4 py-2 shadow-custom">
          <h1 className="text-lg font-[500]">List Dosen</h1>
          <div className="flex justify-between">
            <SelectFilter />
          </div>
        </div>
      </div>
    </ContainerPage>
  );
}
