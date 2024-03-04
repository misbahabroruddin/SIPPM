"use client";

import { usePathname } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Timeline } from "@/components/timeline";
import { RiwayatPenelitianLPPM } from "@/components/riwayat/lppm/riwayat-penelitian-lppm";
import { RiwayatPenelitianReviewer } from "@/components/riwayat/reviewer/riwayat-penelitian-reviewer";
import { useQueryGetRiwayatTrackDosenLPPM } from "@/handlers/lppm/query-get-riwayat-track";
import { useQueryGetRiwayatTrackDosenReviewer } from "@/handlers/reviewer/query-get-riwayat-track";

export default function TrackPenelitianDosenPage() {
  const { data: dataTrackDosenLPPM, isLoading: isLoadingTrackDosenLPPM } =
    useQueryGetRiwayatTrackDosenLPPM();
  const {
    data: dataTrackDosenReviewer,
    isLoading: isLoadingTrackDosenReviewer,
  } = useQueryGetRiwayatTrackDosenReviewer();
  const path = usePathname();
  const pathArr = path.split("/");
  return (
    <div className="flex flex-col gap-4">
      <BasePageTitle
        iconSrc="/icons/search-black.svg"
        title={capitalFirtsLatter(pathArr[2])}
      />
      <Timeline>
        <RiwayatPenelitianReviewer
          data={dataTrackDosenReviewer}
          isLoading={isLoadingTrackDosenReviewer}
        />
        <RiwayatPenelitianLPPM
          data={dataTrackDosenLPPM}
          isLoading={isLoadingTrackDosenLPPM}
        />
      </Timeline>
    </div>
  );
}
