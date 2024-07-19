"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonUpload } from "@/components/button/button-upload";
import { Modal } from "@/components/modal";
import { InputFileDokumen } from "@/components/input/input-file-dokumen";
import { useUploadKontrakDosen } from "@/handlers/dokumen/kontrak/upload-kontrak-dosen";

export const ModalUploadKontrakPenelitian = ({
  penelitianId,
  buttonClassName,
}) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useUploadKontrakDosen(penelitianId);

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
            Kirim Kontrak Penelitian
          </h2>
          <InputFileDokumen
            name={"file_kontrak"}
            register={register("file_kontrak", {
              required: "harus diisi",
            })}
            watch={watch}
            errors={errors.file_kontrak}
            label={"Upload File Kontrak"}
          />
          <div className="flex justify-evenly">
            <ButtonCancel
              iconLeft
              onClick={handleClosModal}
              className="w-[120px] lg:w-[200px]"
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
