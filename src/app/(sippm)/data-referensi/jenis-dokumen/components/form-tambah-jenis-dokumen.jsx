"use client";

import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useCreateJenisDokumen } from "@/handlers/data-referensi/jenis-dokumen/administrator/add-jenis-dokumen";

export const FormTambahJenisDokumen = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useCreateJenisDokumen(onClose, reset);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Nama"
        name="nama"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden lg:block"
        placeholder="Nama"
        register={register("nama", {
          required: "Wajib diisi",
        })}
        errors={errors.nama}
        required
      />
      <Input
        label="Size"
        name="size"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden lg:block"
        placeholder="Size"
        register={register("size", {
          required: "Wajib diisi",
        })}
        errors={errors.size}
        required
      />
      <div className="mt-3 flex gap-4">
        <ButtonCancel
          className={"w-full"}
          iconLeft
          onClick={() => {
            onClose();
            reset();
          }}
        />
        <ButtonSave
          className={"w-full rounded"}
          iconLeft
          disabled={isPending}
          isLoading={isPending}
        />
      </div>
    </form>
  );
};
