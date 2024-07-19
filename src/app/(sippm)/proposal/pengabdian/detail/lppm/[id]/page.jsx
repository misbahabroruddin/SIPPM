"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { ContainerPage } from "@/components/container-page";
import { InnerTabsLppm } from "@/components/proposal/track/inner-tabs-lppm";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { Tabs } from "@/components/proposal/track/tabs";
import { useQueryDetailPengabdian } from "@/handlers/lppm/pengabdian/query-get-detail-pengabdian";
import { useQueryGetRiwayatVerikasiLPPM } from "@/handlers/lppm/riwayat/query-get-verifikasi-proposal-lppm";
import { DetailIdentitasUsulanPengabdian } from "../../components/detail-identitas-usulan-pengabdian";
import { DetailAnggota } from "@/components/proposal/track/detail-anggota";
import { DetailTargetCapaian } from "@/components/proposal/track/track-detail-target-capaian";
import { DetailRencanaAnggaran } from "@/components/proposal/track/detail-rencana-anggaran";
import { DetailRincianKegiatan } from "@/components/proposal/track/detail-rincian-kegiatan";
import { DetailBerkas } from "@/components/proposal/track/detail-berkas";
import { Timeline } from "@material-tailwind/react";
import { TrackRiwayatLPPM } from "@/components/riwayat/lppm/riwayat-lppm";
import { useQueryAnggotaDosenProposal } from "@/handlers/proposal/anggota/query-anggota-dosen";

export default function DetailPengabdianLPPMPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");

  const { data } = useQueryDetailPengabdian();
  const { data: dataAnggotaProposal } = useQueryAnggotaDosenProposal();
  const { data: dataTrackDosenLPPM, isLoading: isLoadingTrackDosenLPPM } =
    useQueryGetRiwayatVerikasiLPPM();

  console.log(dataAnggotaProposal, "<<<<");

  return (
    <ContainerPage>
      <div className="flex flex-col gap-3">
        <BasePageTitle iconSrc="/icons/search-black.svg" title={"Pengabdian"} />
        <SectionHeaderDetailProposal data={data?.data} />
        <Tabs tabActive={currentTab || tabActive} />
        <div className="custom mb-14 flex flex-col gap-3 rounded-lg p-4 shadow-custom">
          {currentTab === "dokumen" || !currentTab ? (
            <>
              <InnerTabsLppm tabActive={innerTab || innerTabActive} />
              <div className="flex flex-col gap-4">
                {(innerTab === "Identitas Usulan" || !innerTab) && (
                  <DetailIdentitasUsulanPengabdian data={data} />
                )}
                {innerTab === "anggota" && (
                  <DetailAnggota data={dataAnggotaProposal} />
                )}
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
