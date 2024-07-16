"use client";

import { useEffect } from "react";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonNext } from "@/components/button/button-next";
import { ContainerContent } from "@/components/container-content";
import { useStep } from "@/lib/hooks/useStep";
import { useNextStep } from "@/handlers/step";
import { ModalTambahAnggota } from "@/components/proposal/pengajuan/pengabdian/step2/modal-tambah-anggota";
import { TableAnggotaDosenPKM } from "@/components/proposal/pengajuan/pengabdian/step2/table-anggota-dosen";
import { TableAnggotaMahasiswaPKM } from "@/components/proposal/pengajuan/pengabdian/step2/table-anggota-mahasiswa";
import { useQueryAnggotaMahasiswaProposal } from "@/handlers/dosen/proposal/anggota/query-anggota-mahasiswa";
import { useQueryAnggotaDosenProposal } from "@/handlers/dosen/proposal/anggota/query-anggota-dosen";

export const AnggotaPKM = () => {
  const { currentStep, setCurrentStep } = useStep();
  const { handleNextStepPKM } = useNextStep(3);

  const { data: listAnggotaDosenPKM, refetch: refetchDosen } =
    useQueryAnggotaDosenProposal();

  const { data: listAnggotaMahasiswaPKM, refetch: refetchMahasiswa } =
    useQueryAnggotaMahasiswaProposal();

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
      <div className="flex flex-wrap items-center justify-between gap-2 md:flex-nowrap">
        <h1 className="order-2 text-lg font-semibold text-primary md:order-none">
          Identitas Anggota Dosen
        </h1>
        <ModalTambahAnggota />
      </div>
      <TableAnggotaDosenPKM data={listAnggotaDosenPKM} />
      <div className="flex items-center justify-between">
        <h1 className="text-base font-semibold text-primary lg:text-lg">
          Identitas Anggota Mahasiswa
        </h1>
      </div>
      <TableAnggotaMahasiswaPKM data={listAnggotaMahasiswaPKM} />
      <div className="absolute -bottom-16 left-0 mt-4 flex w-full flex-wrap items-center justify-between gap-2">
        <ButtonPrev
          onClick={handlePrevStep}
          className="w-[120px] lg:w-[200px]"
        />
        <ButtonNext
          onClick={handleNextStepPKM}
          disabled={listAnggotaDosenPKM?.data?.length === 0}
          className="w-[120px] lg:w-[200px]"
        />
      </div>
    </ContainerContent>
  );
};
