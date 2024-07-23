"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { PenilaianDosen } from "@/components/proposal/detail/penilaian-dosen";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { useQueryDetailPenelitian } from "@/handlers/lppm/penelitian/query-get-detail-penelitian";
import { useEffect } from "react";

export default function DetailPenilaianPenelitianPage() {
  const { data, refetch } = useQueryDetailPenelitian();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <ContainerPage>
      <div className="flex flex-col gap-2 lg:gap-4">
        <BasePageTitle iconSrc="/icons/search-black.svg" title="Penelitian" />
        <SectionHeaderDetailProposal data={data?.data} />
        <PenilaianDosen />
      </div>
    </ContainerPage>
  );
}
