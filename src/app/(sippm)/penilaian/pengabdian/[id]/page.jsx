"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { PenilaianDosen } from "@/components/proposal/detail/penilaian-dosen";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { useQueryDetailPengabdian } from "@/handlers/lppm/pengabdian/query-get-detail-pengabdian";

export default function DetailPenilaianPengabdianPage() {
  const { data } = useQueryDetailPengabdian();

  return (
    <ContainerPage>
      <div className="flex flex-col gap-2 lg:gap-4">
        <BasePageTitle iconSrc="/icons/search-black.svg" title="Pengabdian" />
        <SectionHeaderDetailProposal data={data?.data} />
        <PenilaianDosen />
      </div>
    </ContainerPage>
  );
}
