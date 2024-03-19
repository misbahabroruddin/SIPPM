"use client";

import { toast } from "react-toastify";
import { useEffect } from "react";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { ModalTambahAnggotaDosen } from "./modal-tambah-anggota-dosen";
import { useAxios } from "@/lib/hooks/useAxios";
import { TableAnggotaDosen } from "./table-anggota-dosen";
import { TableAnggotaMahasiswa } from "./table-anggota-mahasiswa";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryAnggotaMahasiswaPenelitian } from "@/handlers/dosen/penelitian/anggota/query-anggota-mahasiswa-penelitian";
import { useQueryAnggotaDosenPenelitian } from "@/handlers/dosen/penelitian/anggota/query-anggota-dosen-penelitian";
import { useNextStep } from "@/handlers/step";

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
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-primary">
          Identitas Anggota Dosen
        </h1>
        <ModalTambahAnggotaDosen />
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
        <ButtonNext
          onClick={handleNextStep}
          disabled={listAnggotaDosenPenelitian?.data?.length === 0}
        />
      </div>
    </ContainerContent>
  );
};
