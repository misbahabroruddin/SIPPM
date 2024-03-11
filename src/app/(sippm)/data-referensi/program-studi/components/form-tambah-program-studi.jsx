"use client";

import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useCreateProgramStudi } from "@/handlers/data-referensi/program-studi/administrator/add-program-studi";

export const FormTambahProgramStudi = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useCreateProgramStudi(onClose, reset);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Nama"
        name="nama"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Nama Program Studi"
        register={register("nama", {
          required: "Wajib diisi",
        })}
        errors={errors.nama}
        required
      />
      <Input
        label="Keterangan"
        name="keterangan"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Keterangan Program Studi"
        register={register("keterangan")}
        errors={errors.keterangan}
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
        />
      </div>
    </form>
  );
};
