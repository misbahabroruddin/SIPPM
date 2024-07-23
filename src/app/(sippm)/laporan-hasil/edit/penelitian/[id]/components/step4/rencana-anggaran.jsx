"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { useStep } from "@/lib/hooks/useStep";
import { TableRencanaAnggaranLaporanHasil } from "@/components/proposal/laporan-hasil/penelitian/step4/table-rencana-anggaran";
import { useQueryRencanaAnggaran } from "@/handlers/proposal/rencana-anggaran/query-rencana-anggaran";

export const RencanaAnggaran = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { data, refetch } = useQueryRencanaAnggaran();

  const handlePrevStep = () => {
    setCurrentStep(3);
    localStorage.setItem("step", 3);
    localStorage.setItem("isEdit", true);
  };

  const handleNextStep = () => {
    setCurrentStep(5);
    localStorage.setItem("step", 5);
  };

  useEffect(() => {
    refetch();
  }, [data]);
  return (
    <ContainerContent className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Rincian Biaya</h1>
      </div>
      <TableRencanaAnggaranLaporanHasil data={data} />
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
