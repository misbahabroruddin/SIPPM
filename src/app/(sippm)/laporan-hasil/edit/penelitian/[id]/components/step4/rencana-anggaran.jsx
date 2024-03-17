"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { TableRencanaAnggaran } from "./table-rencana-anggaran";
import { useStep } from "@/lib/hooks/useStep";
import { ModalTambahRencanaAnggaran } from "./modal-add-rencana-anggaran";
import { useQueryRencanaAnggaranLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/rencana-anggaran/query-rencana-anggaran";

export const RencanaAnggaran = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { data, refetch } = useQueryRencanaAnggaranLaporanHasilPenelitian();

  const handlePrevStep = () => {
    setCurrentStep(3);
  };

  const handleNextStep = () => {
    setCurrentStep(5);
  };

  useEffect(() => {
    refetch();
  }, [data]);
  return (
    <ContainerContent className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Rincian Biaya</h1>
        <ModalTambahRencanaAnggaran />
      </div>
      <TableRencanaAnggaran data={data} />
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
