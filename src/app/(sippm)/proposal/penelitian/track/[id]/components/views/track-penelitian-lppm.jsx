"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { SectionHeaderDetailProposal } from "../section-header-detail-proposal";
import { Tabs } from "../tabs";
import { useState } from "react";
import { InnerTabs } from "../inner-tabs";

export default function TrackPenelitianLPPMPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");
  const path = usePathname();
  const pathArr = path.split("/");

  return (
    <div className="flex flex-col gap-4">
      <BasePageTitle
        iconSrc="/icons/search-black.svg"
        title={capitalFirtsLatter(pathArr[2])}
      />
      <SectionHeaderDetailProposal />
      <Tabs tabActive={currentTab || tabActive} />
      <div className="custom flex flex-col gap-4 rounded-lg p-4 shadow-custom">
        <InnerTabs tabActive={innerTab || innerTabActive} />
        <div className="flex flex-col gap-4">
          {(innerTab === "Identitas Usulan" || !innerTab) && (
            <>Identitas usulan</>
          )}
          {innerTab === "anggota" && <>anggota</>}
          {innerTab === "Luaran dan Target Capaian" && <>dokumen</>}
          {innerTab === "Rencana Anggaran" && <>Rencana Anggaran</>}
          {innerTab === "Jadwal" && <>Jadwal</>}
          {innerTab === "Berkas" && <>Berkas</>}
        </div>
      </div>
    </div>
  );
}
