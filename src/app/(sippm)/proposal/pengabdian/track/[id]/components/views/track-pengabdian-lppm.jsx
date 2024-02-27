"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

import { BasePageTitle } from "@/components/base-page-title";
import { capitalFirtsLatter } from "@/lib/utils/capitalizeFirstLetter";
import { Tabs } from "../tabs";
import { InnerTabs } from "../inner-tabs";
import { useQueryDetailPengabdian } from "@/handlers/lppm/pengabdian/query-get-detail-pengabdian";
import { SectionHeaderDetailProposal } from "../section-header-detail-proposal";
import { DetailIdentitasUsulan } from "../detail-identitas-usulan";
import { DetailAnggota } from "../detail-anggota";
import { DetailTargetCapaian } from "../detail-target-capaian";
import { DetailRencanaAnggaran } from "../detail-rencana-anggaran";
import { DetailRincianKegiatan } from "../detail-rincian-kegiatan";
import { DetailBerkas } from "../detail-berkas";

export default function TrackPengabdianLPPMPage() {
  const [tabActive] = useState("dokumen");
  const [innerTabActive] = useState("Identitas Usulan");
  const tabParams = useSearchParams();
  const currentTab = tabParams.get("tab");
  const innerTab = tabParams.get("tab2");
  const path = usePathname();
  const pathArr = path.split("/");

  const { data } = useQueryDetailPengabdian();

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
              {innerTab === "Berkas" && <DetailBerkas data={data} />}
            </div>
          </>
        ) : (
          <>riwayat</>
        )}
      </div>
    </div>
  );
}
