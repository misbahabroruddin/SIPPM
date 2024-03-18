"use client";

import { useEffect } from "react";

import { ContainerContent } from "@/components/container-content";
import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryRencanaAnggranPKM } from "@/handlers/dosen/pengabdian/rencana-anggaran/query-rencana-anggran-pkm";
import { TableRencanaAnggaran } from "./table-rencana-anggaran-pkm";
import { ModalTambahRencanaAnggaranPKM } from "./modal-tambah-rencana-anggaran-pkm";
import { useQueryRencanaAnggranLaporanHasilPKM } from "@/handlers/dosen/laporan-hasil/pengabdian/rencana-anggaran/query-rencana-anggaran-pkm";

export const RencanaAnggaranPKM = () => {
  const { setCurrentStep } = useStep();
  const { data, refetch } = useQueryRencanaAnggranLaporanHasilPKM();

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
        <ModalTambahRencanaAnggaranPKM />
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
