"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { ButtonCancel } from "@/components/button/button-cancel";
import { ButtonSave } from "@/components/button/button-save";
import { Input } from "@/components/input/input";
import { useQueryEditRincianBiaya } from "@/handlers/data-referensi/rincian-biaya/administrator/edit-rincian-biaya";

export const FormEditRincianBiaya = ({ id, setOpen, data, isLoading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onClose = () => {
    setOpen(false);
  };

  const { mutateAsync, isPending } = useQueryEditRincianBiaya(id);

  useEffect(() => {
    setValue("rincian", data?.rincian);
    setValue("anggaran", data?.anggaran);
  }, [data]);

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
        defaultValue={data?.rincian}
        disabled={isLoading}
      />
      <Input
        label="Anggaran"
        name="anggaran"
        containerClass="flex-col items-start gap-1"
        spanEmptyClass="hidden"
        placeholder="Anggaran Program Studi"
        register={register("anggaran")}
        errors={errors.anggaran}
        defaultValue={data?.anggaran}
        disabled={isLoading}
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
