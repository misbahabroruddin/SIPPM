"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ModalRincianKegiatan } from "./modal-rincian-kegiatan";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { TableRincianKegiatan } from "./table-rincian-kegiatan";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRincianKegiatanPenelitian } from "@/handlers/dosen/penelitian/rincian-kegiatan/query-rincian-kegiatan-penelitian";
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
    <ContainerContent className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Rincian Kegiatan</h1>
        <ModalRincianKegiatan />
      </div>
      <TableRincianKegiatan data={rincianKegiatanPenelitian} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext
          onClick={handleNextStep}
          disabled={rincianKegiatanPenelitian?.data?.length === 0}
        />
      </div>
    </ContainerContent>
  );
};
