"use client";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonSave } from "@/components/button/button-save";
import { ContainerContent } from "@/components/container-content";
import { ModalUploadDokumen } from "@/components/proposal/pengajuan/penelitian/step6/modal-upload-dokumen";
import { useQueryGetDokumenPendukungProposal } from "@/handlers/dosen/proposal/dokumen-pendukung/query-get-dokumen-pendukung";
import { useKirimUsulanPenelitian } from "@/handlers/dosen/penelitian/kirim-usulan/kirim-usulan-penelitian";
import { ListDokumenPendukungProposal } from "@/components/proposal/pengajuan/penelitian/step6/list-dokumen-pendukung";
import { useStep } from "@/lib/hooks/useStep";

export const Berkas = () => {
  const { setCurrentStep } = useStep();
  const { data: dokumenPendukung } = useQueryGetDokumenPendukungProposal();

  const { kirimUsulan, isLoadingSubmit } = useKirimUsulanPenelitian();

  const handlePrevStep = () => {
    setCurrentStep(5);
    localStorage.setItem("step", 5);
    localStorage.setItem("isEdit", false);
  };

  return (
    <ContainerContent className="relative">
      <div className="flex w-1/2 flex-col gap-6">
        <h1 className="text-base font-semibold text-primary lg:text-lg">
          Dokumen Pendukung
        </h1>
        <div className="flex items-center justify-between">
          <h3 className="font-base text-base text-primary lg:text-lg">
            Unggah Dokumen
          </h3>
          <ModalUploadDokumen />
        </div>
        <ListDokumenPendukungProposal dokumenPendukung={dokumenPendukung} />
      </div>
      <div className="flex justify-between rounded-lg p-4 shadow">
        <ButtonPrev
          onClick={handlePrevStep}
          className="w-[120px] lg:w-[200px]"
        />
        <ButtonSave
          onClick={kirimUsulan}
          disabled={isLoadingSubmit}
          isLoading={isLoadingSubmit}
          className="w-[120px] lg:w-[200px]"
        />
      </div>
    </ContainerContent>
  );
};
