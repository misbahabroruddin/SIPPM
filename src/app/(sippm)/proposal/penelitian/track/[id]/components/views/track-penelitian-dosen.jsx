"use client";

import { usePathname } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Timeline } from "@/components/timeline";
import { RiwayatPenelitianLPPM } from "@/components/riwayat/penelitian/lppm/riwayat-penelitian-lppm";
import { RiwayatPenelitianReviewer } from "@/components/riwayat/penelitian/reviewer/riwayat-penelitian-reviewer";

export default function TrackPenelitianDosenPage() {
  const path = usePathname();
  const pathArr = path.split("/");
  return (
    <div className="flex flex-col gap-4">
      <BasePageTitle
        iconSrc="/icons/search-black.svg"
        title={capitalFirtsLatter(pathArr[2])}
      />
      <Timeline>
        <RiwayatPenelitianReviewer />
        <RiwayatPenelitianLPPM />
      </Timeline>
    </div>
  );
}
