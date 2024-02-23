"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { ButtonPrev } from "@/components/button/button-prev";
import { ButtonSave } from "@/components/button/button-save";
import { ContainerContent } from "@/components/container-content";
import { InputFile } from "@/components/input/input-file";
import { useStep } from "@/lib/hooks/useStep";
import { useUploadBerkasPenelitian } from "@/handlers/penelitian/berkas/upload-berkas-penelitian";

export const Berkas = () => {
  const router = useRouter();
  const { setCurrentStep } = useStep();
  const { uploadBerkas, isLoadingSubmit } = useUploadBerkasPenelitian(router);

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
    <ContainerContent className='relative'>
      <form
        className='flex flex-col gap-4'
        onSubmit={handleSubmit(uploadBerkas)}
      >
        <div className='flex flex-col gap-4'>
          <h1 className='text-primary font-semibold text-lg'>File Proposal</h1>
          <InputFile
            register={register("file_proposal", {
              required: "Wajib diisi!",
              validate: {
                acceptedFormat: (file) => {
                  if (!file || !file[0]) {
                    return "File tidak ditemukan";
                  }
                  const acceptedFormats = ["doc", "docx"];
                  const fileExtension = file[0]?.name
                    .split(".")
                    .pop()
                    .toLowerCase();
                  if (!acceptedFormats.includes(fileExtension)) {
                    return "File harus berupa doc atau docx";
                  }
                  return true;
                },
              },
            })}
            name='file_proposal'
            watch={watch}
            resetField={resetField}
            errors={errors.file_proposal}
          />
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-primary font-semibold text-lg'>
            Pernyataan Mitra
          </h1>
          <InputFile
            register={register("file_pernyataan_mitra")}
            name='file_pernyataan_mitra'
            watch={watch}
            resetField={resetField}
            errors={errors.file_pernyataan_mitra}
            accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf'
          />
        </div>
        <div className='flex flex-col gap-4'>
          <h1 className='text-primary font-semibold text-lg'>CV</h1>
          <InputFile
            register={register("file_cv", {
              required: "Wajib diisi!",
              validate: {
                acceptedFormat: (file) => {
                  if (!file || !file[0]) {
                    return "File tidak ditemukan";
                  }
                  const acceptedFormats = ["doc", "docx"];
                  const fileExtension = file[0]?.name
                    .split(".")
                    .pop()
                    .toLowerCase();
                  if (!acceptedFormats.includes(fileExtension)) {
                    return "File harus berupa doc atau docx";
                  }
                  return true;
                },
              },
            })}
            name='file_cv'
            watch={watch}
            resetField={resetField}
            errors={errors.file_cv}
            accept='application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/pdf'
          />
        </div>
        <div className='flex justify-between'>
          <ButtonPrev onClick={handlePrevStep} />
          <ButtonSave disabled={isLoadingSubmit} />
        </div>
      </form>
    </ContainerContent>
  );
};
