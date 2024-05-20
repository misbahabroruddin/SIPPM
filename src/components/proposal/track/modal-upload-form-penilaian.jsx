"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { ButtonUpload } from "@/components/button/button-upload";
import { Modal } from "@/components/modal";
import { ButtonUploadPenilaian } from "@/components/button/button-upload-penilaian";
import { InputFileDokumen } from "@/components/input/input-file-dokumen";
import { ButtonCancel } from "@/components/button/button-cancel";
import { useSubmitPenilaian } from "@/handlers/reviewer/penilaian/submit-penilaian";

export const ModalUploadFormPenilaian = ({ id }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { mutateAsync, isPending } = useSubmitPenilaian(id);

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
      <ButtonUploadPenilaian onClick={handleOpenModal} />
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
            Kirim Form Penilaian
          </h2>
          <InputFileDokumen
            name={"form_penilaian"}
            register={register("form_penilaian", {
              required: "harus diisi",
            })}
            errors={errors.form_penilaian}
            label={"Upload file penilaian"}
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
