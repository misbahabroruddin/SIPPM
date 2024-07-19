"use client";

import { usePathname } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Timeline } from "@/components/timeline";
import { TrackDosenReviewer } from "@/components/riwayat/dosen/track-dosen-reviewer";
import { TrackDosenLPPM } from "@/components/riwayat/dosen/track-dosen-lppm";
import { useQueryGetRiwayatVerikasiLPPM } from "@/handlers/lppm/riwayat/query-get-verifikasi-proposal-lppm";
import { useQueryGetRiwayatVerikasiReviewer } from "@/handlers/reviewer/riwayat/query-get-verifikasi-proposal-reviewer";

export default function TrackPenelitianDosenPage() {
  const { data: dataTrackDosenLPPM, isLoading: isLoadingTrackDosenLPPM } =
    useQueryGetRiwayatVerikasiLPPM();
  const {
    data: dataTrackDosenReviewer,
    isLoading: isLoadingTrackDosenReviewer,
  } = useQueryGetRiwayatVerikasiReviewer();
  const path = usePathname();
  const pathArr = path.split("/");
  return (
    <div className="flex flex-col gap-4">
      <BasePageTitle
        iconSrc="/icons/search-black.svg"
        title={capitalFirtsLatter(pathArr[2])}
      />
      <Timeline>
        <TrackDosenReviewer
          data={dataTrackDosenReviewer}
          isLoading={isLoadingTrackDosenReviewer}
        />
        <TrackDosenLPPM
          data={dataTrackDosenLPPM}
          isLoading={isLoadingTrackDosenLPPM}
        />
      </Timeline>
    </div>
  );
}
