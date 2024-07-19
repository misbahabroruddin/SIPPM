"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonUpload } from "@/components/button/button-upload";
import { InputFileDokumen } from "@/components/input/input-file-dokumen";
import { Modal } from "@/components/modal";
import { useUploadSK } from "@/handlers/dokumen/sk/upload-sk";

export const ModalUploadSkPenelitian = ({ penelitianId, buttonClassName }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useUploadSK(penelitianId);

  const handleOpenModal = () => setOpen(true);
  const handleClosModal = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (form) => {
    await mutateAsync(form);
    handleClosModal();
  };

  return (
    <>
      <ButtonUpload onClick={handleOpenModal} className={buttonClassName} />
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
            errors={errors.file_sk}
            label={"Upload file SK"}
          />
          <div className="flex flex-wrap justify-evenly gap-2">
            <ButtonCancel
              iconLeft
              onClick={handleClosModal}
              className="w-[120px] justify-center lg:w-[200px]"
            />
            <ButtonUpload
              className="w-[120px] justify-center rounded lg:w-[200px]"
              isLoading={isPending}
              disabled={isPending}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};
