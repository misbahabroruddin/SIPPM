"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonUpload } from "@/components/button/button-upload";
import { InputFileDokumen } from "@/components/input/input-file-dokumen";
import { Modal } from "@/components/modal";
import { useUploadSKPenelitian } from "@/handlers/lppm/dokumen/penelitian/sk/upload-sk-penelitian";

export const ModalUploadSkPenelitian = ({ penelitianId }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { mutateAsync } = useUploadSKPenelitian(penelitianId);

  const handleOpenModal = () => setOpen(true);
  const handleClosModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async () => {
    await mutateAsync();
    handleClosModal();
  };

  return (
    <>
      <ButtonUpload onClick={handleOpenModal} />
      <Modal
        onClose={() => setOpen(false)}
        open={open}
        containerClassName={"lg:w-[600px]"}
      >
        <form
          className="flex flex-col justify-center gap-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="text-center text-lg font-[500]">
            Kirim SK Penelitian
          </h2>
          <InputFileDokumen
            name={"file_sk"}
            register={register("file_sk", {
              required: "harus diisi",
            })}
            watch={watch}
            errors={errors.file_sk}
            label={"Upload file SK"}
          />
          <div className="flex justify-evenly">
            <ButtonCancel iconLeft onClick={handleClosModal} />
            <ButtonUpload className="w-[200px] justify-center" />
          </div>
        </form>
      </Modal>
    </>
  );
};