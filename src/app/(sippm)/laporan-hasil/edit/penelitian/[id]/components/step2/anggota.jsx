"use client";

import { useEffect } from "react";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryAnggotaDosenProposal } from "@/handlers/proposal/anggota/query-anggota-dosen";
import { useQueryAnggotaMahasiswaProposal } from "@/handlers/proposal/anggota/query-anggota-mahasiswa";
import { ModalTambahAnggotaLaporanHasil } from "@/components/proposal/laporan-hasil/penelitian/step2/modal-tambah-anggota";
import { TableAnggotaMahasiswaLaporanHasil } from "@/components/proposal/laporan-hasil/penelitian/step2/table-anggota-mahasiswa";
import { TableAnggotaDosenLaporanHasil } from "@/components/proposal/laporan-hasil/penelitian/step2/table-anggota-dosen";

export const Anggota = () => {
  const { currentStep, setCurrentStep } = useStep();

  const {
    data: listAnggotaMahasiswaPenelitian,
    refetch: refetchAnggotaMahasiswaPenelitan,
  } = useQueryAnggotaMahasiswaProposal();

  const {
    data: listAnggotaDosenPenelitian,
    refetch: refetchAnggotaDosenPenelitan,
  } = useQueryAnggotaDosenProposal();

  const handlePrevStep = () => {
    setCurrentStep(1);
    localStorage.setItem("step", 1);
  };

  const handleNextStep = () => {
    setCurrentStep(3);
    localStorage.setItem("step", 3);
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
        <ModalTambahAnggotaLaporanHasil />
      </div>
      <TableAnggotaDosenLaporanHasil data={listAnggotaDosenPenelitian} />
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">
          Identitas Anggota Mahasiswa
        </h1>
      </div>
      <TableAnggotaMahasiswaLaporanHasil
        data={listAnggotaMahasiswaPenelitian}
      />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext onClick={handleNextStep} />
      </div>
    </ContainerContent>
  );
};
