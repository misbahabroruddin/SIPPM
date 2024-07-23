"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRincianKegiatanProposal } from "@/handlers/proposal/rincian-kegiatan/query-rincian-kegiatan";
import { TableRincianKegiatanLaporanHasil } from "@/components/proposal/laporan-hasil/penelitian/step5/table-rincian-kegiatan";

export const RincianKegiatanPKM = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { data, refetch } = useQueryRincianKegiatanProposal();

  const handlePrevStep = () => {
    setCurrentStep(4);
    localStorage.setItem("step", 4);
    localStorage.setItem("isEdit", true);
  };

  const handleNextStep = () => {
    setCurrentStep(6);
    localStorage.setItem("step", 6);
  };

  useEffect(() => {
    refetch();
  }, [data, currentStep]);
  return (
    <ContainerContent className="relative">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">Rincian Kegiatan</h1>
      </div>
      <TableRincianKegiatanLaporanHasil data={data} />
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
