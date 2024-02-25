"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ModalRencanaAnggaran } from "./modal-rencana-anggaran";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { TableRencanaAnggaran } from "./table-rencana-anggaran";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRencanaAnggaranPenelitian } from "@/handlers/dosen/penelitian/rencana-anggaran/query-rencana-anggaran";
import { useNextStep } from "@/handlers/step";

export const RencanaAnggaran = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { data, refetch } = useQueryRencanaAnggaranPenelitian();
  const { handleNextStep } = useNextStep(5);

  const handlePrevStep = () => {
    setCurrentStep(3);
    localStorage.setItem("step", 3);
    localStorage.setItem("isEdit", true);
  };

  useEffect(() => {
    const isEdit = JSON.parse(localStorage.getItem("isEdit"));
    if (currentStep === 4 && isEdit === true) {
      refetch();
    }
  }, [currentStep]);
  return (
    <ContainerContent className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Rincian Biaya</h1>
        <ModalRencanaAnggaran />
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
