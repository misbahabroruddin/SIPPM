"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRincianKegiatanPKM } from "@/handlers/dosen/pengabdian/rincian-kegiatan/query-rincian-kegiatan-pkm";
import { useNextStep } from "@/handlers/step";
import { ModalTambahRincianKegiatan } from "@/components/proposal/pengajuan/pengabdian/step5/modal-tambah-rincian-kegiatan";
import { TableRincianKegiatan } from "@/components/proposal/pengajuan/pengabdian/step5/table-rincian-kegiatan";

export const RincianKegiatanPKM = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { data, refetch } = useQueryRincianKegiatanPKM();
  const { handleNextStepPKM } = useNextStep(6);

  const handlePrevStep = () => {
    setCurrentStep(4);
    localStorage.setItem("step", 4);
    localStorage.setItem("isEdit", true);
  };

  useEffect(() => {
    refetch();
  }, [currentStep]);
  return (
    <ContainerContent className="relative">
      <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
        <h1 className="order-2 text-base font-semibold text-primary md:order-none lg:text-lg">
          Rincian Kegiatan
        </h1>
        <ModalTambahRincianKegiatan />
      </div>
      <TableRincianKegiatan data={data} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
        <ButtonPrev
          onClick={handlePrevStep}
          className="w-[120px] lg:w-[200px]"
        />
        <ButtonNext
          onClick={handleNextStepPKM}
          disabled={data?.data?.length === 0}
          className="w-[120px] lg:w-[200px]"
        />
      </div>
    </ContainerContent>
  );
};
