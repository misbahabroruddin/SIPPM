"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Tabs } from "../tabs";
import { useState } from "react";
import { InnerTabs } from "../inner-tabs";
import { useQueryDetailPenelitian } from "@/handlers/lppm/penelitian/query-get-detail-penelitian";
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

export default function TrackPenelitianLPPMPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");
  const path = usePathname();
  const pathArr = path.split("/");

  const { data } = useQueryDetailPenelitian();
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
      <div className="custom mb-14 flex flex-col gap-3 rounded-lg px-2 py-3 shadow-custom lg:p-4">
        {currentTab === "dokumen" || !currentTab ? (
          <>
            <InnerTabs tabActive={innerTab || innerTabActive} />
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
