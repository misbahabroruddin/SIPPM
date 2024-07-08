"use client";

import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useCreateRincianBiaya } from "@/handlers/data-referensi/rincian-biaya/administrator/add-rincian-biaya";

export const FormTambahRincianBiaya = ({ setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useCreateRincianBiaya(onClose, reset);

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(mutateAsync)}>
      <Input
        label="Rincian"
        name="rincian"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Rincian Biaya"
        register={register("rincian", {
          required: "Wajib diisi",
        })}
        errors={errors.rincian}
        required
      />
      <Input
        label="Anggaran"
        name="anggaran"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Anggaran"
        register={register("anggaran", {
          required: "Wajib diisi",
        })}
        errors={errors.anggaran}
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
