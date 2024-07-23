"use client";

import { useEffect } from "react";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { ModalTambahAnggotaLaporanHasil } from "@/components/proposal/laporan-hasil/penelitian/step2/modal-tambah-anggota";
import { TableAnggotaDosenLaporanHasil } from "@/components/proposal/laporan-hasil/penelitian/step2/table-anggota-dosen";
import { TableAnggotaMahasiswaLaporanHasil } from "@/components/proposal/laporan-hasil/penelitian/step2/table-anggota-mahasiswa";
import { useQueryAnggotaMahasiswaProposal } from "@/handlers/proposal/anggota/query-anggota-mahasiswa";
import { useQueryAnggotaDosenProposal } from "@/handlers/proposal/anggota/query-anggota-dosen";

export const AnggotaPKM = () => {
  const { currentStep, setCurrentStep } = useStep();

  const { data: listAnggotaDosenPKM, refetch: refetchDosen } =
    useQueryAnggotaDosenProposal();

  const { data: listAnggotaMahasiswaPKM, refetch: refetchMahasiswa } =
    useQueryAnggotaMahasiswaProposal();

  const handlePrevStep = () => {
    setCurrentStep(1);
    localStorage.setItem("step", 1);
  };

  const handleNextStep = () => {
    setCurrentStep(3);
    localStorage.setItem("step", 3);
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
        <ModalTambahAnggotaLaporanHasil />
      </div>
      <TableAnggotaDosenLaporanHasil data={listAnggotaDosenPKM} />
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">
          Identitas Anggota Mahasiswa
        </h1>
      </div>
      <TableAnggotaMahasiswaLaporanHasil data={listAnggotaMahasiswaPKM} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full items-center justify-between">
        <ButtonPrev onClick={handlePrevStep} />
        <ButtonNext onClick={handleNextStep} />
      </div>
    </ContainerContent>
  );
};
