"use client";

import { useEffect } from "react";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { ModalTambahAnggotaDosen } from "./modal-tambah-anggota-dosen";
import { useAxios } from "@/lib/hooks/useAxios";
import { TableAnggotaDosenPKM } from "./table-anggota-dosen-pkm";
import { TableAnggotaMahasiswaPKM } from "./table-anggota-mahasiswa-pkm";
import { useStep } from "@/lib/hooks/useStep";
import { useQueryAnggotaDosenPKM } from "@/handlers/dosen/pengabdian/anggota/query-anggota-dosen-pkm";
import { useQueryAnggotaMahasiswaPKM } from "@/handlers/dosen/pengabdian/anggota/query-anggota-mahasiswa-pkm";
import { useNextStep } from "@/handlers/step";

export const AnggotaPKM = () => {
  const { currentStep, setCurrentStep } = useStep();
  const axios = useAxios();
  const { handleNextStepPKM } = useNextStep(3);

  const { listAnggotaDosenPKM, refetchDosen } = useQueryAnggotaDosenPKM();

  const { listAnggotaMahasiswaPKM, refetchMahasiswa } =
    useQueryAnggotaMahasiswaPKM();

  const handlePrevStep = () => {
    setCurrentStep(1);
    localStorage.setItem("step", 1);
    localStorage.setItem("isEdit", true);
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
        <ModalTambahAnggotaDosen />
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
        <ButtonNext
          onClick={handleNextStepPKM}
          disabled={listAnggotaDosenPKM?.data.length === 0}
        />
      </div>
    </ContainerContent>
  );
};
