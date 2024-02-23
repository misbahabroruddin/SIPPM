"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ModalRincianKegiatan } from "./modal-rincian-kegiatan";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { TableRincianKegiatan } from "./table-rincian-kegiatan";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRincianKegiatanPKM } from "@/handlers/pengabdian/rincian-kegiatan/query-rincian-kegiatan-pkm";
import { useNextStep } from "@/handlers/step";

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
    <ContainerContent className='relative'>
      <div className='flex justify-between items-center'>
        <h1 className='text-primary font-semibold text-lg'>Rincian Kegiatan</h1>
        <ModalRincianKegiatan />
      </div>
      <TableRincianKegiatan data={data} />
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
