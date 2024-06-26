"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonSave } from "@/components/button/button-save";
import { ContainerContent } from "@/components/container-content";
import { InputFile } from "@/components/input/input-file";
import { useUploadBerkasPKM } from "@/handlers/dosen/pengabdian/berkas/upload-berkas";
import { useStep } from "@/lib/hooks/useStep";
import { ModalUploadDokumenPKM } from "@/components/proposal/pengajuan/pengabdian/step6/modal-upload-dokumen";

export const BerkasPKM = () => {
  const { setCurrentStep } = useStep();
  const { push } = useRouter();
  const { uploadBerkas, isPending } = useUploadBerkasPKM({ push });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm();

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
          <ModalUploadDokumenPKM />
        </div>
      </div>
      <div className="flex justify-between rounded-lg p-4 shadow">
        <ButtonPrev
          onClick={handlePrevStep}
          className="w-[120px] lg:w-[200px]"
        />
        <ButtonSave
          disabled={isPending}
          isLoading={isPending}
          className="w-[120px] lg:w-[200px]"
        />
      </div>
      {/* <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(uploadBerkas)}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-base font-semibold text-primary lg:text-lg">
            File Proposal
          </h1>
          <InputFile
            register={register("file_proposal", {
              required: "Wajib diisi",
              validate: {
                acceptedFormat: (file) => {
                  if (!file || !file[0]) {
                    return "File tidak ditemukan";
                  }
                  const acceptedFormats = ["pdf"];
                  const fileExtension = file[0]?.name
                    .split(".")
                    .pop()
                    .toLowerCase();
                  if (!acceptedFormats.includes(fileExtension)) {
                    return "File harus berupa pdf";
                  }
                  return true;
                },
              },
            })}
            name="file_proposal"
            watch={watch}
            resetField={resetField}
            errors={errors.file_proposal}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-base font-semibold text-primary lg:text-lg">
            Pernyataan Mitra
          </h1>
          <InputFile
            register={register("file_pernyataan_mitra")}
            name="file_pernyataan_mitra"
            watch={watch}
            resetField={resetField}
            errors={errors.file_pernyataan_mitra}
            accept="application/pdf"
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-primary">CV</h1>
          <InputFile
            register={register("file_cv", {
              required: "Wajib diisi",
              validate: {
                acceptedFormat: (file) => {
                  if (!file || !file[0]) {
                    return "File tidak ditemukan";
                  }
                  const acceptedFormats = ["pdf"];
                  const fileExtension = file[0]?.name
                    .split(".")
                    .pop()
                    .toLowerCase();
                  if (!acceptedFormats.includes(fileExtension)) {
                    return "File harus berupa pdf";
                  }
                  return true;
                },
              },
            })}
            name="file_cv"
            watch={watch}
            resetField={resetField}
            errors={errors.file_cv}
          />
        </div>
        <div className="flex justify-between">
          <ButtonPrev
            onClick={handlePrevStep}
            className="w-[120px] lg:w-[200px]"
          />
          <ButtonSave
            disabled={isPending}
            isLoading={isPending}
            className="w-[120px] lg:w-[200px]"
          />
        </div>
      </form> */}
    </ContainerContent>
  );
};
