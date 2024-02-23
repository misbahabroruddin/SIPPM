"use client";
import { usePathname } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Timeline } from "@/components/timeline";
import { RiwayatPengabdianLPPM } from "@/components/riwayat/pengabdian/lppm/riwayat-pengabdian-lppm";
import { RiwayatPengabdianReviewer } from "@/components/riwayat/pengabdian/reviewer/riwayat-pengabdian-reviewer";

export default function PageTrackProposal({ params }) {
  const path = usePathname();
  const pathArr = path.split("/");

  return (
    <ContainerPage>
      <div className='flex flex-col gap-4'>
        <BasePageTitle
          iconSrc='/icons/search-black.svg'
          title={capitalFirtsLatter(pathArr[2])}
        />
        <Timeline>
          <RiwayatPengabdianLPPM />
          <RiwayatPengabdianReviewer />
        </Timeline>
      </div>
    </ContainerPage>
  );
}
