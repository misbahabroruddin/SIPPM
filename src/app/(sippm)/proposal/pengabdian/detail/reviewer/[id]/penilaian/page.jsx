"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { FormCatatanReviewer } from "@/components/proposal/detail/form-catatan-penilaian-reviewer";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { useQueryDetailPengabdian } from "@/handlers/reviewer/pengabdian/query-get-detail-pengabdian";

export default function PenilaianPengabdianPage() {
  const { data } = useQueryDetailPengabdian();
  return (
    <ContainerPage>
      <div className="flex flex-col gap-2 lg:gap-4">
        <BasePageTitle iconSrc="/icons/search-black.svg" title="Penelitian" />
        <SectionHeaderDetailProposal data={data?.data} />
        <FormCatatanReviewer />
      </div>
    </ContainerPage>
  );
}
