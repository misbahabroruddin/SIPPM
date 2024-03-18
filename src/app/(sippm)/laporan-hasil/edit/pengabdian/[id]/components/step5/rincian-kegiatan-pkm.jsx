"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRincianKegiatanLaporanHasilPKM } from "@/handlers/dosen/laporan-hasil/pengabdian/rincian-kegiatan/query-rincian-kegiatan-pkm";
import { ModalTambahRincianKegiatan } from "./modal-tambah-rincian-kegiatan-pkm";
import { TableRincianKegiatan } from "./table-rincian-kegiatan-pkm";

export const RincianKegiatanPKM = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { data, refetch } = useQueryRincianKegiatanLaporanHasilPKM();

  const handlePrevStep = () => {
    setCurrentStep(4);
  };

  const handleNextStep = () => {
    setCurrentStep(6);
  };

  useEffect(() => {
    refetch();
  }, [data, currentStep]);
  return (
    <ContainerContent className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Rincian Kegiatan</h1>
        <ModalTambahRincianKegiatan />
      </div>
      <TableRincianKegiatan data={data} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext
          onClick={handleNextStep}
          disabled={data?.data?.length === 0}
        />
      </div>
    </ContainerContent>
  );
};
