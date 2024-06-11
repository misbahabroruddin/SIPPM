"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { useQueryDetailPenelitian } from "@/handlers/lppm/penelitian/query-get-detail-penelitian";
import { useQueryGetRiwayatVerikasiLPPM } from "@/handlers/lppm/riwayat/query-get-verifikasi-proposal-lppm";
import { BasePageTitle } from "@/components/base-page-title";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { Tabs } from "@/components/proposal/track/tabs";
import { InnerTabsLppm } from "@/components/proposal/track/inner-tabs-lppm";
import { DetailIdentitasUsulanPenelitian } from "../../components/detail-identitas-usulan-penelitian";
import { DetailAnggota } from "@/components/proposal/track/detail-anggota";
import { DetailTargetCapaian } from "@/components/proposal/track/track-detail-target-capaian";
import { DetailRencanaAnggaran } from "@/components/proposal/track/detail-rencana-anggaran";
import { DetailRincianKegiatan } from "@/components/proposal/track/detail-rincian-kegiatan";
import { DetailBerkas } from "@/components/proposal/track/detail-berkas";
import { Timeline } from "@/components/timeline";
import { TrackRiwayatLPPM } from "@/components/riwayat/lppm/riwayat-lppm";
import { ContainerPage } from "@/components/container-page";

export default function DetailPenelitianLPPMPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");

  const { data } = useQueryDetailPenelitian();
  const { data: dataTrackDosenLPPM, isLoading: isLoadingTrackDosenLPPM } =
    useQueryGetRiwayatVerikasiLPPM();

  return (
    <ContainerPage>
      <div className="flex flex-col gap-3">
        <BasePageTitle iconSrc="/icons/search-black.svg" title={"Penelitian"} />
        <SectionHeaderDetailProposal data={data?.data} />
        <Tabs tabActive={currentTab || tabActive} />
        <div className="custom mb-14 flex flex-col gap-3 rounded-lg px-2 py-3 shadow-custom lg:p-4">
          {currentTab === "dokumen" || !currentTab ? (
            <>
              <InnerTabsLppm tabActive={innerTab || innerTabActive} />
              <div className="flex flex-col gap-4">
                {(innerTab === "Identitas Usulan" || !innerTab) && (
                  <DetailIdentitasUsulanPenelitian data={data} />
                )}
                {innerTab === "anggota" && <DetailAnggota data={data} />}
                {innerTab === "Luaran dan Target Capaian" && (
                  <DetailTargetCapaian data={data} />
                )}
                {innerTab === "Rencana Anggaran" && (
                  <DetailRencanaAnggaran data={data} />
                )}
                {innerTab === "Jadwal" && <DetailRincianKegiatan data={data} />}
                {innerTab === "Berkas" && <DetailBerkas data={data} />}
              </div>
            </>
          ) : (
            <Timeline>
              <TrackRiwayatLPPM
                data={dataTrackDosenLPPM}
                isLoading={isLoadingTrackDosenLPPM}
              />
            </Timeline>
          )}
        </div>
      </div>
    </ContainerPage>
  );
}
