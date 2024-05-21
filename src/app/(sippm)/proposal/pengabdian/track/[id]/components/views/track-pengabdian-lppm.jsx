"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { useQueryDetailPengabdian } from "@/handlers/lppm/pengabdian/query-get-detail-pengabdian";
import { DetailIdentitasUsulan } from "../detail-identitas-usulan";
import { Timeline } from "@/components/timeline";
import { TrackRiwayatLPPM } from "@/components/riwayat/lppm/riwayat-lppm";
import { useQueryGetRiwayatVerikasiLPPM } from "@/handlers/lppm/riwayat/query-get-verifikasi-proposal-lppm";
import { SectionHeaderDetailProposal } from "@/components/proposal/track/section-header-detail-proposal";
import { DetailTargetCapaian } from "@/components/proposal/track/track-detail-target-capaian";
import { DetailRencanaAnggaran } from "@/components/proposal/track/detail-rencana-anggaran";
import { DetailRincianKegiatan } from "@/components/proposal/track/detail-rincian-kegiatan";
import { DetailBerkas } from "@/components/proposal/track/detail-berkas";
import { DetailAnggota } from "@/components/proposal/track/detail-anggota";
import { InnerTabsLppm } from "@/components/proposal/track/inner-tabs-lppm";
import { Tabs } from "@/components/proposal/track/tabs";

export default function TrackPengabdianLPPMPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");
  const path = usePathname();
  const pathArr = path.split("/");

  const { data } = useQueryDetailPengabdian();
  const { data: dataTrackDosenLPPM, isLoading: isLoadingTrackDosenLPPM } =
    useQueryGetRiwayatVerikasiLPPM();

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
            <InnerTabsLppm tabActive={innerTab || innerTabActive} />
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
  );
}
