"use client";

import { useEffect } from "react";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryAnggotaDosenLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/anggota/query-anggota-dosen-penelitian";
import { useQueryAnggotaMahasiswaLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/anggota/query-anggota-mahasiswa-penelitian";
import { TableAnggotaDosen } from "./table-anggota-dosen";
import { TableAnggotaMahasiswa } from "./table-anggota-mahasiswa";
import { ModalTambahAnggota } from "./modal-tambah-anggota";

export const Anggota = () => {
  const { currentStep, setCurrentStep } = useStep();

  const { listAnggotaMahasiswaPenelitian, refetchAnggotaMahasiswaPenelitan } =
    useQueryAnggotaMahasiswaLaporanHasilPenelitian();

  const { listAnggotaDosenPenelitian, refetchAnggotaDosenPenelitan } =
    useQueryAnggotaDosenLaporanHasilPenelitian();

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(3);
  };

  useEffect(() => {
    refetchAnggotaDosenPenelitan();
    refetchAnggotaMahasiswaPenelitan();
  }, [currentStep]);

  return (
    <ContainerContent className="relative !font-poppins">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">
          Identitas Anggota Dosen
        </h1>
        <ModalTambahAnggota />
      </div>
      <TableAnggotaDosen data={listAnggotaDosenPenelitian} />
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">
          Identitas Anggota Mahasiswa
        </h1>
      </div>
      <TableAnggotaMahasiswa data={listAnggotaMahasiswaPenelitian} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext onClick={handleNextStep} />
      </div>
    </ContainerContent>
  );
};
