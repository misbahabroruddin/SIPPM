"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Tabs } from "../tabs";
import { useState } from "react";
import { DetailIdentitasUsulan } from "../detail-identitas-usulan";
import { Timeline } from "@/components/timeline";
import { TrackRiwayatReviewer } from "@/components/riwayat/reviewer/riwayat-reviewer";
import { ButtonBeranda } from "@/components/button/button-beranda";
import { useQueryGetRiwayatVerikasiReviewer } from "@/handlers/reviewer/riwayat/query-get-verifikasi-proposal-reviewer";
import { useQueryDetailPenelitianReviewer } from "@/handlers/reviewer/penelitian/query-get-detail-penelitian-reviewer";
import { useQueryGetRiwayatVerikasiReviewerLppm } from "@/handlers/reviewer/riwayat/query-get-verifikasi-proposal-reviewer-lppm";
import { TrackRiwayatReviewerLPPM } from "@/components/riwayat/reviewer/riwayat-reviewer-lppm";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { DetailTargetCapaian } from "@/components/proposal/track/track-detail-target-capaian";
import { DetailRencanaAnggaran } from "@/components/proposal/track/detail-rencana-anggaran";
import { DetailRincianKegiatan } from "@/components/proposal/track/detail-rincian-kegiatan";
import { DetailBerkasReviewer } from "@/components/proposal/track/detail-berkas-reviewer";
import { DetailAnggota } from "@/components/proposal/track/detail-anggota";
import { DetailPenilaianReviewer } from "@/components/proposal/track/detail-penilaian";
import { InnerTabsReviewer } from "../inner-tabs-reviewer";

export default function TrackPenelitianReviewerPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");
  const path = usePathname();
  const pathArr = path.split("/");
  const router = useRouter();

  const { data } = useQueryDetailPenelitianReviewer();
  const { data: dataTrackDosenLPPM, isLoading: isLoadingTrackDosenLPPM } =
    useQueryGetRiwayatVerikasiReviewerLppm();
  const {
    data: dataTrackDosenReviewer,
    isLoading: isLoadingTrackDosenReviewer,
  } = useQueryGetRiwayatVerikasiReviewer();

  return (
    <div className="flex flex-col gap-3">
      <BasePageTitle
        iconSrc="/icons/search-black.svg"
        title={capitalFirtsLatter(pathArr[2])}
      />
      <SectionHeaderDetailProposal data={data?.data} />
      <Tabs tabActive={currentTab || tabActive} />
      <div className="custom mb-14 flex flex-col gap-3 rounded-lg p-4 shadow-custom">
        {currentTab === "dokumen" || !currentTab ? (
          <>
            <InnerTabsReviewer tabActive={innerTab || innerTabActive} />
            <div className="flex flex-col gap-4">
              {(innerTab === "Identitas Usulan" || !innerTab) && (
                <DetailIdentitasUsulan data={data} />
              )}
              {innerTab === "anggota" && <DetailAnggota data={data} />}
              {innerTab === "Luaran dan Target Capaian" && (
                <DetailTargetCapaian data={data} />
              )}
              {innerTab === "Rencana Anggaran" && (
                <DetailRencanaAnggaran data={data} />
              )}
              {innerTab === "Jadwal" && <DetailRincianKegiatan data={data} />}
              {innerTab === "Berkas" && <DetailBerkasReviewer data={data} />}
              {innerTab === "Penilaian" && (
                <DetailPenilaianReviewer data={data} />
              )}
            </div>
          </>
        ) : (
          <>
            <Timeline>
              <TrackRiwayatReviewer
                data={dataTrackDosenReviewer}
                isLoading={isLoadingTrackDosenReviewer}
              />
              <TrackRiwayatReviewerLPPM
                data={dataTrackDosenLPPM}
                isLoading={isLoadingTrackDosenLPPM}
              />
            </Timeline>
            <ButtonBeranda
              className="ml-auto w-fit px-8"
              onClick={() => router.push("/dashboard")}
            />
          </>
        )}
      </div>
    </div>
  );
}
