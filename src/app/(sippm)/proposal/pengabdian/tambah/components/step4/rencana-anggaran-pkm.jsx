"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ModalRencanaAnggaranPKM } from "./modal-rencana-anggaran-pkm";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { TableRencanaAnggaran } from "./table-rencana-anggaran";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRencanaAnggranPKM } from "@/handlers/pengabdian/rencana-anggaran/query-rencana-anggran-pkm";
import { useNextStep } from "@/handlers/step";

export const RencanaAnggaranPKM = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { data, refetch } = useQueryRencanaAnggranPKM();
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
    <ContainerContent className='relative'>
      <div className='flex justify-between items-center'>
        <h1 className='text-primary font-semibold text-lg'>Rincian Biaya</h1>
        <ModalRencanaAnggaranPKM />
      </div>
      <TableRencanaAnggaran data={data} />
      <div className='flex justify-between items-center w-full mt-4 absolute -bottom-16 left-0'>
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext
          onClick={handleNextStepPKM}
          disabled={data?.data?.length === 0}
        />
      </div>
    </ContainerContent>
  );
};
