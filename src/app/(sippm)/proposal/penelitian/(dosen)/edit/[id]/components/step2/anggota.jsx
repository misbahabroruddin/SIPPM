"use client";

import { useEffect } from "react";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryAnggotaMahasiswaPenelitian } from "@/handlers/dosen/penelitian/anggota/query-anggota-mahasiswa-penelitian";
import { useQueryAnggotaDosenPenelitian } from "@/handlers/dosen/penelitian/anggota/query-anggota-dosen-penelitian";
import { useNextStep } from "@/handlers/step";
import { ModalTambahAnggota } from "@/components/proposal/pengajuan/penelitian/step2/modal-tambah-anggota";
import { TableAnggotaMahasiswa } from "@/components/proposal/pengajuan/penelitian/step2/table-anggota-mahasiswa";
import { TableAnggotaDosen } from "@/components/proposal/pengajuan/penelitian/step2/table-anggota-dosen";

export const Anggota = () => {
  const { currentStep, setCurrentStep } = useStep();

  const { listAnggotaMahasiswaPenelitian, refetchAnggotaMahasiswaPenelitan } =
    useQueryAnggotaMahasiswaPenelitian();

  const { listAnggotaDosenPenelitian, refetchAnggotaDosenPenelitan } =
    useQueryAnggotaDosenPenelitian();

  const { handleNextStep } = useNextStep(3);

  const handlePrevStep = () => {
    setCurrentStep(1);
    localStorage.setItem("step", 1);
    localStorage.setItem("isEdit", true);
  };

  useEffect(() => {
    refetchAnggotaDosenPenelitan();
    refetchAnggotaMahasiswaPenelitan();
  }, [currentStep]);

  return (
    <ContainerContent className="relative !font-poppins">
      <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
        <h1 className="order-2 text-base font-semibold text-primary md:order-none lg:text-lg">
          Identitas Anggota Dosen
        </h1>
        <ModalTambahAnggota />
      </div>
      <TableAnggotaDosen data={listAnggotaDosenPenelitian} />
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-primary lg:text-lg">
          Identitas Anggota Mahasiswa
        </h1>
      </div>
      <TableAnggotaMahasiswa data={listAnggotaMahasiswaPenelitian} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full flex-wrap items-center justify-between gap-2">
        <ButtonPrev
          onClick={handlePrevStep}
          className="w-[120px] lg:w-[200px]"
        />
        <ButtonNext
          onClick={handleNextStep}
          disabled={listAnggotaDosenPenelitian?.data?.length === 0}
          className="w-[120px] lg:w-[200px]"
        />
      </div>
    </ContainerContent>
  );
};
