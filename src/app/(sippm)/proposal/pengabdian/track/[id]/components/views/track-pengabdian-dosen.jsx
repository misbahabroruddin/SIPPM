"use client";

import { usePathname } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { Timeline } from "@/components/timeline";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { TrackDosenLPPM } from "@/components/riwayat/dosen/track-dosen-lppm";
import { TrackDosenReviewer } from "@/components/riwayat/dosen/track-dosen-reviewer";
import { useQueryGetRiwayatTrackDosenLPPM } from "@/handlers/dosen/riwayat/query-get-riwayat-lppm";
import { useQueryGetRiwayatTrackDosenReviewer } from "@/handlers/dosen/riwayat/query-get-riwayat-reviewer";

export default function TrackPengabdianDosenPage() {
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
