"use client";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { FormCatatanReviewer } from "@/components/proposal/detail/form-catatan-penilaian-reviewer";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { useQueryDetailPenelitianReviewer } from "@/handlers/reviewer/penelitian/query-get-detail-penelitian-reviewer";

export default function PenilaianPenelitianPage() {
  const { data } = useQueryDetailPenelitianReviewer();
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
