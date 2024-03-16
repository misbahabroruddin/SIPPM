"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { SectionHeaderDetailProposal } from "../section-header-detail-proposal";
import { Tabs } from "../tabs";
import { useState } from "react";
import { InnerTabs } from "../inner-tabs";
import { DetailIdentitasUsulan } from "../detail-identitas-usulan";
import { DetailAnggota } from "../detail-anggota";
import { DetailTargetCapaian } from "../detail-target-capaian";
import { DetailRencanaAnggaran } from "../detail-rencana-anggaran";
import { DetailRincianKegiatan } from "../detail-rincian-kegiatan";
import { useQueryDetailPengabdianReviewer } from "@/handlers/lppm/pengabdian/query-get-detail-pengabdian-reviewer";
import { DetailBerkasReviewer } from "../detail-berkas-reviewer";
import { Timeline } from "@/components/timeline";
import { TrackRiwayatReviewer } from "@/components/riwayat/reviewer/riwayat-reviewer";
import { TrackRiwayatLPPM } from "@/components/riwayat/lppm/riwayat-lppm";
import { ButtonBeranda } from "@/components/button/button-beranda";
import { useQueryGetRiwayatVerikasiLPPM } from "@/handlers/lppm/riwayat/query-get-verifikasi-proposal-lppm";
import { useQueryGetRiwayatVerikasiReviewer } from "@/handlers/reviewer/riwayat/query-get-verifikasi-proposal-reviewer";

export default function TrackPengabdianReviewerPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");
  const path = usePathname();
  const pathArr = path.split("/");
  const router = useRouter();

  const { data } = useQueryDetailPengabdianReviewer();
  // const { data: dataTrackDosenLPPM, isLoading: isLoadingTrackDosenLPPM } =
  //   useQueryGetRiwayatVerikasiLPPM();
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
              {innerTab === "Berkas" && <DetailBerkasReviewer data={data} />}
            </div>
          </>
        ) : (
          <>
            <Timeline>
              <TrackRiwayatReviewer
                data={dataTrackDosenReviewer}
                isLoading={isLoadingTrackDosenReviewer}
              />
              {/* <TrackRiwayatLPPM
                data={dataTrackDosenLPPM}
                isLoading={isLoadingTrackDosenLPPM}
              /> */}
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
