"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonSave } from "@/components/button/button-save";
import { ContainerContent } from "@/components/container-content";
import { InputFile } from "@/components/input/input-file";
import { useStep } from "@/lib/hooks/useStep";
import { useUploadBerkasLaporanHasilPenelitian } from "@/handlers/dosen/laporan-hasil/penelitian/berkas/upload-berkas-penelitian";

export const Berkas = () => {
  const router = useRouter();
  const { setCurrentStep } = useStep();

  const { uploadBerkas, isLoadingSubmit } =
    useUploadBerkasLaporanHasilPenelitian(router);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    resetField,
  } = useForm();

  const handlePrevStep = () => {
    setCurrentStep(5);
  };

  return (
    <ContainerContent className="relative">
      <form
        className="flex flex-col gap-4"
        onSubmit={handleSubmit(uploadBerkas)}
      >
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-primary">
            File Laporan Hasil
          </h1>
          <InputFile
            register={register("file_laporan_hasil", {
              required: "Wajib diisi!",
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
            name="file_laporan_hasil"
            watch={watch}
            resetField={resetField}
            errors={errors.file_laporan_hasil}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-lg font-semibold text-primary">
            Pernyataan Mitra
          </h1>
          <InputFile
            register={register("file_pernyataan_mitra")}
            name="file_pernyataan_mitra"
            watch={watch}
            resetField={resetField}
            errors={errors.file_pernyataan_mitra}
          />
        </div>
        <div className="flex justify-between">
          <ButtonPrev onClick={handlePrevStep} />
          <ButtonSave disabled={isLoadingSubmit} isLoading={isLoadingSubmit} />
        </div>
      </form>
    </ContainerContent>
  );
};
