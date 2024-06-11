"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { Tabs } from "@/components/proposal/track/tabs";
import { InnerTabsReviewer } from "@/components/proposal/track/inner-tabs-reviewer";
import { DetailIdentitasUsulanPengabdian } from "../../components/detail-identitas-usulan-pengabdian";
import { DetailTargetCapaian } from "@/components/proposal/track/track-detail-target-capaian";
import { DetailRencanaAnggaran } from "@/components/proposal/track/detail-rencana-anggaran";
import { DetailRincianKegiatan } from "@/components/proposal/track/detail-rincian-kegiatan";
import { DetailBerkasReviewer } from "@/components/proposal/track/detail-berkas-reviewer";
import { DetailPenilaianReviewer } from "@/components/proposal/track/detail-penilaian";
import { Timeline } from "@/components/timeline";
import { TrackRiwayatReviewer } from "@/components/riwayat/reviewer/riwayat-reviewer";
import { TrackRiwayatReviewerLPPM } from "@/components/riwayat/reviewer/riwayat-reviewer-lppm";
import { ButtonBeranda } from "@/components/button/button-beranda";
import { useQueryDetailPengabdianReviewer } from "@/handlers/lppm/pengabdian/query-get-detail-pengabdian-reviewer";
import { useQueryGetRiwayatVerikasiReviewerLppm } from "@/handlers/reviewer/riwayat/query-get-verifikasi-proposal-reviewer-lppm";
import { useQueryGetRiwayatVerikasiReviewer } from "@/handlers/reviewer/riwayat/query-get-verifikasi-proposal-reviewer";
import { DetailAnggota } from "@/components/proposal/track/detail-anggota";

export default function DetailPengabdianPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");
  const router = useRouter();

  const { data } = useQueryDetailPengabdianReviewer();

  const { data: dataTrackDosenLPPM, isLoading: isLoadingTrackDosenLPPM } =
    useQueryGetRiwayatVerikasiReviewerLppm();

  const {
    data: dataTrackDosenReviewer,
    isLoading: isLoadingTrackDosenReviewer,
  } = useQueryGetRiwayatVerikasiReviewer();

  return (
    <ContainerPage>
      <div className="flex flex-col gap-3">
        <BasePageTitle iconSrc="/icons/search-black.svg" title={"Pengabdian"} />
        <SectionHeaderDetailProposal data={data?.data} />
        <Tabs tabActive={currentTab || tabActive} />
        <div className="custom mb-14 flex flex-col gap-3 rounded-lg p-4 shadow-custom">
          {currentTab === "dokumen" || !currentTab ? (
            <>
              <InnerTabsReviewer tabActive={innerTab || innerTabActive} />
              <div className="flex flex-col gap-4">
                {(innerTab === "Identitas Usulan" || !innerTab) && (
                  <DetailIdentitasUsulanPengabdian data={data} />
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
    </ContainerPage>
  );
}
