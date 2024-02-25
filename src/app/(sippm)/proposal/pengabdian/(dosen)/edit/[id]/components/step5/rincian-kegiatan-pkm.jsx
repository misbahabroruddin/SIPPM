"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ModalRincianKegiatan } from "./modal-rincian-kegiatan";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { TableRincianKegiatan } from "./table-rincian-kegiatan";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRincianKegiatanPKM } from "@/handlers/dosen/pengabdian/rincian-kegiatan/query-rincian-kegiatan-pkm";
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
    <ContainerContent className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Rincian Kegiatan</h1>
        <ModalRincianKegiatan />
      </div>
      <TableRincianKegiatan data={data} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext
          onClick={handleNextStepPKM}
          disabled={data?.data?.length === 0}
        />
      </div>
    </ContainerContent>
  );
};
