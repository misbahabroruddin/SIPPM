"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ModalRincianKegiatan } from "./modal-rincian-kegiatan";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { TableRincianKegiatan } from "./table-rincian-kegiatan";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRincianKegiatanPenelitian } from "@/handlers/penelitian/rincian-kegiatan/query-rincian-kegiatan-penelitian";
import { useNextStep } from "@/handlers/step";

export const RincianKegiatan = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { rincianKegiatanPenelitian, refetchRincianKegiatanPenelitian } =
    useQueryRincianKegiatanPenelitian();
  const { handleNextStep } = useNextStep(6);
  const handlePrevStep = () => {
    setCurrentStep(4);
    localStorage.setItem("step", 4);
    localStorage.setItem("isEdit", true);
  };

  useEffect(() => {
    const isEdit = JSON.parse(localStorage.getItem("isEdit"));
    if (currentStep === 5 && isEdit === true) {
      refetchRincianKegiatanPenelitian();
    }
  }, [currentStep]);
  return (
    <ContainerContent className='relative'>
      <div className='flex justify-between items-center'>
        <h1 className='text-primary font-semibold text-lg'>Rincian Kegiatan</h1>
        <ModalRincianKegiatan />
      </div>
      <TableRincianKegiatan data={rincianKegiatanPenelitian} />
      <div className='flex justify-between items-center w-full mt-4 absolute -bottom-16 left-0'>
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext
          onClick={handleNextStep}
          disabled={rincianKegiatanPenelitian?.data?.length === 0}
        />
      </div>
    </ContainerContent>
  );
};
