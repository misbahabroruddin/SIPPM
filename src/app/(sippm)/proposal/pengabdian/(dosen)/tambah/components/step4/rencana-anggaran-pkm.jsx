"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { useStep } from "@/lib/hooks/useStep";
import { useNextStep } from "@/handlers/step";
import { TableRencanaAnggaran } from "@/components/proposal/pengajuan/pengabdian/step4/table-rencana-anggaran";
import { useQueryRencanaAnggaran } from "@/handlers/dosen/proposal/rencana-anggaran/query-rencana-anggaran";

export const RencanaAnggaranPKM = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { data, refetch } = useQueryRencanaAnggaran();
  const { handleNextStepPKM } = useNextStep(5);

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
      <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
        <h1 className="order-2 text-base font-semibold text-primary md:order-none lg:text-lg">
          Rincian Biaya
        </h1>
      </div>
      <TableRencanaAnggaran data={data} />
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
