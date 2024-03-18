"use client";

import { useEffect } from "react";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { ModalTambahAnggota } from "./modal-tambah-anggota";
import { TableAnggotaMahasiswaPKM } from "./table-anggota-mahasiswa-pkm";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryAnggotaDosenLaporanHasilPKM } from "@/handlers/dosen/laporan-hasil/pengabdian/anggota/query-anggota-dosen-pkm";
import { useQueryAnggotaMahasiswaLaporanHasilPKM } from "@/handlers/dosen/laporan-hasil/pengabdian/anggota/query-anggota-mahasiswa-pkm";
import { TableAnggotaDosenPKM } from "./table-anggota-dosen-pkm";

export const AnggotaPKM = () => {
  const { currentStep, setCurrentStep } = useStep();

  const { listAnggotaDosenPKM, refetchDosen } =
    useQueryAnggotaDosenLaporanHasilPKM();

  const { listAnggotaMahasiswaPKM, refetchMahasiswa } =
    useQueryAnggotaMahasiswaLaporanHasilPKM();

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleNextStep = () => {
    setCurrentStep(3);
  };

  useEffect(() => {
    refetchDosen();
    refetchMahasiswa();
  }, [currentStep]);

  return (
    <ContainerContent className="relative !font-poppins">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">
          Identitas Anggota Dosen
        </h1>
        <ModalTambahAnggota />
      </div>
      <TableAnggotaDosenPKM data={listAnggotaDosenPKM} />
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">
          Identitas Anggota Mahasiswa
        </h1>
      </div>
      <TableAnggotaMahasiswaPKM data={listAnggotaMahasiswaPKM} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext onClick={handleNextStep} />
      </div>
    </ContainerContent>
  );
};
